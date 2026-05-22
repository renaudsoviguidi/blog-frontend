import React, { useState } from 'react';
import { MessageCircle, Clock, CheckCircle, XCircle, AlertTriangle, EyeOff } from 'lucide-react';
import AdminLayout        from '../../layouts/AdminLayout';
import commentService     from '../../services/commentService';
import usePaginatedList   from '../../hooks/usePaginatedList';
import useToast           from '../../hooks/useToast';
import useConfirm         from '../../hooks/useConfirm';
import Toast              from '../../components/shared/Toast';
import ConfirmModal       from '../../components/shared/ConfirmModal';
import Pagination         from '../../components/shared/Pagination';
import EmptyState         from '../../components/shared/EmptyState';
import { PageHeader }     from '../../components/shared/PageHeader';
import { TableCard }      from '../../components/shared/TableCard';
import RejectReasonModal  from '../../components/shared/RejectReasonModal';
import CommentFilters     from './CommentFilters';
import CommentList        from './CommentList';

// ── Stats par statut ──────────────────────────────────────
const STATUS_CONFIG = {
    pending:  { label: 'En attente', icon: Clock,         color: '#f59e0b', bg: '#fef3c7' },
    approved: { label: 'Approuvés',  icon: CheckCircle,   color: '#10b981', bg: '#d1fae5' },
    rejected: { label: 'Rejetés',    icon: XCircle,       color: '#ef4444', bg: '#fef2f2' },
    spam:     { label: 'Spam',       icon: AlertTriangle,  color: '#f97316', bg: '#fff7ed' },
    hidden:   { label: 'Masqués',    icon: EyeOff,        color: '#64748b', bg: '#f1f5f9' },
};

const CommentsPage = () => {
    const [statusFilter, setStatusFilter] = useState('');
    const [search,       setSearch]       = useState('');
    const [rejectOpen,   setRejectOpen]   = useState(false);
    const [targetComment, setTargetComment] = useState(null);
    const [moderating,   setModerating]   = useState(false);

    const list = usePaginatedList(
        p => commentService.getAll(p, { status: statusFilter, search }),
        [statusFilter, search]
    );

    const { toasts, toast, removeToast }                           = useToast();
    const { confirmState, confirmLoading, confirm, handleConfirm, handleCancel } = useConfirm();

    // ── Approuver ─────────────────────────────────────────
    const handleApprove = async (comment) => {
        try {
            await commentService.moderate(comment.ref, 'approved');
            toast.success('Commentaire approuvé ✓');
            list.reload();
        } catch (e) { toast.error(e.message); }
    };

    // ── Rejeter avec motif ────────────────────────────────
    const handleOpenReject = (comment) => {
        setTargetComment(comment);
        setRejectOpen(true);
    };

    const handleConfirmReject = async (reason) => {
        if (!targetComment) return;
        setModerating(true);
        try {
            await commentService.moderate(targetComment.ref, 'rejected', reason);
            toast.success('Commentaire rejeté');
            setRejectOpen(false);
            setTargetComment(null);
            list.reload();
        } catch (e) { toast.error(e.message); }
        finally { setModerating(false); }
    };

    // ── Spam ──────────────────────────────────────────────
    const handleSpam = async (comment) => {
        try {
            await commentService.moderate(comment.ref, 'spam');
            toast.success('Commentaire marqué comme spam');
            list.reload();
        } catch (e) { toast.error(e.message); }
    };

    // ── Masquer ───────────────────────────────────────────
    const handleHide = async (comment) => {
        try {
            await commentService.moderate(comment.ref, 'hidden');
            toast.success('Commentaire masqué');
            list.reload();
        } catch (e) { toast.error(e.message); }
    };

    // ── Supprimer ─────────────────────────────────────────
    const handleDelete = (comment) => {
        confirm({
            title:       'Supprimer le commentaire',
            description: 'Cette action est irréversible. Le commentaire sera définitivement supprimé.',
            onConfirm:   async () => {
                await commentService.delete(comment.ref);
                toast.success('Commentaire supprimé');
                list.reload();
            },
        });
    };

    return (
        <AdminLayout>
            <PageHeader title="Commentaires" count={list.meta?.total} />

            {/* Stats rapides */}
            <div style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap:                 '1rem',
                marginBottom:        '1.5rem',
            }}>
                {Object.entries(STATUS_CONFIG).map(([key, s]) => {
                    const Icon = s.icon;
                    return (
                        <div
                            key={key}
                            onClick={() => setStatusFilter(statusFilter === key ? '' : key)}
                            style={{
                                background:   statusFilter === key ? s.bg : 'white',
                                border:       `1.5px solid ${statusFilter === key ? s.color + '40' : '#f1f5f9'}`,
                                borderRadius: '1rem',
                                padding:      '1rem 1.25rem',
                                cursor:       'pointer',
                                transition:   'all .2s',
                            }}
                        >
                            <div style={{
                                width:          '2rem',
                                height:         '2rem',
                                background:     s.bg,
                                borderRadius:   '.5rem',
                                display:        'flex',
                                alignItems:     'center',
                                justifyContent: 'center',
                                marginBottom:   '.6rem',
                            }}>
                                <Icon size={15} color={s.color} />
                            </div>
                            <p style={{ fontFamily: "'Lora', serif", fontSize: '1.3rem', fontWeight: 600, color: '#0c4a6e' }}>
                                —
                            </p>
                            <p style={{ fontSize: '.75rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                {s.label}
                            </p>
                        </div>
                    );
                })}
            </div>

            <CommentFilters
                search={search}
                status={statusFilter}
                onSearchChange={setSearch}
                onStatusChange={setStatusFilter}
            />

            <TableCard>
                {list.loading ? (
                    <LoadingRows />
                ) : list.items.length === 0 ? (
                    <EmptyState
                        icon={MessageCircle}
                        title="Aucun commentaire"
                        description={statusFilter || search ? 'Aucun résultat pour ces filtres.' : 'Aucun commentaire pour l\'instant.'}
                    />
                ) : (
                    <CommentList
                        items={list.items}
                        onApprove={handleApprove}
                        onReject={handleOpenReject}
                        onSpam={handleSpam}
                        onHide={handleHide}
                        onDelete={handleDelete}
                    />
                )}
                <Pagination meta={list.meta} page={list.page} onPageChange={list.setPage} />
            </TableCard>

            <ConfirmModal
                open={confirmState.open}
                title={confirmState.title}
                description={confirmState.description}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                loading={confirmLoading}
            />

            <RejectReasonModal
                open={rejectOpen}
                postTitle={targetComment?.content?.slice(0, 50) + '…'}
                onConfirm={handleConfirmReject}
                onCancel={() => { setRejectOpen(false); setTargetComment(null); }}
                loading={moderating}
            />

            <Toast toasts={toasts} removeToast={removeToast} />
        </AdminLayout>
    );
};

const LoadingRows = () => (
    <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
                height: '4rem', borderRadius: '.5rem',
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
                animationDelay: `${i * 0.08}s`,
            }} />
        ))}
        <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
    </div>
);

export default CommentsPage;
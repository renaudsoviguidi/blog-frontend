import React, { useState }  from 'react';
import { Mail, UserCheck, UserX } from 'lucide-react';
import AdminLayout from '../../../layouts/AdminLayout';
import newsletterService from '../../../services/newsletterService';
import usePaginatedList from '../../../hooks/usePaginatedList';
import useToast from '../../../hooks/useToast';
import useConfirm from '../../../hooks/useConfirm';
import Toast from '../../../components/shared/Toast';
import ConfirmModal from '../../../components/shared/ConfirmModal';
import Pagination from '../../../components/shared/Pagination';
import EmptyState from '../../../components/shared/EmptyState';
import { PageHeader } from '../../../components/shared/PageHeader';
import { StatCards } from '../../../components/shared/StatCards';
import { TableCard, TableHead, ActionButtons } from '../../../components/shared/TableCard';
import Input from '../../../components/ui/Input';
import { Search } from 'lucide-react';

/// ─ Ligne du tableau
const NewsletterRow = ({ subscriber, index, onDelete }) => (
    <tr
        style={{ borderBottom: '1px solid #f8fafc', transition: 'background .15s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {index}
            </span>
        </td>
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{ fontSize: '.875rem', fontWeight: 500, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {subscriber.email}
            </span>
        </td>
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.35rem',
                background: subscriber.is_active ? '#d1fae5' : '#f1f5f9',
                color: subscriber.is_active ? '#059669' : '#64748b',
                padding: '.25rem .75rem',
                borderRadius: '1rem',
                fontSize: '.75rem',
                fontWeight: 600,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                {subscriber.is_active
                    ? <><UserCheck size={12} /> Actif</>
                    : <><UserX size={12} /> Inactif</>
                }
            </span>
        </td>
        <td style={{ padding: '1rem 1.5rem', fontSize: '.78rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {subscriber.subscribed_at
                ? new Date(subscriber.subscribed_at).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'long', year: 'numeric',
                })
                : '—'
            }
        </td>
        <td style={{ padding: '1rem 1.5rem' }}>
            <ActionButtons
                onEdit={null}
                onDelete={() => onDelete(subscriber)}
            />
        </td>
    </tr>
);

// ── Page ──────────────────────────────────────────────────
const NewslettersPage = () => {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');

    const list = usePaginatedList(
        p => newsletterService.getAll(p, { search, status }),
        [search, status]
    );

    const { toasts, toast, removeToast } = useToast();
    const { confirmState, confirmLoading, confirm, handleConfirm, handleCancel } = useConfirm();

    const handleDelete = (subscriber) => {
        confirm({
            title: 'Supprimer cet abonné',
            description: `Supprimer l'abonné "${subscriber.email}" ? Cette action est irréversible.`,
            onConfirm: async () => {
                await newsletterService.delete(subscriber.ref);
                toast.success('Abonné supprimé');
                list.reload();
            },
        });
    };

    const activeCount   = list.items.filter(s => s.is_active).length;
    const inactiveCount = list.items.filter(s => !s.is_active).length;

    const stats = [
        { label: 'Total abonnés',  value: list.meta?.total ?? 0, Icon: Mail,      color: '#0284c7', bg: '#e0f2fe' },
        { label: 'Actifs',         value: activeCount,            Icon: UserCheck, color: '#10b981', bg: '#d1fae5' },
        { label: 'Désabonnés',     value: inactiveCount,          Icon: UserX,    color: '#94a3b8', bg: '#f1f5f9' },
    ];

    return (
        <AdminLayout>
            <PageHeader title="Newsletter" count={list.meta?.total} />

            <StatCards stats={stats} />

            {/* Filtres */}
            <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Rechercher un email…"
                        icon={<Search size={16} />}
                    />
                </div>
                <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    style={{
                        padding:      '.6rem 1.1rem',
                        border:       '1.5px solid #e2e8f0',
                        borderRadius: '.75rem',
                        fontSize:     '.875rem',
                        fontFamily:   "'Plus Jakarta Sans', sans-serif",
                        color:        '#475569',
                        outline:      'none',
                        background:   'white',
                        cursor:       'pointer',
                        minWidth:     160,
                    }}
                    onFocus={e => e.target.style.borderColor = '#38bdf8'}
                    onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
                >
                    <option value="">Tous les statuts</option>
                    <option value="1">Actifs</option>
                    <option value="0">Désabonnés</option>
                </select>
            </div>

            <TableCard>
                {list.loading ? (
                    <LoadingRows />
                ) : list.items.length === 0 ? (
                    <EmptyState
                        icon={Mail}
                        title="Aucun abonné"
                        description="Aucun abonné pour l'instant."
                    />
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <TableHead columns={['#', 'Email', 'Statut', 'Abonné le', 'Actions']} />
                            <tbody>
                                {list.items.map((subscriber, index) => (
                                    <NewsletterRow
                                        key={subscriber.ref}
                                        subscriber={subscriber}
                                        index={index + 1}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
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

            <Toast toasts={toasts} removeToast={removeToast} />
        </AdminLayout>
    );
};

const LoadingRows = () => (
    <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
                height: '2.75rem', borderRadius: '.5rem',
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
                animationDelay: `${i * 0.08}s`,
            }} />
        ))}
        <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
    </div>
);

export default NewslettersPage;
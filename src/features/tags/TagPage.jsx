import React, { useState } from 'react';
import { LayoutGrid, Hash, Calendar } from 'lucide-react';

import usePaginatedList from '../../hooks/usePaginatedList';
import useModal from '../../hooks/useModal';

import Toast from '../../components/shared/Toast';
import Modal from '../../components/shared/Modal';
import Pagination from '../../components/shared/Pagination';
import AdminLayout from '../../layouts/AdminLayout';
import { PageHeader } from '../../components/shared/PageHeader';
import { StatCards } from '../../components/shared/StatCards';
import { TableCard } from '../../components/shared/TableCard';
import EmptyState from '../../components/shared/EmptyState';
import useToast from '../../hooks/useToast';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModal from '../../components/shared/ConfirmModal';
import tagService from '../../services/tagService';
import TagList from './TagList';
import TagForm from './TagForm';

/// ─ Constantes de la page
const EMPTY_FORM = { name: '' };

const buildStats = (meta) => [
    {
        label: 'Total tags',
        value: meta?.total ?? 0,
        Icon: LayoutGrid,
        color: '#0ea5e9',
        bg: '#e0f2fe',
    },
    {
        label: 'Page actuelle',
        value: meta ? `${meta.current_page} / ${meta.last_page}` : '—',
        Icon: Hash,
        color: '#10b981',
        bg: '#d1fae5',
    },
    {
        label: 'Par page',
        value: meta?.per_page ?? 10,
        Icon: Calendar,
        color: '#f59e0b',
        bg: '#fef3c7',
    },
];

/// ─ Page
const TagsPage = () => {
    const list = usePaginatedList(p => tagService.getAll(p));
    const modal = useModal();
    const { toasts, toast, removeToast } = useToast();
    const { confirmState, confirmLoading, confirm, handleConfirm, handleCancel } = useConfirm();
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    /// ─ Handlers
    const handleOpenCreate = () => {
        setFormData(EMPTY_FORM);
        modal.openCreate();
    };

    const handleOpenEdit = (tag) => {
        setFormData({ name: tag.name });
        modal.openEdit(tag);
    };

    const handleSubmit = async () => {
        if (!formData.name?.trim()) return;

        setSubmitting(true);
        try {
            if (modal.editing) {
                await tagService.update(modal.editing.ref, formData);
                toast.success('Tag mis à jour avec succès');
            } else {
                await tagService.create(formData);
                toast.success('Tag créé avec succès');
            }
            modal.close();
            list.reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (tag) => {
        confirm({
            title: 'Supprimer le tag',
            description: `Vous êtes sur le point de supprimer "${tag.name}". Cette action est irréversible.`,
            onConfirm: async () => {
                try {
                    await tagService.delete(tag.ref);
                    toast.success('Tag supprimé avec succès');
                    list.reload();
                } catch (e) {
                    toast.error(e.message);
                }
            },
        });
    };

    /// ─ Render
    return (
        <AdminLayout>
            <PageHeader
                title="Tag"
                count={list.meta?.total}
                actionLabel="Nouvel tag"
                onAction={handleOpenCreate}
            />

            <StatCards stats={buildStats(list.meta, list.items)} />

            <TableCard>
                {list.loading ? (
                    <LoadingRows />
                ) : !list.items?.length ? (
                    <EmptyState
                        icon={LayoutGrid}
                        title="Aucun tag"
                        description="Commencez par créer votre premier tag."
                    />
                ) : (
                    <TagList
                        items={list.items}
                        onEdit={handleOpenEdit}
                        onDelete={handleDelete}
                    />
                )}

                <Pagination
                    meta={list.meta}
                    page={list.page}
                    onPageChange={list.setPage}
                />
            </TableCard>

            <Modal
                open={modal.open}
                title={modal.editing ? 'Modifier le tag' : 'Nouvel tag'}
                onClose={modal.close}
                onSubmit={handleSubmit}
                submitting={submitting}
                size="sm"
            >
                <TagForm formData={formData} onChange={setFormData} />
            </Modal>

            {/* Modal confirmation suppression */}
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

/// ─ Skeleton loader
const LoadingRows = () => (
    <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{
                height: '2.5rem', borderRadius: '.5rem',
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
                animationDelay: `${i * 0.08}s`,
            }} />
        ))}
        <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
    </div>
);

export default TagsPage;
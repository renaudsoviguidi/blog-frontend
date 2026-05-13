import React, { useState } from 'react';
import { LayoutGrid, Hash, Calendar } from 'lucide-react';

import categoryService from '../../services/categoryService';
import usePaginatedList from '../../hooks/usePaginatedList';
import useModal from '../../hooks/useModal';

import Toast from '../../components/shared/Toast';
import Modal from '../../components/shared/Modal';
import Pagination from '../../components/shared/Pagination';
import CategoryList from './CategoryList';
import CategoryForm from './CategoryForm';
import AdminLayout from '../../layouts/AdminLayout';
import { PageHeader } from '../../components/shared/PageHeader';
import { StatCards } from '../../components/shared/StatCards';
import { TableCard } from '../../components/shared/TableCard';
import EmptyState from '../../components/shared/EmptyState';
import useToast from '../../hooks/useToast';
import useConfirm from '../../hooks/useConfirm';
import ConfirmModal from '../../components/shared/ConfirmModal';

/// ─ Constantes de la page
const EMPTY_FORM = { name: '' };

const buildStats = (meta) => [
    {
        label: 'Total catégories',
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
const CategoriesPage = () => {
    const list = usePaginatedList(p => categoryService.getAll(p));
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

    const handleOpenEdit = (category) => {
        setFormData({ name: category.name });
        modal.openEdit(category);
    };

    const handleSubmit = async () => {
        if (!formData.name?.trim()) return;

        setSubmitting(true);
        try {
            if (modal.editing) {
                await categoryService.update(modal.editing.ref, formData);
                toast.success('Catégorie mise à jour avec succès');
            } else {
                await categoryService.create(formData);
                toast.success('Catégorie créée avec succès');
            }
            modal.close();
            list.reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (category) => {
        confirm({
            title: 'Supprimer la catégorie',
            description: `Vous êtes sur le point de supprimer "${category.name}". Cette action est irréversible.`,
            onConfirm: async () => {
                try {
                    await categoryService.delete(category.ref);
                    toast.success('Catégorie supprimée avec succès');
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
                title="Catégories"
                count={list.meta?.total}
                actionLabel="Nouvelle catégorie"
                onAction={handleOpenCreate}
            />

            <StatCards stats={buildStats(list.meta, list.items)} />

            <TableCard>
                {list.loading ? (
                    <LoadingRows />
                ) : !list.items?.length ? (
                    <EmptyState
                        icon={LayoutGrid}
                        title="Aucune catégorie"
                        description="Commencez par créer votre première catégorie."
                    />
                ) : (
                    <CategoryList
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
                title={modal.editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                onClose={modal.close}
                onSubmit={handleSubmit}
                submitting={submitting}
                size="sm"
            >
                <CategoryForm formData={formData} onChange={setFormData} />
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

export default CategoriesPage;
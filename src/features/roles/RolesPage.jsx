import React, { useState }  from 'react';
import { ShieldCheck, Shield, Users } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import roleService from '../../services/roleService';
import usePaginatedList from '../../hooks/usePaginatedList';
import useModal from '../../hooks/useModal';
import useToast from '../../hooks/useToast';
import useConfirm from '../../hooks/useConfirm';
import Toast from '../../components/shared/Toast';
import Modal from '../../components/shared/Modal';
import ConfirmModal from '../../components/shared/ConfirmModal';
import Pagination from '../../components/shared/Pagination';
import EmptyState from '../../components/shared/EmptyState';
import { PageHeader } from '../../components/shared/PageHeader';
import { StatCards } from '../../components/shared/StatCards';
import { TableCard } from '../../components/shared/TableCard';
import RoleList from './RoleList';
import RoleForm from './RoleForm';

const EMPTY_FORM = {
    libelle: '',
    description: '',
    habilitation_ids: [],
};

const RolesPage = () => {
    const list = usePaginatedList(p => roleService.getAll(p));
    const modal = useModal();
    const { toasts, toast, removeToast } = useToast();
    const { confirmState, confirmLoading, confirm, handleConfirm, handleCancel } = useConfirm();

    const [formData, setFormData]   = useState(EMPTY_FORM);
    const [submitting,  setSubmitting] = useState(false);

    const stats = [
        {
            label: 'Total rôles',
            value: list.meta?.total ?? 0,
            Icon: ShieldCheck,
            color: '#6d28d9',
            bg: '#ede9fe',
        },
        {
            label: 'Rôles actifs',
            value: list.items.length,
            Icon: Shield,
            color: '#0284c7',
            bg: '#e0f2fe',
        },
        {
            label: 'Utilisateurs assignés',
            value: list.items.reduce((acc, r) => acc + (r.users_count ?? 0), 0),
            Icon: Users,
            color: '#10b981',
            bg: '#d1fae5',
        },
    ];

    const handleOpenCreate = () => {
        setFormData(EMPTY_FORM);
        modal.openCreate();
    };

    const handleOpenEdit = (role) => {
        setFormData({
            libelle: role.libelle,
            description: role.description ?? '',
            habilitation_ids: role.habilitations?.map(h => h.id) ?? [],
        });
        modal.openEdit(role);
    };

    const handleSubmit = async () => {
        if (!formData.libelle?.trim()) {
            toast.error('Le nom du rôle est obligatoire.');
            return;
        }
        setSubmitting(true);
        try {
            if (modal.editing) {
                await roleService.update(modal.editing.ref, formData);
                toast.success('Rôle mis à jour avec succès');
            } else {
                await roleService.create(formData);
                toast.success('Rôle créé avec succès');
            }
            modal.close();
            list.reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = (role) => {
        confirm({
            title: 'Supprimer le rôle',
            description: `Supprimer le rôle "${role.libelle}" ? Cette action est irréversible.`,
            onConfirm: async () => {
                await roleService.delete(role.ref);
                toast.success('Rôle supprimé');
                list.reload();
            },
        });
    };

    return (
        <AdminLayout>
            <PageHeader
                title="Rôles & Permissions"
                count={list.meta?.total}
                actionLabel="Nouveau rôle"
                onAction={handleOpenCreate}
            />

            <StatCards stats={stats} />

            <TableCard>
                {list.loading ? (
                    <LoadingRows />
                ) : list.items.length === 0 ? (
                    <EmptyState
                        icon={ShieldCheck}
                        title="Aucun rôle"
                        description="Commencez par créer votre premier rôle."
                    />
                ) : (
                    <RoleList
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
                title={modal.editing ? 'Modifier le rôle' : 'Nouveau rôle'}
                onClose={modal.close}
                onSubmit={handleSubmit}
                submitting={submitting}
                size="lg"
            >
                <RoleForm formData={formData} onChange={setFormData} />
            </Modal>

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
        {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{
                height: '3rem',
                borderRadius: '.5rem',
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s infinite',
                animationDelay: `${i * 0.08}s`,
            }} />
        ))}
        <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
    </div>
);

export default RolesPage;
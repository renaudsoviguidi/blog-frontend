// Responsabilité unique : orchestrer la page utilisateurs
import React, { useState }  from 'react';
import { Users, UserCheck, UserX, ShieldCheck } from 'lucide-react';
import { Search } from 'lucide-react';
import AdminLayout from '../../layouts/AdminLayout';
import userService from '../../services/userService';
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
import Input from '../../components/ui/Input';
import UserList from './UserList';
import UserForm from './UserForm';

/// ─ Constantes
const EMPTY_FORM = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_ids: [],
    is_active: true,
};

const UsersPage = () => {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');

    const list = usePaginatedList(
        p => userService.getAll(p, { search, role: roleFilter }),
        [search, roleFilter]
    );

    const modal = useModal();
    const { toasts, toast, removeToast } = useToast();
    const { confirmState, confirmLoading, confirm, handleConfirm, handleCancel } = useConfirm();

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    /// ─ Stats
    const stats = [
        {
            label: 'Total utilisateurs',
            value: list.meta?.total ?? 0,
            Icon:  Users,
            color: '#0284c7',
            bg: '#e0f2fe',
        },
        {
            label: 'Actifs',
            value: list.items.filter(u => u.is_active).length,
            Icon: UserCheck,
            color: '#10b981',
            bg: '#d1fae5',
        },
        {
            label: 'Inactifs',
            value: list.items.filter(u => !u.is_active).length,
            Icon: UserX,
            color: '#94a3b8',
            bg: '#f1f5f9',
        },
        {
            label: 'Admins',
            value: list.items.filter(u =>
                u.roles?.some(r => r.libelle === 'ADMIN')
            ).length,
            Icon: ShieldCheck,
            color: '#6d28d9',
            bg: '#ede9fe',
        },
    ];

    /// ─ Handlers
    const handleOpenCreate = () => {
        setFormData(EMPTY_FORM);
        modal.openCreate();
    };

    const handleOpenEdit = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            role_ids: user.roles?.map(r => r.id) ?? [],
            is_active: user.is_active,
        });
        modal.openEdit(user);
    };

    const handleSubmit = async () => {
        if (!formData.name?.trim() || !formData.email?.trim()) {
            toast.error('Le nom et l\'email sont obligatoires.');
            return;
        }
        if (!modal.editing && !formData.password?.trim()) {
            toast.error('Le mot de passe est obligatoire.');
            return;
        }
        if (formData.password && formData.password !== formData.password_confirmation) {
            toast.error('Les mots de passe ne correspondent pas.');
            return;
        }

        setSubmitting(true);
        try {
            if (modal.editing) {
                await userService.update(modal.editing.ref, formData);
                toast.success('Utilisateur mis à jour avec succès');
            } else {
                await userService.create(formData);
                toast.success('Utilisateur créé avec succès');
            }
            modal.close();
            list.reload();
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleActive = async (user) => {
        try {
            await userService.toggleActive(user.ref);
            toast.success(
                user.is_active
                    ? `${user.name} désactivé`
                    : `${user.name} activé`
            );
            list.reload();
        } catch (e) {
            toast.error(e.message);
        }
    };

    const handleDelete = (user) => {
        confirm({
            title: 'Supprimer l\'utilisateur',
            description: `Supprimer "${user.name}" ? Ses articles et commentaires seront conservés.`,
            onConfirm: async () => {
                await userService.delete(user.ref);
                toast.success('Utilisateur supprimé');
                list.reload();
            },
        });
    };

    /// ─ Render
    return (
        <AdminLayout>
            <PageHeader
                title="Utilisateurs"
                count={list.meta?.total}
                actionLabel="Nouvel utilisateur"
                onAction={handleOpenCreate}
            />

            <StatCards stats={stats} />

            {/* Filtres */}
            <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Rechercher par nom ou email…"
                        icon={<Search size={16} />}
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={e => setRoleFilter(e.target.value)}
                    style={{
                        padding: '.6rem 1.1rem',
                        border: '1.5px solid #e2e8f0',
                        borderRadius: '.75rem',
                        fontSize: '.875rem',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        color: '#475569',
                        outline: 'none',
                        background: 'white',
                        cursor: 'pointer',
                        minWidth: 160,
                    }}
                    onFocus={e => e.target.style.borderColor = '#38bdf8'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                >
                    <option value="">Tous les rôles</option>
                    <option value="1">ADMIN</option>
                    <option value="2">EDITOR</option>
                    <option value="3">USER</option>
                </select>
            </div>

            <TableCard>
                {list.loading ? (
                    <LoadingRows />
                ) : list.items.length === 0 ? (
                    <EmptyState
                        icon={Users}
                        title="Aucun utilisateur"
                        description={search ? 'Aucun résultat pour cette recherche.' : 'Aucun utilisateur enregistré.'}
                    />
                ) : (
                    <UserList
                        items={list.items}
                        onEdit={handleOpenEdit}
                        onDelete={handleDelete}
                        onToggleActive={handleToggleActive}
                    />
                )}
                <Pagination
                    meta={list.meta}
                    page={list.page}
                    onPageChange={list.setPage}
                />
            </TableCard>

            {/* Modal création/édition */}
            <Modal
                open={modal.open}
                title={modal.editing ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
                onClose={modal.close}
                onSubmit={handleSubmit}
                submitting={submitting}
                size="md"
            >
                <UserForm
                    formData={formData}
                    onChange={setFormData}
                    editing={!!modal.editing}
                />
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

/// ─ Skeleton loader
const LoadingRows = () => (
    <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
                height: '3.5rem',
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

export default UsersPage;
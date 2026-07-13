// Responsabilité unique : tableau de liste des utilisateurs
import React from 'react';
import { UserCheck, UserX, ShieldCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { TableHead, ActionButtons } from '../../components/shared/TableCard';

const StatusBadge = ({ isActive }) => (
    <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '.35rem',
        background: isActive ? '#d1fae5' : '#f1f5f9',
        color: isActive ? '#059669' : '#64748b',
        padding: '.25rem .75rem',
        borderRadius: '1rem',
        fontSize: '.75rem',
        fontWeight: 600,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
        {isActive
            ? <><UserCheck size={12} /> Actif</>
            : <><UserX size={12} /> Inactif</>
        }
    </span>
);

const UserRow = ({ user, index, onEdit, onDelete, onToggleActive }) => (
    <tr
        style={{ borderBottom: '1px solid #f8fafc', transition: 'background .15s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
        {/* # */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {index}
            </span>
        </td>

        {/* Utilisateur */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                <div style={{
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: '50%',
                    background: user.avatar
                        ? `url(${user.avatar}) center/cover`
                        : 'linear-gradient(135deg, #38bdf8, #0284c7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '.7rem',
                    fontWeight: 700,
                    color: 'white',
                    flexShrink: 0,
                }}>
                    {!user.avatar && user.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <p style={{ fontSize: '.875rem', fontWeight: 600, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {user.name}
                    </p>
                    <p style={{ fontSize: '.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                        {user.email}
                    </p>
                </div>
            </div>
        </td>

        {/* Rôles */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
                {(user.roles ?? []).length === 0 ? (
                    <span style={{ fontSize: '.75rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>—</span>
                ) : (
                    user.roles.map(role => (
                        <span key={role.id} style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '.25rem',
                            background: '#ede9fe',
                            color: '#6d28d9',
                            padding: '.2rem .65rem',
                            borderRadius: '1rem',
                            fontSize: '.72rem',
                            fontWeight: 600,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}>
                            <ShieldCheck size={10} />
                            {role.libelle}
                        </span>
                    ))
                )}
            </div>
        </td>

        {/* Statut */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <StatusBadge isActive={user.is_active} />
        </td>

        {/* Email vérifié */}
        <td style={{ padding: '1rem 1.5rem', fontSize: '.78rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {user.email_verified_at
                ? <span style={{ color: '#059669', fontWeight: 500 }}>✓ Vérifié</span>
                : <span style={{ color: '#f59e0b', fontWeight: 500 }}>Non vérifié</span>
            }
        </td>

        {/* Inscrit le */}
        <td style={{ padding: '1rem 1.5rem', fontSize: '.78rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap' }}>
            {user.created_at
                ? new Date(user.created_at).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'short', year: 'numeric',
                })
                : '—'
            }
        </td>

        {/* Actions */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleActive(user)}
                    style={{
                        background:  user.is_active ? '#fef3c7' : '#d1fae5',
                        color: user.is_active ? '#d97706' : '#059669',
                        border: `1px solid ${user.is_active ? '#fde68a' : '#a7f3d0'}`,
                        padding: '.3rem .6rem',
                        fontSize: '.72rem',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                    {user.is_active ? 'Désactiver' : 'Activer'}
                </Button>
                <ActionButtons
                    onEdit={() => onEdit(user)}
                    onDelete={() => onDelete(user)}
                />
            </div>
        </td>
    </tr>
);

const UserList = ({ items, onEdit, onDelete, onToggleActive }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <TableHead columns={['#', 'Utilisateur', 'Rôles', 'Statut', 'Email', 'Inscrit le', 'Actions']} />
            <tbody>
                {items.map((user, index) => (
                    <UserRow
                        key={user.ref}
                        user={user}
                        index={index + 1}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggleActive={onToggleActive}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default UserList;
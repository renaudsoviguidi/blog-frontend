import React from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import { TableHead, ActionButtons } from '../../components/shared/TableCard';

const RoleRow = ({ role, index, onEdit, onDelete }) => (
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

        {/* Rôle */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.4rem',
                background: '#ede9fe',
                color: '#6d28d9',
                padding: '.3rem .85rem',
                borderRadius: '1rem',
                fontSize: '.82rem',
                fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                <ShieldCheck size={13} />
                {role.libelle}
            </span>
        </td>

        {/* Permissions */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem', maxWidth: 400 }}>
                {(role.habilitations ?? []).slice(0, 5).map(h => (
                    <span key={h.id} style={{
                        background: '#f0f7ff',
                        color: '#0284c7',
                        padding: '.15rem .55rem',
                        borderRadius: '.35rem',
                        fontSize: '.68rem',
                        fontFamily: 'monospace',
                    }}>
                        {h.slug}
                    </span>
                ))}
                {(role.habilitations ?? []).length > 5 && (
                    <span style={{
                        fontSize: '.72rem',
                        color: '#94a3b8',
                        alignSelf: 'center',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        +{role.habilitations.length - 5} autres
                    </span>
                )}
            </div>
        </td>

        {/* Utilisateurs */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.35rem',
                fontSize: '.8rem',
                color: '#64748b',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                <Users size={13} />
                {role.users_count ?? 0} utilisateur{(role.users_count ?? 0) > 1 ? 's' : ''}
            </span>
        </td>

        {/* Actions */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <ActionButtons
                onEdit={() => onEdit(role)}
                onDelete={() => onDelete(role)}
            />
        </td>
    </tr>
);

const RoleList = ({ items, onEdit, onDelete }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <TableHead columns={['#', 'Rôle', 'Permissions', 'Utilisateurs', 'Actions']} />
            <tbody>
                {items.map((role, index) => (
                    <RoleRow
                        key={role.ref ?? role.id}
                        role={role}
                        index={index + 1}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default RoleList;
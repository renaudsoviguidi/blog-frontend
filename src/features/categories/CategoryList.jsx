import React from 'react';
import { ActionButtons, TableHead } from '../../components/shared/TableCard';

const CategoryRow = ({ category, index, onEdit, onDelete }) => (
    <tr style={{ borderBottom: '1px solid #f8fafc', transition: 'background .15s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                fontFamily: 'monospace', fontSize: '.72rem',
                padding: '.2rem .55rem', borderRadius: '.35rem',
            }}>
                {index}
            </span>
        </td>
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                fontSize: '.875rem', fontWeight: 600, color: '#1e293b',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                {category.name}
            </span>
        </td>
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                fontSize: '.78rem', color: '#64748b', background: '#f1f5f9',
                padding: '.25rem .65rem', borderRadius: '1rem',
                fontFamily: 'monospace',
            }}>
                {category.slug}
            </span>
        </td>
        <td style={{ padding: '1rem 1.5rem', fontSize: '.78rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {category.created_at
                ? new Date(category.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
                : '—'
            }
        </td>
        <td style={{ padding: '1rem 1.5rem' }}>
            <ActionButtons
                onEdit={() => onEdit(category)}
                onDelete={() => onDelete(category)}
            />
        </td>
    </tr>
);

const CategoryList = ({ items, onEdit, onDelete }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <TableHead columns={['#', 'Nom', 'Slug', 'Créé le', 'Actions']} />
            <tbody>
                {items.map((cat, index) => (
                    <CategoryRow
                        key={cat.ref}
                        index={index + 1}
                        category={cat}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default CategoryList;
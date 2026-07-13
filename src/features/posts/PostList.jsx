import React from 'react';
import { Eye } from 'lucide-react';
import { TableHead, ActionButtons } from '../../components/shared/TableCard';
import Button from '../../components/ui/Button';

/// ─ Badge statut
const STATUS = {
    published: { bg: '#d1fae5', color: '#059669', dot: '#10b981', label: 'Publié' },
    draft: { bg: '#f1f5f9', color: '#64748b', dot: '#94a3b8', label: 'Brouillon' },
};

const StatusBadge = ({ status }) => {
    const s = STATUS[status] ?? STATUS.draft;
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '.35rem',
            background: s.bg,
            color: s.color,
            padding: '.25rem .75rem',
            borderRadius: '1rem',
            fontSize: '.75rem',
            fontWeight: 600,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
            {s.label}
        </span>
    );
};

// ── Bouton publier/dépublier ─────
const PublishToggle = ({ post, onPublish, onReject }) => {
    if (post.status === 'draft') {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onPublish(post)}
                style={{
                    background: '#d1fae5',
                    color: '#059669',
                    border: '1px solid #a7f3d0',
                    borderRadius: '.5rem',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#a7f3d0'}
                onMouseLeave={e => e.currentTarget.style.background = '#d1fae5'}
            >
                ↑ Publier
            </Button>
        );
    }
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => onReject(post)}
            style={{
                background: '#fef3c7',
                color: '#d97706',
                border: '1px solid #fde68a',
                borderRadius: '.5rem',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fde68a'}
            onMouseLeave={e => e.currentTarget.style.background = '#fef3c7'}
        >
            ↓ Dépublier
        </Button>
    );
};

/// ─ Ligne du tableau
const PostRow = ({ post, index, isAdmin, onPreview, onEdit, onDelete }) => (
    <tr
        style={{ borderBottom: '1px solid #f8fafc', transition: 'background .15s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
        {/* Numéro */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {index}
            </span>
        </td>

        {/* Titre + slug */}
        <td style={{ padding: '1rem 1.5rem', maxWidth: 280 }}>
            <p style={{
                fontSize: '.875rem',
                fontWeight: 600,
                color: '#1e293b',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }} title={post.title}>
                {post.title}
            </p>
            <p style={{ fontSize: '.72rem', color: '#94a3b8', marginTop: '.15rem', fontFamily: 'monospace' }}>
                {post.slug}
            </p>
        </td>

        {/* Catégories */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
                {(post.categories ?? []).slice(0, 2).map(c => (
                    <span key={c.ref} style={{
                        background: '#e0f2fe',
                        color: '#0284c7',
                        padding: '.2rem .6rem',
                        borderRadius: '1rem',
                        fontSize: '.72rem',
                        fontWeight: 600,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}>
                        {c.name}
                    </span>
                ))}
                {(post.categories ?? []).length > 2 && (
                    <span style={{ fontSize: '.72rem', color: '#94a3b8', alignSelf: 'center' }}>
                        +{post.categories.length - 2}
                    </span>
                )}
            </div>
        </td>

        {/* Statut */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <StatusBadge status={post.status} />
        </td>

        {/* Vues */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.35rem',
                fontSize: '.8rem',
                color: '#64748b',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                <Eye size={13} />
                {(post.views_count ?? 0).toLocaleString('fr-FR')}
            </span>
        </td>

        {/* Auteur */}
        <td style={{ padding: '1rem 1.5rem', fontSize: '.8rem', color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {post.author?.name ?? '—'}
        </td>

        {/* Actions */}
        <td style={{ padding: '1rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                {/* Bouton Visualiser — ouvre la preview */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPreview(post)}
                    style={{
                        display:     'inline-flex',
                        alignItems:  'center',
                        gap:         '.35rem',
                        background:  '#f0f7ff',
                        color:       '#0284c7',
                        border:      '1px solid #bae6fd',
                        borderRadius: '.5rem',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f0f7ff'}
                >
                    <Eye size={13} />
                    Voir
                </Button>
                {isAdmin ? (
                <ActionButtons
                    onEdit={() => onEdit(post)}
                    onDelete={() => onDelete(post)}
                />
                ) : (
                    post.status === 'draft' && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(post)}
                        style={{
                            background: '#fef9c3',
                            color: '#a16207',
                            border: '1px solid #fde68a',
                            borderRadius: '.5rem',
                        }}
                    >
                        Modifier
                    </Button>
                    )
                )}
            </div>
        </td>
    </tr>
);

// ── PostList
const PostList = ({ items, isAdmin, onPreview, onEdit, onDelete }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <TableHead columns={['#', 'Titre', 'Catégories', 'Statut', 'Vues', 'Auteur', 'Actions']} />
            <tbody>
                {items.map((post, index) => (
                    <PostRow
                        key={post.ref}
                        post={post}
                        index={index + 1}
                        isAdmin={isAdmin}
                        onPreview={onPreview}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default PostList;
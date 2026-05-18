
import React from 'react';
import { X, Eye, Calendar, User } from 'lucide-react';
import Button from '../ui/Button';

const PostPreviewModal = ({ open, post, onClose, onPublish, onReject, publishing, rejecting }) => {
    if (!open || !post) return null;

    return (
        <div
            onClick={e => e.target === e.currentTarget && onClose()}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(12,74,110,.5)',
                backdropFilter: 'blur(6px)',
                zIndex: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div style={{
                background: 'white',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: 760,
                maxHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 32px 64px rgba(0,0,0,.18)',
                animation: 'modalIn .22s ease',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                overflow: 'hidden',
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.25rem 1.75rem',
                    borderBottom: '1px solid #f1f5f9',
                    flexShrink: 0,
                }}>
                    <h3 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: '#0c4a6e',
                    }}>
                        Prévisualisation du post
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: '#f0f7ff',
                            border: 'none',
                            borderRadius: '.5rem',
                            width: '2rem',
                            height: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#64748b',
                        }}
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Corps scrollable */}
                <div style={{ overflowY: 'auto', flex: 1, padding: '1.75rem' }}>

                    {/* Image de couverture */}
                    {post.cover_image && (
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            style={{
                                width: '100%',
                                height: 220,
                                objectFit: 'cover',
                                borderRadius: '.75rem',
                                marginBottom: '1.5rem',
                                border: '1px solid #f1f5f9',
                            }}
                        />
                    )}

                    {/* Catégories + Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1rem' }}>
                        {(post.categories ?? []).map(c => (
                            <span key={c.ref} style={{
                                background: '#e0f2fe',
                                color: '#0284c7',
                                padding: '.2rem .75rem',
                                borderRadius: '1rem',
                                fontSize: '.75rem',
                                fontWeight: 600,
                            }}>
                                {c.name}
                            </span>
                        ))}
                        {(post.tags ?? []).map(t => (
                            <span key={t.ref} style={{
                                background: '#d1fae5',
                                color: '#059669',
                                padding: '.2rem .75rem',
                                borderRadius: '1rem',
                                fontSize: '.75rem',
                                fontWeight: 600,
                            }}>
                                #{t.name}
                            </span>
                        ))}
                    </div>

                    {/* Titre */}
                    <h2 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#0c4a6e',
                        marginBottom: '.75rem',
                        lineHeight: 1.4,
                    }}>
                        {post.title}
                    </h2>

                    {/* Meta : auteur + date + vues */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        marginBottom: '1.25rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid #f1f5f9',
                        flexWrap: 'wrap',
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem', color: '#64748b' }}>
                            <User size={13} />
                            {post.author?.name ?? '—'}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem', color: '#64748b' }}>
                            <Calendar size={13} />
                            {post.created_at
                                ? new Date(post.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
                                : '—'
                            }
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.8rem', color: '#64748b' }}>
                            <Eye size={13} />
                            {(post.views_count ?? 0).toLocaleString('fr-FR')} vues
                        </span>
                    </div>

                    {/* Extrait */}
                    {post.excerpt && (
                        <p style={{
                            fontSize: '.9rem',
                            color: '#475569',
                            fontStyle: 'italic',
                            marginBottom: '1.25rem',
                            lineHeight: 1.7,
                            padding: '1rem',
                            background: '#f8fafc',
                            borderRadius: '.65rem',
                            borderLeft: '3px solid #38bdf8',
                        }}>
                            {post.excerpt}
                        </p>
                    )}

                    {/* Contenu */}
                    <div style={{
                        fontSize: '.9rem',
                        color: '#1e293b',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap',
                    }}>
                        {post.content}
                    </div>

                    {/* Motif de rejet précédent */}
                    {post.rejection_reason && (
                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: '#fef2f2',
                            border: '1.5px solid #fecaca',
                            borderLeft: '4px solid #ef4444',
                            borderRadius: '.75rem',
                        }}>
                            <p style={{ fontSize: '.78rem', fontWeight: 600, color: '#dc2626', marginBottom: '.35rem' }}>
                                Motif du rejet précédent
                            </p>
                            <p style={{ fontSize: '.85rem', color: '#64748b', lineHeight: 1.6 }}>
                                {post.rejection_reason}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer actions */}
                <div style={{
                    padding: '1rem 1.75rem',
                    borderTop: '1px solid #f1f5f9',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '.75rem',
                    flexShrink: 0,
                }}>
                    <Button variant="secondary" size="sm" onClick={onClose}>
                        Fermer
                    </Button>
                    {post.status === 'draft' ? (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                loading={rejecting}
                                onClick={onReject}
                                style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}
                            >
                                Rejeter
                            </Button>
                            <Button
                                variant="primary"
                                size="sm"
                                loading={publishing}
                                onClick={onPublish}
                            >
                                ✓ Publier
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            loading={rejecting}
                            onClick={onReject}
                            style={{ background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' }}
                        >
                            ↓ Dépublier
                        </Button>
                    )}
                </div>
            </div>
            <style>{`@keyframes modalIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }`}</style>
        </div>
    );
};

export default PostPreviewModal;
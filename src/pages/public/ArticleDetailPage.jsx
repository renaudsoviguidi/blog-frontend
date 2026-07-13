import React, { useState, useEffect } from 'react';
import { useParams, useNavigate }  from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, User, Tag } from 'lucide-react';
import HomeLayout from '../../layouts/HomeLayout';
import publicPostService  from '../../services/publicPostService';
import Spinner from '../../components/ui/Spinner';
import Button from '../../components/ui/Button';
import CommentSection from './CommentSection';
import '../../styles/article-body.css';

const ArticleDetailPage = () => {
    const { ref } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('Tous');

    useEffect(() => {
        setLoading(true);
        publicPostService.getOne(ref)
            .then(r => setPost(r.data?.data ?? null))
            .catch(() => setError('Article introuvable.'))
            .finally(() => setLoading(false));
    }, [ref]);

    return (
        <HomeLayout
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        >
            {/* Retour */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                style={{
                    marginBottom: '1.5rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.4rem',
                    color: '#64748b',
                    padding: '.4rem .75rem',
                    borderRadius: '.55rem',
                }}
            >
                <ArrowLeft size={15} /> Retour
            </Button>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                    <Spinner size="lg" />
                </div>
            ) : error ? (
                <div style={{
                    textAlign: 'center',
                    padding: '4rem',
                    color: '#94a3b8',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    {error}
                </div>
            ) : post && (
                <article>
                    {/* Catégories + Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem', marginBottom: '1rem' }}>
                        {(post.categories ?? []).map(c => (
                            <span key={c.ref} style={{
                                background: '#e0f2fe',
                                color: '#0284c7',
                                padding: '.25rem .75rem',
                                borderRadius: '1rem',
                                fontSize: '.75rem',
                                fontWeight: 600,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}>
                                {c.name}
                            </span>
                        ))}
                        {(post.tags ?? []).map(t => (
                            <span key={t.ref} style={{
                                background: '#f1f5f9',
                                color: '#64748b',
                                padding: '.25rem .75rem',
                                borderRadius: '1rem',
                                fontSize: '.75rem',
                                fontWeight: 500,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}>
                                <Tag size={10} style={{ marginRight: '.2rem' }} />
                                {t.name}
                            </span>
                        ))}
                    </div>

                    {/* Titre */}
                    <h1 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        fontWeight: 600,
                        color: '#0c4a6e',
                        lineHeight: 1.35,
                        marginBottom: '1rem',
                    }}>
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        flexWrap: 'wrap',
                        marginBottom: '1.5rem',
                        paddingBottom: '1.5rem',
                        borderBottom: '1px solid #f1f5f9',
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <User size={14} color="#94a3b8" />
                            {post.author?.name ?? 'MonBlog'}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <Calendar size={14} color="#94a3b8" />
                            {post.published_at
                                ? new Date(post.published_at).toLocaleDateString('fr-FR', {
                                    day: '2-digit', month: 'long', year: 'numeric',
                                })
                                : '—'
                            }
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '.4rem', fontSize: '.82rem', color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <Eye size={14} color="#94a3b8" />
                            {(post.views_count ?? 0).toLocaleString('fr-FR')} vues
                        </span>
                    </div>

                    {/* Image de couverture */}
                    {post.cover_image && (
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            style={{
                                width: '100%',
                                maxHeight: 360,
                                objectFit: 'cover',
                                borderRadius: '1rem',
                                marginBottom: '1.75rem',
                                border: '1px solid #f1f5f9',
                            }}
                        />
                    )}

                    {/* Extrait */}
                    {post.excerpt && (
                        <p style={{
                            fontSize: '.95rem',
                            color: '#475569',
                            fontStyle: 'italic',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem',
                            padding: '1rem 1.25rem',
                            background: '#f8fafc',
                            borderRadius: '.75rem',
                            borderLeft: '3px solid #38bdf8',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}>
                            {post.excerpt}
                        </p>
                    )}

                    {/* Contenu */}
                    <div
                        className="article-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <CommentSection postRef={ref} />
                </article>
            )}

            
        </HomeLayout>
    );
};

export default ArticleDetailPage;
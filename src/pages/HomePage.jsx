import React, { useState } from 'react';
import HomeLayout            from '../layouts/HomeLayout';
import { useNavigate }       from 'react-router-dom';
import { Frown, Search }            from 'lucide-react';
import publicPostService     from '../services/publicPostService';
import usePaginatedList      from '../hooks/usePaginatedList';
import Pagination            from '../components/shared/Pagination';
import Spinner               from '../components/ui/Spinner';
import { myroutes }          from '../routes/routes';

// ── Couleurs par catégorie ────────────────────────────────
const CATEGORY_COLORS = {
    'Backend': '#0ea5e9',
    'Frontend': '#6366f1',
    'Base de données': '#ef4444',
    'DevOps': '#8b5cf6',
    'Technologie': '#f59e0b',
};

const getCategoryColor = (categories) =>
    CATEGORY_COLORS[categories?.[0]?.name] ?? '#0ea5e9';

const HomePage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tous');

    /// - Appeler l'api pour récupérer la liste des articles publiés
    const list = usePaginatedList(
        p => publicPostService.getAll(p, {
            search: searchQuery,
            category_ref: activeCategory === 'Tous' ? '' : activeCategory,
        }),
        [searchQuery, activeCategory]
    );

    return (
        <HomeLayout
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        >
            {/* Hero */}
            <div className="hp-hero">
                <div className="hp-hero-pattern" />
                <div className="hp-hero-badge">
                    <div className="hp-hero-badge-dot" />
                    Blog tech & développement
                </div>
                <h1 className="hp-hero-title">
                    Des articles pour les <em>développeurs</em> qui veulent progresser
                </h1>
                <p className="hp-hero-desc">
                    Tutoriels, bonnes pratiques et retours d'expérience sur Laravel, React, Spring Boot et bien plus.
                </p>
                <div className="hp-hero-bottom">
                    <div className="hp-hero-stats">
                        <div>
                            <div className="hp-hero-stat-num">{list.meta?.total ?? '—'}</div>
                            <div className="hp-hero-stat-label">Articles</div>
                        </div>
                        <div>
                            <div className="hp-hero-stat-num">12k</div>
                            <div className="hp-hero-stat-label">Lecteurs</div>
                        </div>
                        <div>
                            <div className="hp-hero-stat-num">6</div>
                            <div className="hp-hero-stat-label">Catégories</div>
                        </div>
                    </div>
                    <button
                        className="hp-hero-btn"
                        onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Lire les articles →
                    </button>
                </div>
            </div>

            {/* Barre de recherche */}
            <div id="articles" className="hp-search-wrap">
              <Search
                  className="hp-search-icon"
                  size={14}
                  strokeWidth={2}
                  style={{ width: '.9rem' }}
              />
                <input
                    className="hp-search"
                    type="text"
                    placeholder="Rechercher un article…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            {/* En-tête section */}
            <div className="hp-section-header">
                <span className="hp-section-title">
                    {activeCategory === 'Tous' ? 'Tous les articles' : activeCategory}
                </span>
                <span className="hp-section-count">
                    {list.meta?.total ?? 0} article{(list.meta?.total ?? 0) > 1 ? 's' : ''}
                </span>
            </div>

            {/* Liste */}
            {list.loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                    <Spinner size="md" />
                </div>
            ) : list.items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                    <Frown
                        size={32}
                        strokeWidth={1.5}
                        style={{
                            margin: '0 auto .75rem',
                            display: 'block',
                            opacity: 0.4
                        }}
                    />
                    Aucun article trouvé.
                </div>
            ) : (
                <div className="hp-post-list">
                    {list.items.map((post, i) => {
                        const color = getCategoryColor(post.categories);
                        return (
                            <div
                                key={post.ref}
                                className="hp-post-card"
                                style={{ animationDelay: `${i * 0.06}s` }}
                                onClick={() => navigate(myroutes.article(post.ref))}
                            >
                                <div className="hp-post-card-accent" style={{ background: color }} />
                                <div className="hp-post-card-body">
                                    <div className="hp-post-card-top">
                                        {post.categories?.[0] && (
                                            <>
                                                <span className="hp-post-card-cat" style={{ color }}>
                                                    {post.categories[0].name}
                                                </span>
                                                <span className="hp-post-card-dot">·</span>
                                            </>
                                        )}
                                        <span className="hp-post-card-date">
                                            {post.published_at
                                                ? new Date(post.published_at).toLocaleDateString('fr-FR', {
                                                    day: '2-digit', month: 'long', year: 'numeric',
                                                })
                                                : '—'
                                            }
                                        </span>
                                    </div>

                                    <h3 className="hp-post-card-title">{post.title}</h3>

                                    {post.excerpt && (
                                        <p className="hp-post-card-excerpt">{post.excerpt}</p>
                                    )}

                                    <div className="hp-post-card-footer">
                                        <div className="hp-post-card-author">
                                            <div className="hp-post-avatar">
                                                {post.author?.name?.slice(0, 2).toUpperCase() ?? 'MB'}
                                            </div>
                                            <div>
                                                <div className="hp-post-author-name">
                                                    {post.author?.name ?? 'MonBlog'}
                                                </div>
                                                <div className="hp-post-meta">
                                                    {(post.views_count ?? 0).toLocaleString('fr-FR')} vues
                                                </div>
                                            </div>
                                        </div>
                                        <span className="hp-read-link">
                                            Lire <span>→</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            <div style={{ marginTop: '1.5rem' }}>
                <Pagination
                    meta={list.meta}
                    page={list.page}
                    onPageChange={list.setPage}
                />
            </div>
        </HomeLayout>
    );
};

export default HomePage;
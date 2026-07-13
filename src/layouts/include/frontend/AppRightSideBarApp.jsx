import React, { useEffect, useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import { ChartSpline, Flame, Mail } from 'lucide-react';
import Button from '../../../components/ui/Button';
import newsletterService from '../../../services/newsletterService';
import useToast from '../../../hooks/useToast';
import Toast from '../../../components/shared/Toast';
import { myroutes } from '../../../routes/routes';
import Input from '../../../components/ui/Input';
import publicPostService from '../../../services/publicPostService';
import publicTagService from '../../../services/publicTagService';

/// ─ Couleurs par catégorie
const CATEGORY_COLORS = {
    'Backend': '#0ea5e9',
    'Frontend': '#6366f1',
    'Base de données': '#ef4444',
    'DevOps': '#8b5cf6',
    'Technologie': '#f59e0b',
};

const getCategoryColor = (categories) =>
    CATEGORY_COLORS[categories?.[0]?.name] ?? '#0ea5e9';

/// ─ Skeleton loader
const SkeletonLine = ({ width = '100%', height = '0.75rem', mb = '.4rem' }) => (
    <div style={{
        width, height,
        background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.4s infinite',
        borderRadius: '.35rem',
        marginBottom: mb,
    }} />
);

const AppRightSideBarApp = ({ onTagClick }) => {
    const navigate = useNavigate();
    const { toasts, toast, removeToast } = useToast();
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    /// ─ State données dynamiques
    const [recommended, setRecommended] = useState([]);
    const [trending, setTrending] = useState([]);
    const [tags, setTags] = useState([]);
    const [loadingRecommend, setLoadingRecommend] = useState(true);
    const [loadingTrending, setLoadingTrending] = useState(true);
    const [loadingTags, setLoadingTags] = useState(true);

    /// ─ Chargement au montage
    useEffect(() => {
        publicPostService.getRecommended()
            .then(r => setRecommended(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoadingRecommend(false));

        publicPostService.getTrending()
            .then(r => setTrending(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoadingTrending(false));

        publicTagService.getPopular()
            .then(r => setTags(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoadingTags(false));
    }, []);

    console.log("tags : ", tags);

    /// - Newsletter
    const handleSubscribe = async () => {
        if (!email.trim()) return;
        setSubmitting(true);
        try {
            await newsletterService.subscribe(email);
            setSubscribed(true);
            setEmail('');
            toast.success('Inscription réussie ! Vérifiez votre boîte mail.');
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <aside className="hp-right">
            <div className="hp-right-inner">

                {/* À propos */}
                <div className="hp-widget">
                    <div className="hp-widget-title">À propos</div>
                    <div className="hp-author-card">
                        <div className="hp-author-avatar">AB</div>
                        <div>
                            <div className="hp-author-name">Admin Blog</div>
                            <div className="hp-author-role">Développeur & rédacteur</div>
                        </div>
                    </div>
                    <p className="hp-author-bio">
                        Passionné de développement web, je partage mes découvertes sur Laravel,
                        React, Spring Boot et les bonnes pratiques du métier.
                    </p>
                    <button
                        className="hp-author-btn"
                        onClick={() => navigate(myroutes.about)}
                    >
                        Voir le profil
                    </button>
                </div>

                {/* Newsletter */}
                <div className="hp-widget">
                    <div className="hp-widget-title">Newsletter</div>
                    <div className="hp-newsletter">
                        <div className="hp-newsletter-title" style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                            <Mail size={15} /> Restez informé
                        </div>
                        <p className="hp-newsletter-desc">
                            Recevez les nouveaux articles directement dans votre boîte mail. Pas de spam.
                        </p>

                        {subscribed ? (
                            <div style={{
                                padding: '.75rem',
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                borderLeft: '3px solid #10b981',
                                borderRadius: '.55rem',
                                fontSize: '.8rem',
                                color: '#065f46',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}>
                                ✓ Vous êtes abonné ! Merci.
                            </div>
                        ) : (
                            <>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                                    style={{ marginBottom: '.5rem' }}
                                />
                                <Button
                                    variant="primary"
                                    loading={submitting}
                                    onClick={handleSubscribe}
                                    style={{ width: '100%', marginTop: '0.5rem' }}
                                >
                                    S'abonner gratuitement
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Articles recommandés */}
                <div className="hp-widget">
                    <div className="hp-widget-title">Recommandés pour vous</div>
                    <div className="hp-rec-list">
                        {loadingRecommend ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: '.75rem', padding: '.5rem 0' }}>
                                    <SkeletonLine width="2rem" height="1.4rem" mb={0} />
                                    <div style={{ flex: 1 }}>
                                        <SkeletonLine width="60%" height=".6rem" />
                                        <SkeletonLine width="90%" height=".75rem" />
                                    </div>
                                </div>
                            ))
                        ) : recommended.length === 0 ? (
                            <p style={{ fontSize: '.8rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Aucun article disponible.
                            </p>
                        ) : (
                            recommended.map((post, i) => {
                                const color = getCategoryColor(post.categories);
                                return (
                                    <div
                                        key={post.ref}
                                        className="hp-rec-item"
                                        onClick={() => navigate(myroutes.article(post.ref))}
                                    >
                                        <div className="hp-rec-num">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                        <div className="hp-rec-body">
                                            {post.categories?.[0] && (
                                                <div className="hp-rec-cat" style={{ color }}>
                                                    {post.categories[0].name}
                                                </div>
                                            )}
                                            <div className="hp-rec-title">{post.title}</div>
                                            <div className="hp-rec-time">
                                                {(post.views_count ?? 0).toLocaleString('fr-FR')} vues
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Tendances */}
                <div className="hp-widget">
                    <div className="hp-widget-title" style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                        <Flame size={15} color="#f97316" /> Tendances
                    </div>
                    <div className="hp-trending-list">
                        {loadingTrending ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} style={{
                                    display: 'flex', gap: '.65rem', padding: '.6rem .75rem',
                                    background: '#f8faff', borderRadius: '.65rem', marginBottom: '.6rem',
                                }}>
                                    <SkeletonLine width="1.75rem" height="1.75rem" mb={0} />
                                    <div style={{ flex: 1 }}>
                                        <SkeletonLine width="80%" height=".75rem" />
                                        <SkeletonLine width="40%" height=".6rem"  />
                                    </div>
                                </div>
                            ))
                        ) : trending.length === 0 ? (
                            <p style={{ fontSize: '.8rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Aucune tendance disponible.
                            </p>
                        ) : (
                            trending.map(post => {
                                const category = post.categories?.[0]?.name ?? '—';
                                return (
                                    <div
                                        key={post.ref}
                                        className="hp-trending-item"
                                        onClick={() => navigate(myroutes.article(post.ref))}
                                    >
                                        <div className="hp-trending-icon">
                                            <ChartSpline size={14} color="#0284c7" />
                                        </div>
                                        <div className="hp-trending-body">
                                            <div className="hp-trending-title">{post.title}</div>
                                            <div className="hp-trending-views">
                                                {(post.views_count ?? 0).toLocaleString('fr-FR')} vues
                                            </div>
                                        </div>
                                        <span className="hp-trending-badge">{category}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Tags populaires */}
                <div className="hp-widget">
                    <div className="hp-widget-title">Tags populaires</div>
                    <div className="hp-tags">
                        {loadingTags ? (
                            Array.from({ length: 8 }).map((_, i) => (
                                <SkeletonLine
                                    key={i}
                                    width={`${50 + Math.random() * 40}px`}
                                    height="1.75rem"
                                    mb={0}
                                />
                            ))
                        ) : tags.length === 0 ? (
                            <p style={{ fontSize: '.8rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Aucun tag disponible.
                            </p>
                        ) : (
                            tags.map(tag => (
                                <span
                                    key={tag.ref}
                                    className="hp-tag"
                                    onClick={() => onTagClick?.(tag.name)}
                                >
                                    {tag.name}
                                </span>
                            ))
                        )}
                    </div>
                </div>

            </div>
            <Toast toasts={toasts} removeToast={removeToast} />
            <style>{`@keyframes shimmer { from{background-position:200% 0} to{background-position:-200% 0} }`}</style>
        </aside>
    );
};

export default AppRightSideBarApp;
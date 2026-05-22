import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import { ChartSpline, Flame, Shredder } from 'lucide-react';

const RECOMMENDED = [
    { id: 3, title: "React 19 : ce que chaque dev doit savoir", category: "Frontend", readTime: "5 min", color: "#6366f1" },
    { id: 4, title: "Construire une API REST propre avec Spring Boot", category: "Backend", readTime: "10 min", color: "#10b981" },
    { id: 7, title: "Docker & DevOps : les bases indispensables", category: "DevOps", readTime: "9 min", color: "#8b5cf6" },
    { id: 5, title: "Tailwind CSS v4 : tout ce qui change", category: "Frontend", readTime: "4 min", color: "#f59e0b" },
];

const TRENDING = [
    { id: 2, title: "Maîtriser Laravel 11", views: "2.4k", category: "Backend" },
    { id: 3, title: "React 19 : les nouveautés", views: "1.8k", category: "Frontend" },
    { id: 6, title: "PostgreSQL vs MySQL", views: "1.2k", category: "BDD" },
];

const TAGS = [
    "Laravel", "React", "Spring Boot", "Docker", "PostgreSQL",
    "Tailwind", "TypeScript", "DevOps", "API REST", "MySQL",
    "PHP", "JavaScript", "Git", "Linux",
];
const AppRightSideBarApp = () => {
    const navigate = useNavigate();

    return (
        <aside className="hp-right">
            <div className="hp-right-inner">
                {/* À propos de l'auteur */}
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
                    Passionné de développement web, je partage mes découvertes sur Laravel, React, Spring Boot et les bonnes pratiques du métier.
                </p>
                <button className="hp-author-btn">Voir le profil</button>
                </div>

                {/* Newsletter */}
                <div className="hp-widget">
                <div className="hp-widget-title">Newsletter</div>
                <div className="hp-newsletter">
                    <div className="hp-newsletter-title flex items-center gap-1"><Shredder className="w-[1.1rem] h-[1.1rem]" /> Restez informé</div>
                    <p className="hp-newsletter-desc">
                    Recevez les nouveaux articles directement dans votre boîte mail. Pas de spam.
                    </p>
                    <input className="hp-newsletter-input" type="email" placeholder="votre@email.com" />
                    <Button
                        variant="primary"
                        style={{ width: '100%', marginTop: '.5rem' }}
                    >
                        S'abonner gratuitement
                    </Button>
                </div>
                </div>

                {/* Articles recommandés */}
                <div className="hp-widget">
                <div className="hp-widget-title">Recommandés pour vous</div>
                <div className="hp-rec-list">
                    {RECOMMENDED.map((post, i) => (
                    <div key={post.id} className="hp-rec-item" onClick={() => navigate(`/articles/${post.id}`)}>
                        <div className="hp-rec-num">{String(i + 1).padStart(2, "0")}</div>
                        <div className="hp-rec-body">
                        <div className="hp-rec-cat" style={{ color: post.color }}>{post.category}</div>
                        <div className="hp-rec-title">{post.title}</div>
                        <div className="hp-rec-time">{post.readTime} de lecture</div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Tendances */}
                <div className="hp-widget">
                <div className="hp-widget-title flex items-center gap-1"><Flame className="w-[1.1rem] h-[1.1rem]" /> Tendances</div>
                <div className="hp-trending-list">
                    {TRENDING.map((post) => (
                    <div key={post.id} className="hp-trending-item" onClick={() => navigate(`/articles/${post.id}`)}>
                        <div className="hp-trending-icon"><ChartSpline className="w-[1.1rem] h-[1.1rem]"/></div>
                        <div className="hp-trending-body">
                        <div className="hp-trending-title">{post.title}</div>
                        <div className="hp-trending-views">{post.views} vues</div>
                        </div>
                        <span className="hp-trending-badge">{post.category}</span>
                    </div>
                    ))}
                </div>
                </div>

                {/* Tags populaires */}
                <div className="hp-widget">
                <div className="hp-widget-title">Tags populaires</div>
                <div className="hp-tags">
                    {TAGS.map((tag) => (
                    <span
                        key={tag}
                        className="hp-tag"
                        onClick={() => setSearchQuery(tag)}
                    >
                        {tag}
                    </span>
                    ))}
                </div>
                </div>
            </div>
        </aside>
    )
}

export default AppRightSideBarApp

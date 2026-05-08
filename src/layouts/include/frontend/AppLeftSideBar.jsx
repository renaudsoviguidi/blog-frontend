import React from 'react'
import { myroutes } from '../../../routes/routes';
import { useCurrentUser } from '../../../features/auth/hooks';
import { Link, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
    { label: "Accueil", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Catégories", href: "/categories" },
    { label: "À propos", href: "/a-propos" },
];

const CATEGORIES = [
    { name: "Tous", count: 48, icon: "◈" },
    { name: "Backend", count: 18, icon: "⬡" },
    { name: "Frontend", count: 15, icon: "◇" },
    { name: "Base de données", count: 8, icon: "○" },
    { name: "Technologie", count: 7, icon: "△" },
    { name: "DevOps", count: 6, icon: "□" },
];
const AppLeftSideBar = ({ activeCategory, setActiveCategory }) => {

    const navigate = useNavigate();
    const user = useCurrentUser();

    return (
        <aside className="hp-sidebar">
            <a href="/" className="hp-sidebar-logo">
            <div className="hp-sidebar-logo-mark">
                <svg viewBox="0 0 24 24" fill="none" style={{ width: ".9rem" }} stroke="white" strokeWidth="2.5">
                <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/>
                </svg>
            </div>
            <span className="hp-sidebar-logo-name">MonBlog</span>
            </a>

            <nav className="hp-sidebar-nav">
            <div className="hp-sidebar-label">Navigation</div>
            {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className={`hp-sidebar-link ${link.href === "/" ? "active" : ""}`}>
                {link.href === "/" && <svg className="hp-sidebar-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>}
                {link.href === "/articles" && <svg className="hp-sidebar-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/></svg>}
                {link.href === "/categories" && <svg className="hp-sidebar-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>}
                {link.href === "/a-propos" && <svg className="hp-sidebar-icon" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>}
                {link.label}
                </a>
            ))}

            <div className="hp-sidebar-divider" />

            <div className="hp-sidebar-label">Catégories</div>
            {CATEGORIES.map((cat) => (
                <div
                key={cat.name}
                className={`hp-sidebar-cat ${activeCategory === cat.name ? "active" : ""}`}
                onClick={() => { setActiveCategory(cat.name); document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" }); }}
                >
                <div className="hp-sidebar-cat-left">
                    <span className="hp-sidebar-cat-icon">{cat.icon}</span>
                    {cat.name}
                </div>
                <span className="hp-sidebar-cat-badge">{cat.count}</span>
                </div>
            ))}
            </nav>

            <div className="hp-sidebar-footer">
            {user ? (
                <Link to={myroutes.dashboard}>
                <div className="hp-user-chip">
                    <div className="hp-user-avatar">{user.name?.slice(0, 2).toUpperCase()}</div>
                    <div className="hp-user-info">
                    <div className="hp-user-name">{user.name?.split(" ")[0]}</div>
                    <div className="hp-user-role">Mon espace →</div>
                    </div>
                </div>
                </Link>
            ) : (
                <>
                <button className="hp-sbtn hp-sbtn-primary" onClick={() => navigate(myroutes.login)}>Connexion</button>
                <button className="hp-sbtn hp-sbtn-ghost" onClick={() => navigate(myroutes.login)}>S'inscrire</button>
                </>
            )}
            </div>
        </aside>
    )
}

export default AppLeftSideBar

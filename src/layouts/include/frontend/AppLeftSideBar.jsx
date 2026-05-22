import React, { useState, useEffect } from 'react';
import {
    PenSquare, House, FileText,
    LayoutGrid, Info, Layers,
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { myroutes }           from '../../../routes/routes';
import { useCurrentUser }     from '../../../features/auth/hooks';
import publicCategoryService  from '../../../services/publicCategoryService';
import Button                 from '../../../components/ui/Button';

const NAV_LINKS = [
    { label: 'Accueil',     href: myroutes.homepage,          icon: House      },
    { label: 'Articles',    href: myroutes.articles,           icon: FileText   },
    { label: 'Catégories',  href: myroutes.publicCategories,   icon: LayoutGrid },
    { label: 'À propos',    href: myroutes.about,              icon: Info       },
];

const AppLeftSideBar = ({ activeCategory, setActiveCategory }) => {
    const navigate          = useNavigate();
    const location          = useLocation();
    const user              = useCurrentUser();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        publicCategoryService.getAll()
            .then(r => setCategories(r.data?.data ?? []))
            .catch(() => {});
    }, []);

    const isActive = (href) => location.pathname === href;

    return (
        <aside className="hp-sidebar">

            {/* Logo */}
            <a href={myroutes.homepage} className="hp-sidebar-logo">
                <div className="hp-sidebar-logo-mark">
                    <PenSquare size={16} strokeWidth={2.5} color="white" />
                </div>
                <span className="hp-sidebar-logo-name">MonBlog</span>
            </a>

            <nav className="hp-sidebar-nav">

                {/* Navigation principale */}
                <div className="hp-sidebar-label">Navigation</div>
                {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                    <a
                        key={href}
                        href={href}
                        className={`hp-sidebar-link ${isActive(href) ? 'active' : ''}`}
                    >
                        <Icon className="hp-sidebar-icon" size={18} strokeWidth={2} />
                        {label}
                    </a>
                ))}

                <div className="hp-sidebar-divider" />

                {/* Catégories dynamiques */}
                <div className="hp-sidebar-label">Catégories</div>

                {/* "Tous" toujours en premier */}
                <div
                    className={`hp-sidebar-cat ${activeCategory === 'Tous' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveCategory('Tous');
                        document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                >
                    <div className="hp-sidebar-cat-left">
                        <Layers size={16} strokeWidth={2} className="hp-sidebar-cat-icon" />
                        Tous
                    </div>
                </div>

                {/* Catégories depuis l'API */}
                {categories.map(cat => (
                    <div
                        key={cat.ref}
                        className={`hp-sidebar-cat ${activeCategory === cat.name ? 'active' : ''}`}
                        onClick={() => {
                            setActiveCategory(cat.name);
                            document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <div className="hp-sidebar-cat-left">
                            <LayoutGrid size={16} strokeWidth={2} className="hp-sidebar-cat-icon" />
                            {cat.name}
                        </div>
                        {cat.posts_count !== undefined && (
                            <span className="hp-sidebar-cat-badge">{cat.posts_count}</span>
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="hp-sidebar-footer">
                {user ? (
                    <Link to={myroutes.dashboard}>
                        <div className="hp-user-chip">
                            <div className="hp-user-avatar">
                                {user.name?.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="hp-user-info">
                                <div className="hp-user-name">{user.name?.split(' ')[0]}</div>
                                <div className="hp-user-role">Mon espace →</div>
                            </div>
                        </div>
                    </Link>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                        <Button
                            variant="primary"
                            onClick={() => navigate(myroutes.login)}
                            style={{ width: '100%' }}
                        >
                            Connexion
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(myroutes.login)}
                            style={{ width: '100%' }}
                        >
                            S'inscrire
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default AppLeftSideBar;
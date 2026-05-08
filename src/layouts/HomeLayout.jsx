import React from 'react'
import AppLeftSideBar from './include/frontend/AppLeftSideBar'
import AppFooter from './include/frontend/AppFooter'
import AppRightSideBarApp from './include/frontend/AppRightSideBarApp'

const HomeLayout = ({ children }) => {
    
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                .hp-root {
                min-height: 100vh;
                font-family: 'Plus Jakarta Sans', sans-serif;
                background: #f8faff;
                color: #1e293b;
                display: flex;
                align-items: stretch;
                }

                /* ══════════════════════════
                SIDEBAR GAUCHE
                ══════════════════════════ */
                .hp-sidebar {
                width: 230px; min-height: 100vh; height: 100%;
                position: fixed; top: 0; left: 0;
                background: white; border-right: 1px solid #e0f2fe;
                display: flex; flex-direction: column;
                z-index: 100; overflow-y: auto;
                }

                .hp-sidebar-logo {
                display: flex; align-items: center; gap: .6rem;
                padding: 1.5rem 1.25rem 1.25rem;
                text-decoration: none;
                border-bottom: 1px solid #f0f9ff;
                flex-shrink: 0;
                }
                .hp-sidebar-logo-mark {
                width: 2rem; height: 2rem;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                border-radius: .5rem;
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .hp-sidebar-logo-name {
                font-family: 'Lora', serif;
                font-size: 1.2rem; font-weight: 600; color: #0c4a6e;
                }

                .hp-sidebar-nav { padding: 1rem 0; flex: 1; }

                .hp-sidebar-label {
                font-size: .62rem; text-transform: uppercase;
                letter-spacing: .1em; color: #94a3b8; font-weight: 600;
                padding: 0 1.25rem .45rem;
                }

                .hp-sidebar-link {
                display: flex; align-items: center; gap: .65rem;
                padding: .6rem 1.25rem; color: #64748b;
                text-decoration: none; font-size: .875rem; font-weight: 500;
                transition: all .15s; border-left: 3px solid transparent;
                }
                .hp-sidebar-link:hover { color: #0284c7; background: #f0f9ff; border-left-color: #bae6fd; }
                .hp-sidebar-link.active { color: #0284c7; background: #e0f2fe; border-left-color: #0284c7; font-weight: 600; }
                .hp-sidebar-icon { width: 1rem; height: 1rem; opacity: .7; flex-shrink: 0; }

                .hp-sidebar-divider { height: 1px; background: #f0f9ff; margin: .75rem 1.25rem; }

                .hp-sidebar-cat {
                display: flex; align-items: center; justify-content: space-between;
                padding: .45rem 1.25rem; cursor: pointer;
                color: #64748b; font-size: .82rem; font-weight: 400;
                transition: all .15s; border-left: 3px solid transparent;
                }
                .hp-sidebar-cat:hover { color: #0284c7; background: #f0f9ff; border-left-color: #bae6fd; }
                .hp-sidebar-cat.active { color: #0284c7; font-weight: 600; background: #e0f2fe; border-left-color: #0284c7; }
                .hp-sidebar-cat-left { display: flex; align-items: center; gap: .45rem; }
                .hp-sidebar-cat-icon { font-size: .7rem; color: #94a3b8; }
                .hp-sidebar-cat-badge {
                font-size: .68rem; background: #f1f5f9; color: #94a3b8;
                padding: .08rem .38rem; border-radius: 1rem; font-weight: 500;
                }
                .hp-sidebar-cat.active .hp-sidebar-cat-badge { background: #bae6fd; color: #0369a1; }

                .hp-sidebar-footer {
                padding: 1rem 1.25rem;
                border-top: 1px solid #f0f9ff;
                flex-shrink: 0;
                }
                .hp-user-chip {
                display: flex; align-items: center; gap: .55rem;
                padding: .55rem .75rem; background: #f0f9ff;
                border: 1px solid #e0f2fe; border-radius: .75rem;
                cursor: pointer; transition: all .2s; margin-bottom: .6rem;
                }
                .hp-user-chip:hover { background: #e0f2fe; border-color: #bae6fd; }
                .hp-user-avatar {
                width: 1.75rem; height: 1.75rem; border-radius: 50%;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                display: flex; align-items: center; justify-content: center;
                font-size: .65rem; font-weight: 700; color: white; flex-shrink: 0;
                }
                .hp-user-info { flex: 1; min-width: 0; }
                .hp-user-name { font-size: .78rem; font-weight: 600; color: #0c4a6e; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .hp-user-role { font-size: .67rem; color: #94a3b8; }

                .hp-sbtn {
                width: 100%; padding: .5rem; border-radius: .55rem;
                font-size: .82rem; font-weight: 500; cursor: pointer;
                font-family: 'Plus Jakarta Sans', sans-serif; transition: all .2s; border: none;
                display: block;
                }
                .hp-sbtn-primary {
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                color: white; box-shadow: 0 2px 8px rgba(2,132,199,.2);
                margin-bottom: .4rem;
                }
                .hp-sbtn-primary:hover { box-shadow: 0 4px 14px rgba(2,132,199,.3); transform: translateY(-1px); }
                .hp-sbtn-ghost {
                background: transparent; color: #64748b;
                border: 1.5px solid #e2e8f0 !important;
                }
                .hp-sbtn-ghost:hover { border-color: #bae6fd !important; color: #0284c7; background: #f0f9ff; }

                /* ══════════════════════════
                CONTENU PRINCIPAL
                ══════════════════════════ */
                .hp-main {
                margin-left: 230px;
                flex: 1; min-width: 0;
                display: flex;
                align-items: stretch;
                min-height: 100vh;
                }

                /* Zone centrale des articles */
                .hp-center {
                flex: 1; min-width: 0;
                padding: 2.5rem 2rem;
                }

                /* ── Hero compact ── */
                .hp-hero {
                background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
                border-radius: 1.25rem; padding: 2.25rem 2rem;
                margin-bottom: 2rem; position: relative; overflow: hidden;
                }
                .hp-hero-pattern {
                position: absolute; inset: 0;
                background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px);
                background-size: 22px 22px;
                }
                .hp-hero-badge {
                position: relative; z-index: 1;
                display: inline-flex; align-items: center; gap: .4rem;
                background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
                border-radius: 2rem; padding: .25rem .75rem;
                font-size: .72rem; font-weight: 600; color: white;
                text-transform: uppercase; letter-spacing: .07em; margin-bottom: 1rem;
                }
                .hp-hero-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #7dd3fc; animation: blink 2s infinite; }
                @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.4} }
                .hp-hero-title {
                position: relative; z-index: 1;
                font-family: 'Lora', serif;
                font-size: clamp(1.4rem, 2.5vw, 1.9rem);
                font-weight: 600; line-height: 1.25; color: white; margin-bottom: .85rem;
                }
                .hp-hero-title em { font-style: italic; color: #bae6fd; }
                .hp-hero-desc {
                position: relative; z-index: 1;
                font-size: .875rem; color: rgba(255,255,255,0.78);
                line-height: 1.65; margin-bottom: 1.5rem; font-weight: 300; max-width: 520px;
                }
                .hp-hero-bottom {
                position: relative; z-index: 1;
                display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
                }
                .hp-hero-stats { display: flex; gap: 2rem; }
                .hp-hero-stat-num { font-family: 'Lora', serif; font-size: 1.35rem; font-weight: 600; color: white; }
                .hp-hero-stat-label { font-size: .72rem; color: rgba(255,255,255,0.65); }
                .hp-hero-btn {
                padding: .6rem 1.4rem;
                background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.4);
                border-radius: .7rem; color: white; font-size: .875rem; font-weight: 600;
                cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
                transition: all .2s; backdrop-filter: blur(4px); white-space: nowrap;
                }
                .hp-hero-btn:hover { background: rgba(255,255,255,0.28); }

                /* ── Searchbar + titre section ── */
                .hp-search-wrap { position: relative; margin-bottom: 1.25rem; }
                .hp-search-icon { position: absolute; left: .9rem; top: 50%; transform: translateY(-50%); color: #94a3b8; }
                .hp-search {
                width: 100%; padding: .6rem .9rem .6rem 2.5rem;
                border: 1.5px solid #e2e8f0; border-radius: .75rem;
                font-size: .875rem; color: #1e293b; background: white;
                font-family: 'Plus Jakarta Sans', sans-serif; outline: none; transition: all .2s;
                }
                .hp-search:focus { border-color: #38bdf8; box-shadow: 0 0 0 3px rgba(56,189,248,.12); }

                .hp-section-header {
                display: flex; align-items: center; justify-content: space-between;
                margin-bottom: 1.1rem;
                }
                .hp-section-title {
                font-family: 'Lora', serif;
                font-size: 1.1rem; font-weight: 600; color: #0c4a6e;
                }
                .hp-section-count { font-size: .78rem; color: #94a3b8; }

                /* ── Post cards (liste verticale style Medium) ── */
                .hp-post-list { display: flex; flex-direction: column; gap: 1rem; }

                .hp-post-card {
                background: white; border-radius: .9rem; overflow: hidden;
                border: 1px solid #f1f5f9; transition: all .2s; cursor: pointer;
                display: flex; align-items: stretch;
                animation: fadeUp .4s ease both;
                }
                .hp-post-card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.07); border-color: #bae6fd; transform: translateX(2px); }
                @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

                .hp-post-card-accent { width: 4px; flex-shrink: 0; }
                .hp-post-card-body { padding: 1.1rem 1.25rem; flex: 1; min-width: 0; }

                .hp-post-card-top { display: flex; align-items: center; gap: .5rem; margin-bottom: .5rem; }
                .hp-post-card-cat {
                font-size: .65rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em;
                }
                .hp-post-card-dot { color: #e2e8f0; font-size: .7rem; }
                .hp-post-card-date { font-size: .72rem; color: #94a3b8; }

                .hp-post-card-title {
                font-family: 'Lora', serif; font-size: .975rem; font-weight: 600;
                color: #0c4a6e; line-height: 1.4; margin-bottom: .45rem;
                }
                .hp-post-card-excerpt {
                font-size: .82rem; color: #64748b; line-height: 1.6; margin-bottom: .85rem;
                font-weight: 300;
                display: -webkit-box; -webkit-line-clamp: 2;
                -webkit-box-orient: vertical; overflow: hidden;
                }
                .hp-post-card-footer {
                display: flex; align-items: center; justify-content: space-between;
                }
                .hp-post-card-author { display: flex; align-items: center; gap: .4rem; }
                .hp-post-avatar {
                width: 1.5rem; height: 1.5rem; border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-size: .57rem; font-weight: 700; color: white;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                }
                .hp-post-author-name { font-size: .72rem; font-weight: 500; color: #475569; }
                .hp-post-meta { font-size: .7rem; color: #94a3b8; }
                .hp-read-link {
                font-size: .75rem; color: #0284c7; font-weight: 600;
                text-decoration: none; display: flex; align-items: center;
                gap: .2rem; transition: gap .15s; flex-shrink: 0;
                }
                .hp-read-link:hover { gap: .4rem; }

                /* ══════════════════════════
                SIDEBAR DROITE
                ══════════════════════════ */
                .hp-right {
                width: 280px;
                flex-shrink: 0;
                border-left: 1px solid #f0f7ff;
                background: white;
                position: relative; /* plus de sticky ici */
                }

                .hp-right-inner {
                position: sticky;
                top: 0;
                height: 100vh;
                overflow-y: auto;
                padding: 2.5rem 0;
                }

                /* Scrollbar discrète */
                .hp-right::-webkit-scrollbar { width: 3px; }
                .hp-right::-webkit-scrollbar-track { background: transparent; }
                .hp-right::-webkit-scrollbar-thumb { background: #e0f2fe; border-radius: 2px; }

                /* Widget générique */
                .hp-widget { padding: 0 1.5rem 1.75rem; }
                .hp-widget + .hp-widget { border-top: 1px solid #f0f7ff; padding-top: 1.75rem; }

                .hp-widget-title {
                font-family: 'Lora', serif;
                font-size: .95rem; font-weight: 600; color: #0c4a6e;
                margin-bottom: 1rem;
                }

                /* ── Articles recommandés ── */
                .hp-rec-list { display: flex; flex-direction: column; gap: .75rem; }

                .hp-rec-item {
                display: flex; gap: .75rem; align-items: flex-start;
                cursor: pointer; padding: .5rem; border-radius: .6rem;
                transition: background .15s; margin: 0 -.5rem;
                }
                .hp-rec-item:hover { background: #f0f9ff; }

                .hp-rec-num {
                font-family: 'Lora', serif;
                font-size: 1.4rem; font-weight: 600; color: #e0f2fe;
                line-height: 1; flex-shrink: 0; width: 1.5rem; text-align: center;
                }

                .hp-rec-body { flex: 1; min-width: 0; }
                .hp-rec-cat {
                font-size: .65rem; font-weight: 600; text-transform: uppercase;
                letter-spacing: .06em; margin-bottom: .2rem;
                }
                .hp-rec-title {
                font-size: .82rem; font-weight: 600; color: #1e293b;
                line-height: 1.4;
                display: -webkit-box; -webkit-line-clamp: 2;
                -webkit-box-orient: vertical; overflow: hidden;
                }
                .hp-rec-time { font-size: .68rem; color: #94a3b8; margin-top: .2rem; }

                /* ── Tendances ── */
                .hp-trending-list { display: flex; flex-direction: column; gap: .6rem; }

                .hp-trending-item {
                display: flex; align-items: center; gap: .65rem;
                padding: .6rem .75rem; background: #f8faff;
                border: 1px solid #f1f5f9; border-radius: .65rem;
                cursor: pointer; transition: all .15s;
                }
                .hp-trending-item:hover { background: #e0f2fe; border-color: #bae6fd; }

                .hp-trending-icon {
                width: 1.75rem; height: 1.75rem; border-radius: .4rem;
                background: linear-gradient(135deg, #e0f2fe, #bae6fd);
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; font-size: .75rem;
                }
                .hp-trending-body { flex: 1; min-width: 0; }
                .hp-trending-title {
                font-size: .8rem; font-weight: 600; color: #1e293b;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
                }
                .hp-trending-views { font-size: .68rem; color: #94a3b8; }
                .hp-trending-badge {
                font-size: .65rem; font-weight: 600; color: #0284c7;
                background: #e0f2fe; padding: .15rem .4rem; border-radius: .35rem; flex-shrink: 0;
                }

                /* ── Tags ── */
                .hp-tags { display: flex; flex-wrap: wrap; gap: .4rem; }
                .hp-tag {
                padding: .3rem .7rem; border-radius: 2rem;
                font-size: .75rem; font-weight: 500; color: #475569;
                background: white; border: 1.5px solid #e2e8f0;
                cursor: pointer; transition: all .15s;
                }
                .hp-tag:hover { border-color: #38bdf8; color: #0284c7; background: #f0f9ff; }

                /* ── Newsletter widget ── */
                .hp-newsletter {
                background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
                border: 1px solid #bae6fd; border-radius: .9rem; padding: 1.1rem;
                }
                .hp-newsletter-title {
                font-family: 'Lora', serif;
                font-size: .9rem; font-weight: 600; color: #0c4a6e; margin-bottom: .35rem;
                }
                .hp-newsletter-desc { font-size: .78rem; color: #64748b; margin-bottom: .85rem; line-height: 1.55; font-weight: 300; }
                .hp-newsletter-input {
                width: 100%; padding: .5rem .75rem;
                border: 1.5px solid #bae6fd; border-radius: .55rem;
                font-size: .82rem; font-family: 'Plus Jakarta Sans', sans-serif;
                background: white; outline: none; margin-bottom: .5rem;
                transition: border-color .2s;
                }
                .hp-newsletter-input:focus { border-color: #0284c7; }
                .hp-newsletter-btn {
                width: 100%; padding: .5rem;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                border: none; border-radius: .55rem; color: white;
                font-size: .82rem; font-weight: 600; cursor: pointer;
                font-family: 'Plus Jakarta Sans', sans-serif; transition: all .2s;
                }
                .hp-newsletter-btn:hover { box-shadow: 0 3px 10px rgba(2,132,199,.3); transform: translateY(-1px); }

                /* ── Auteur widget ── */
                .hp-author-card {
                display: flex; gap: .85rem; align-items: center;
                margin-bottom: 1rem;
                }
                .hp-author-avatar {
                width: 3rem; height: 3rem; border-radius: 50%; flex-shrink: 0;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                display: flex; align-items: center; justify-content: center;
                font-size: 1rem; font-weight: 700; color: white;
                }
                .hp-author-name { font-size: .9rem; font-weight: 600; color: #0c4a6e; margin-bottom: .1rem; }
                .hp-author-role { font-size: .75rem; color: #94a3b8; }
                .hp-author-bio { font-size: .8rem; color: #64748b; line-height: 1.6; margin-bottom: .85rem; font-weight: 300; }
                .hp-author-btn {
                width: 100%; padding: .45rem;
                background: #e0f2fe; border: none; border-radius: .55rem;
                color: #0284c7; font-size: .8rem; font-weight: 600;
                cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; transition: all .15s;
                }
                .hp-author-btn:hover { background: #bae6fd; }

                /* ── Footer ── */
                .hp-footer {
                background: #0c4a6e; color: rgba(255,255,255,0.7);
                padding: 2rem 2rem;
                }
                .hp-footer-inner {
                display: flex; justify-content: space-between; align-items: center;
                flex-wrap: wrap; gap: 1rem;
                }
                .hp-footer-logo { font-family: 'Lora', serif; font-size: 1.1rem; color: white; font-weight: 600; }
                .hp-footer-copy { font-size: .78rem; }
                .hp-footer-links { display: flex; gap: 1.25rem; }
                .hp-footer-links a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: .8rem; transition: color .2s; }
                .hp-footer-links a:hover { color: white; }

                /* ── Responsive ── */
                @media (max-width: 1280px) {
                .hp-right { width: 240px; }
                }
                @media (max-width: 1100px) {
                .hp-right { display: none; }
                .hp-center { max-width: 100%; }
                }
                @media (max-width: 860px) {
                .hp-sidebar { transform: translateX(-100%); }
                .hp-main { margin-left: 0; }
                .hp-center { padding: 1.5rem; }
                }
            `}</style>

            <div className="hp-root">
                {/* SIDEBAR GAUCHE */}
                <AppLeftSideBar />

                {/* CONTENU + SIDEBAR DROITE */}
                <main className="hp-main">
                    <div className="hp-center">
                        {children}
                        {/* Footer */}
                        <AppFooter />
                    </div>

                    {/* SIDEBAR DROITE */}
                    <AppRightSideBarApp />
                </main>
            </div>
        </>
    )
}

export default HomeLayout

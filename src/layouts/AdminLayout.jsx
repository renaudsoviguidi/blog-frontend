import React from 'react'
import AppSideBar from './include/backend/AppSideBar';
import AppTopBar from './include/backend/AppTopBar';

const AdminLayout = ({ children }) => {
    
    return (
        <>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Lora:wght@500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

            *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

            .db-root {
                min-height: 100vh; display: flex;
                font-family: 'Plus Jakarta Sans', sans-serif;
                background: #f0f7ff; color: #1e293b;
            }

            /* ── Sidebar ── */
            .db-sidebar {
                width: 240px; min-height: 100vh;
                background: #0c4a6e;
                display: flex; flex-direction: column;
                transition: width .25s ease;
                position: sticky; top: 0; height: 100vh; flex-shrink: 0;
                overflow: hidden;
            }
            .db-sidebar.collapsed { width: 64px; }

            .db-sidebar-header {
                padding: 1.5rem 1.25rem;
                display: flex; align-items: center; justify-content: space-between;
                border-bottom: 1px solid rgba(255,255,255,.1);
            }
            .db-sidebar-logo {
                display: flex; align-items: center; gap: .6rem; overflow: hidden;
            }
            .db-sidebar-logo-mark {
                width: 2rem; height: 2rem; flex-shrink: 0;
                background: linear-gradient(135deg, #38bdf8, #0ea5e9);
                border-radius: .5rem; display: flex; align-items: center; justify-content: center;
            }
            .db-sidebar-logo-name {
                font-family: 'Lora', serif; font-size: 1.1rem; color: white; font-weight: 600;
                white-space: nowrap;
            }
            .db-collapse-btn {
                background: rgba(255,255,255,.1); border: none; border-radius: .4rem;
                width: 1.75rem; height: 1.75rem; cursor: pointer; color: rgba(255,255,255,.7);
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                transition: background .2s;
            }
            .db-collapse-btn:hover { background: rgba(255,255,255,.2); }

            .db-nav { flex: 1; padding: 1rem 0; overflow-y: auto; }
            .db-nav-section { padding: 0 1rem .25rem; margin-bottom: .25rem; }
            .db-nav-section-label {
                font-size: .65rem; text-transform: uppercase; letter-spacing: .1em;
                color: rgba(255,255,255,.35); font-weight: 600; padding: 0 .25rem;
                white-space: nowrap; overflow: hidden;
            }
            .db-nav-item {
                display: flex; align-items: center; gap: .75rem;
                padding: .6rem 1.25rem; cursor: pointer;
                border-radius: 0; transition: all .2s; color: rgba(255,255,255,.65);
                font-size: .875rem; font-weight: 500; white-space: nowrap;
                position: relative;
            }
            .db-nav-item:hover { background: rgba(255,255,255,.07); color: white; }
            .db-nav-item.active {
                background: rgba(56,189,248,.15); color: #7dd3fc;
                border-right: 3px solid #38bdf8;
            }
            .db-nav-icon {
                width: 1.25rem; height: 1.25rem; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
            }

            .db-sidebar-footer {
                padding: 1rem;
                border-top: 1px solid rgba(255,255,255,.1);
            }
            .db-user-card {
                display: flex; align-items: center; gap: .75rem;
                padding: .6rem .75rem; border-radius: .6rem;
                background: rgba(255,255,255,.07); overflow: hidden;
            }
            .db-user-avatar {
                width: 2rem; height: 2rem; border-radius: 50%; flex-shrink: 0;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                display: flex; align-items: center; justify-content: center;
                font-size: .7rem; font-weight: 700; color: white;
            }
            .db-user-info { overflow: hidden; flex: 1; min-width: 0; }
            .db-user-name { font-size: .82rem; font-weight: 600; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
            .db-user-role { font-size: .7rem; color: rgba(255,255,255,.45); white-space: nowrap; }
            .db-logout-btn {
                background: none; border: none; cursor: pointer;
                color: rgba(255,255,255,.4); flex-shrink: 0; padding: .2rem;
                transition: color .2s; display: flex;
            }
            .db-logout-btn:hover { color: #f87171; }

            /* ── Main ── */
            .db-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }

            /* Topbar */
            .db-topbar {
                background: white; border-bottom: 1px solid #e0f2fe;
                padding: 0 2rem; height: 64px;
                display: flex; align-items: center; justify-content: space-between;
                position: sticky; top: 0; z-index: 50;
            }
            .db-topbar-title {
                font-family: 'Lora', serif; font-size: 1.25rem; font-weight: 600; color: #0c4a6e;
            }
            .db-topbar-right { display: flex; align-items: center; gap: 1rem; }
            .db-topbar-btn {
                display: flex; align-items: center; gap: .5rem;
                padding: .45rem 1rem; border-radius: .6rem;
                background: linear-gradient(135deg, #38bdf8, #0284c7);
                border: none; color: white; font-size: .85rem; font-weight: 600;
                cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif;
                box-shadow: 0 2px 8px rgba(2,132,199,.25); transition: all .2s;
            }
            .db-topbar-btn:hover { box-shadow: 0 4px 14px rgba(2,132,199,.35); transform: translateY(-1px); }
            .db-notif-btn {
                position: relative; width: 2.25rem; height: 2.25rem; border-radius: .55rem;
                background: #f0f7ff; border: 1.5px solid #e0f2fe; cursor: pointer;
                display: flex; align-items: center; justify-content: center; color: #64748b;
                transition: all .2s;
            }
            .db-notif-btn:hover { border-color: #bae6fd; color: #0284c7; }
            .db-notif-dot {
                position: absolute; top: .25rem; right: .25rem;
                width: .5rem; height: .5rem; border-radius: 50%;
                background: #ef4444; border: 1.5px solid white;
            }

            /* Content */
            .db-content { padding: 2rem; flex: 1; }

            /* Welcome banner */
            .db-welcome {
                background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%);
                border-radius: 1.25rem; padding: 2rem 2.5rem;
                display: flex; justify-content: space-between; align-items: center;
                margin-bottom: 2rem; position: relative; overflow: hidden;
            }
            .db-welcome-pattern {
                position: absolute; inset: 0;
                background-image: radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px);
                background-size: 24px 24px;
            }
            .db-welcome-text { position: relative; z-index: 1; }
            .db-welcome-greeting {
                font-size: .85rem; color: rgba(255,255,255,.75); margin-bottom: .35rem;
                text-transform: uppercase; letter-spacing: .08em; font-weight: 500;
            }
            .db-welcome-name {
                font-family: 'Lora', serif; font-size: 1.75rem; font-weight: 600; color: white; margin-bottom: .5rem;
            }
            .db-welcome-sub { font-size: .875rem; color: rgba(255,255,255,.75); font-weight: 300; }
            .db-welcome-action {
                position: relative; z-index: 1;
                padding: .65rem 1.5rem; background: rgba(255,255,255,.2);
                border: 1.5px solid rgba(255,255,255,.35); border-radius: .75rem;
                color: white; font-size: .875rem; font-weight: 600; cursor: pointer;
                font-family: 'Plus Jakarta Sans', sans-serif; transition: all .2s;
                backdrop-filter: blur(4px); white-space: nowrap;
            }
            .db-welcome-action:hover { background: rgba(255,255,255,.3); }

            /* Stats grid */
            .db-stats {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem;
                margin-bottom: 2rem;
            }
            .db-stat-card {
                background: white; border-radius: 1rem; padding: 1.5rem;
                border: 1px solid #f1f5f9; transition: all .25s;
                animation: fadeUp .4s ease both;
            }
            .db-stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.06); }
            @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
            .db-stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
            .db-stat-icon {
                width: 2.5rem; height: 2.5rem; border-radius: .65rem;
                display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
            }
            .db-stat-value {
                font-family: 'Lora', serif; font-size: 1.75rem; font-weight: 600; color: #0c4a6e; margin-bottom: .2rem;
            }
            .db-stat-label { font-size: .82rem; color: #94a3b8; font-weight: 400; margin-bottom: .5rem; }
            .db-stat-delta { font-size: .75rem; color: #10b981; font-weight: 500; }

            /* Bottom grid */
            .db-bottom { display: grid; grid-template-columns: 2fr 1fr; gap: 1.5rem; }
            @media (max-width: 1024px) { .db-bottom { grid-template-columns: 1fr; } }

            /* Table */
            .db-card {
                background: white; border-radius: 1rem; border: 1px solid #f1f5f9; overflow: hidden;
            }
            .db-card-header {
                padding: 1.25rem 1.5rem; border-bottom: 1px solid #f8fafc;
                display: flex; align-items: center; justify-content: space-between;
            }
            .db-card-title {
                font-family: 'Lora', serif; font-size: 1rem; font-weight: 600; color: #0c4a6e;
            }
            .db-card-action {
                font-size: .78rem; color: #0284c7; font-weight: 600; cursor: pointer; text-decoration: none;
            }
            .db-table { width: 100%; border-collapse: collapse; }
            .db-table th {
                text-align: left; padding: .75rem 1.5rem; font-size: .72rem;
                text-transform: uppercase; letter-spacing: .07em; color: #94a3b8; font-weight: 600;
                background: #f8fafc; border-bottom: 1px solid #f1f5f9;
            }
            .db-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #f8fafc; font-size: .875rem; vertical-align: middle; }
            .db-table tr:last-child td { border-bottom: none; }
            .db-table tr:hover td { background: #f8faff; }
            .db-post-title-cell { font-weight: 500; color: #1e293b; max-width: 260px; }
            .db-post-title-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
            .db-status-badge {
                display: inline-flex; align-items: center; gap: .3rem;
                padding: .2rem .65rem; border-radius: 1rem; font-size: .72rem; font-weight: 600;
            }
            .db-status-dot { width: 5px; height: 5px; border-radius: 50%; }
            .db-table-actions { display: flex; gap: .5rem; }
            .db-action-btn {
                width: 1.75rem; height: 1.75rem; border-radius: .4rem; border: none; cursor: pointer;
                display: flex; align-items: center; justify-content: center; font-size: .75rem;
                transition: all .15s;
            }
            .db-action-edit { background: #e0f2fe; color: #0284c7; }
            .db-action-edit:hover { background: #bae6fd; }
            .db-action-del { background: #fee2e2; color: #dc2626; }
            .db-action-del:hover { background: #fecaca; }

            /* Comments list */
            .db-comments { padding: .5rem 0; }
            .db-comment-item {
                padding: 1rem 1.5rem; border-bottom: 1px solid #f8fafc; transition: background .15s;
            }
            .db-comment-item:last-child { border-bottom: none; }
            .db-comment-item:hover { background: #f8faff; }
            .db-comment-header { display: flex; align-items: center; gap: .5rem; margin-bottom: .4rem; }
            .db-comment-avatar {
                width: 1.75rem; height: 1.75rem; border-radius: 50%;
                background: linear-gradient(135deg, #bae6fd, #0284c7);
                display: flex; align-items: center; justify-content: center;
                font-size: .6rem; font-weight: 700; color: #0c4a6e; flex-shrink: 0;
            }
            .db-comment-author { font-size: .82rem; font-weight: 600; color: #1e293b; }
            .db-comment-time { font-size: .75rem; color: #94a3b8; margin-left: auto; }
            .db-comment-text { font-size: .82rem; color: #64748b; line-height: 1.55; margin-bottom: .3rem; }
            .db-comment-post { font-size: .72rem; color: #0284c7; font-weight: 500; }

            /* Responsive */
            @media (max-width: 768px) {
                .db-sidebar { display: none; }
                .db-content { padding: 1rem; }
                .db-welcome { padding: 1.5rem; }
                .db-welcome-action { display: none; }
                .db-stats { grid-template-columns: 1fr 1fr; }
            }
        `}</style>
        <div>
            <div className="db-root">
                {/* ── Sidebar ── */}
                <AppSideBar/>

                {/* ── Main content ── */}
                <main className="db-main">
                    {/* Topbar */}
                    <AppTopBar/>

                    {/* Dashboard Content */}
                    <div className="db-content">
                        {children}
                    </div>
                </main>
            </div>
        </div>
        </>
    )
}

export default AdminLayout

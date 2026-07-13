import React from 'react'
import AdminLayout from '../layouts/AdminLayout'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks';
import { LayoutGrid, MessageCircleMore, Newspaper, Pencil, Plus, Trash, UsersRound } from 'lucide-react';
import { myroutes } from '../routes/routes';


const RECENT_POSTS = [
    { id: 1, title: "L'IA va-t-elle remplacer les développeurs ?", status: "publié", views: 1240, comments: 18, date: "24 mars 2026" },
    { id: 2, title: "Maîtriser Laravel 11 : les nouveautés", status: "publié", views: 890, comments: 9, date: "20 mars 2026" },
    { id: 3, title: "React 19 : ce que chaque dev doit savoir", status: "brouillon", views: 0, comments: 0, date: "18 mars 2026" },
    { id: 4, title: "Spring Boot et l'architecture hexagonale", status: "en révision", views: 0, comments: 2, date: "16 mars 2026" },
    { id: 5, title: "PostgreSQL vs MySQL en 2026", status: "publié", views: 562, comments: 5, date: "14 mars 2026" },
];

const RECENT_COMMENTS = [
    { id: 1, author: "Kouassi Jean", content: "Super article, très bien expliqué !", post: "Maîtriser Laravel 11", time: "Il y a 2h", avatar: "KJ" },
    { id: 2, author: "Marie Dupont", content: "Est-ce que tu peux faire un article sur Inertia ?", post: "L'IA va-t-elle...", time: "Il y a 5h", avatar: "MD" },
    { id: 3, author: "Ali Hassan", content: "J'ai eu une erreur au niveau de la migration...", post: "Spring Boot hexagonal", time: "Hier", avatar: "AH" },
];

const STATUS_CONFIG = {
    "publié":     { bg: "#d1fae5", color: "#059669", label: "Publié" },
    "brouillon":  { bg: "#f1f5f9", color: "#64748b", label: "Brouillon" },
    "en révision":{ bg: "#fef3c7", color: "#d97706", label: "En révision" },
};


const STATS = [
    { label: "Articles publiés", value: "48", delta: "+3 ce mois", icon: <Newspaper />, color: "#0ea5e9", bg: "#e0f2fe" },
    { label: "Lecteurs / mois", value: "12 480", delta: "+18% vs mois dernier", icon: <UsersRound />, color: "#10b981", bg: "#d1fae5" },
    { label: "Commentaires", value: "234", delta: "+12 cette semaine", icon: <MessageCircleMore />, color: "#6366f1", bg: "#ede9fe" },
  { label: "Catégories", value: "8", delta: "1 nouvelle", icon: <LayoutGrid />, color: "#f59e0b", bg: "#fef3c7" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
      <AdminLayout>
        {/* Welcome */}
        <div className="db-welcome">
          <div className="db-welcome-pattern" />
          <div className="db-welcome-text">
            <div className="db-welcome-greeting">Bonjour 👋</div>
            <div className="db-welcome-name">{user?.name || "Administrateur"}</div>
            <div className="db-welcome-sub">Voici un aperçu de votre blog aujourd'hui — 26 mars 2026</div>
          </div>
          <Link className="db-welcome-action" to={myroutes.posts}>
            <Plus /> Rédiger un article
          </Link>
        </div>


        {/* Stats */}
        <div className="db-stats">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="db-stat-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="db-stat-header">
                <div className="db-stat-icon" style={{ background: stat.bg }}>
                  {stat.icon}
                </div>
                <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: ".85rem", color: "#e2e8f0" }}>
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>
                </svg>
              </div>
              <div className="db-stat-value">{stat.value}</div>
              <div className="db-stat-label">{stat.label}</div>
              <div className="db-stat-delta">↑ {stat.delta}</div>
            </div>
          ))}
        </div>

        {/* Bottom grid */}
            <div className="db-bottom">

              {/* Articles récents */}
              <div className="db-card">
                <div className="db-card-header">
                  <span className="db-card-title">Articles récents</span>
                  <Link className="db-card-action">Voir tout →</Link>
                </div>
                <table className="db-table">
                  <thead>
                    <tr>
                      <th>Titre</th>
                      <th>Statut</th>
                      <th>Vues</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {RECENT_POSTS.map((post) => {
                      const s = STATUS_CONFIG[post.status];
                      return (
                        <tr key={post.id}>
                          <td className="db-post-title-cell">
                            <span className="db-post-title-text" title={post.title}>{post.title}</span>
                          </td>
                          <td>
                            <span className="db-status-badge" style={{ background: s.bg, color: s.color }}>
                              <span className="db-status-dot" style={{ background: s.color }} />
                              {s.label}
                            </span>
                          </td>
                          <td style={{ color: "#64748b" }}>{post.views > 0 ? post.views.toLocaleString() : "—"}</td>
                          <td style={{ color: "#94a3b8", fontSize: ".78rem" }}>{post.date}</td>
                          <td>
                            <div className="db-table-actions">
                              <button className="db-action-btn db-action-edit rounded-lg flex items-center justify-centert" title="Modifier"><Pencil className="w-5 h-5" /></button>
                              <button className="db-action-btn db-action-del rounded-lg flex items-center justify-center" title="Supprimer"><Trash className="w-5 h-5"/></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Commentaires récents */}
              <div className="db-card">
                <div className="db-card-header">
                  <span className="db-card-title">Commentaires récents</span>
                  <Link className="db-card-action">Voir tout →</Link>
                </div>
                <div className="db-comments">
                  {RECENT_COMMENTS.map((c) => (
                    <div key={c.id} className="db-comment-item">
                      <div className="db-comment-header">
                        <div className="db-comment-avatar">{c.avatar}</div>
                        <span className="db-comment-author">{c.author}</span>
                        <span className="db-comment-time">{c.time}</span>
                      </div>
                      <p className="db-comment-text">"{c.content}"</p>
                      <div className="db-comment-post">Sur : {c.post}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
      </AdminLayout>
  )
}

export default DashboardPage
import React, { useState } from 'react'
import HomeLayout from '../layouts/HomeLayout';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const navigate = useNavigate();

  const POSTS = [
    { id: 2, title: "Maîtriser Laravel 11 : les nouveautés qui changent tout", excerpt: "Les fonctionnalités majeures de Laravel 11 et comment les utiliser efficacement dans vos projets.", category: "Backend", author: { name: "Admin Blog", avatar: "AB" }, date: "20 mars 2026", readTime: "6 min", color: "#0ea5e9" },
    { id: 3, title: "React 19 : ce que chaque dev doit savoir", excerpt: "Le Server Components, Actions et toutes les nouveautés de React 19 expliquées simplement.", category: "Frontend", author: { name: "Admin Blog", avatar: "AB" }, date: "17 mars 2026", readTime: "5 min", color: "#6366f1" },
    { id: 4, title: "Construire une API REST propre avec Spring Boot", excerpt: "Architecture, bonnes pratiques et sécurité pour une API Spring Boot prête pour la production.", category: "Backend", author: { name: "Admin Blog", avatar: "AB" }, date: "14 mars 2026", readTime: "10 min", color: "#10b981" },
    { id: 5, title: "Tailwind CSS v4 : tout ce qui change", excerpt: "La migration vers Tailwind v4, les nouvelles utilitaires et ce que ça implique pour vos projets.", category: "Frontend", author: { name: "Admin Blog", avatar: "AB" }, date: "11 mars 2026", readTime: "4 min", color: "#f59e0b" },
    { id: 6, title: "PostgreSQL vs MySQL en 2026 : lequel choisir ?", excerpt: "Comparaison détaillée des deux SGBD les plus populaires pour vous aider à faire le bon choix.", category: "Base de données", author: { name: "Admin Blog", avatar: "AB" }, date: "8 mars 2026", readTime: "7 min", color: "#ef4444" },
    { id: 7, title: "Docker & DevOps : les bases indispensables en 2026", excerpt: "Conteneuriser ses apps, orchestrer avec Docker Compose et préparer le terrain pour Kubernetes.", category: "DevOps", author: { name: "Admin Blog", avatar: "AB" }, date: "5 mars 2026", readTime: "9 min", color: "#8b5cf6" },
  ];

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === "Tous" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
  
  return (
    <HomeLayout>
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
              <div className="hp-hero-stat-num">48</div>
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
          <button className="hp-hero-btn" onClick={() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })}>
            Lire les articles →
          </button>
        </div>
      </div>

      {/* Search */}
      <div id="articles" className="hp-search-wrap">
        <svg className="hp-search-icon" viewBox="0 0 20 20" fill="currentColor" style={{ width: ".9rem" }}>
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
        </svg>
        <input className="hp-search" type="text" placeholder="Rechercher un article…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      </div>

      {/* Section titre */}
      <div className="hp-section-header">
        <span className="hp-section-title">
          {activeCategory === "Tous" ? "Tous les articles" : activeCategory}
        </span>
        <span className="hp-section-count">{filtered.length} article{filtered.length > 1 ? "s" : ""}</span>
      </div>

      {/* Liste d'articles style Medium */}
      <div className="hp-post-list">
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ width: "2rem", margin: "0 auto .75rem", display: "block", opacity: .4 }} strokeWidth="1.5">
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Aucun article trouvé.
          </div>
        )}
        {filtered.map((post, i) => (
          <div
            key={post.id}
            className="hp-post-card"
            style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => navigate(`/articles/${post.id}`)}
          >
            <div className="hp-post-card-accent" style={{ background: post.color }} />
            <div className="hp-post-card-body">
              <div className="hp-post-card-top">
                <span className="hp-post-card-cat" style={{ color: post.color }}>{post.category}</span>
                <span className="hp-post-card-dot">·</span>
                <span className="hp-post-card-date">{post.date}</span>
              </div>
              <h3 className="hp-post-card-title">{post.title}</h3>
              <p className="hp-post-card-excerpt">{post.excerpt}</p>
              <div className="hp-post-card-footer">
                <div className="hp-post-card-author">
                  <div className="hp-post-avatar">{post.author.avatar}</div>
                  <div>
                    <div className="hp-post-author-name">{post.author.name}</div>
                    <div className="hp-post-meta">{post.readTime} de lecture</div>
                  </div>
                </div>
                <a className="hp-read-link" onClick={(e) => e.stopPropagation()}>
                  Lire <span>→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </HomeLayout>
  )
}

export default HomePage

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import HomeLayout from "../../layouts/HomeLayout";
import publicPostService from "../../services/publicPostService";
import usePaginatedList from "../../hooks/usePaginatedList";
import Pagination from "../../components/shared/Pagination";
import Spinner from "../../components/ui/Spinner";
import { myroutes } from "../../routes/routes";

const ArticlesPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");

    const list = usePaginatedList(
        (p) => publicPostService.getAll(p, { search }),
        [search],
    );

    return (
    <HomeLayout
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
    >
      {/* Titre */}
    <div style={{ marginBottom: "1.5rem" }}>
        <h1
        style={{
            fontFamily: "'Lora', serif",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#0c4a6e",
            marginBottom: ".35rem",
        }}
        >
        Tous les articles
        </h1>
        <p
        style={{
            fontSize: ".85rem",
            color: "#94a3b8",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        >
            {list.meta?.total ?? 0} article
            {(list.meta?.total ?? 0) > 1 ? "s" : ""} publiés
        </p>
    </div>

      {/* Barre de recherche */}
    <div className="hp-search-wrap">
        <Search size={14} className="hp-search-icon" color="#94a3b8" />
        <input
            className="hp-search"
            type="text"
            placeholder="Rechercher un article…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    </div>

      {/* Liste */}
        {list.loading ? (
        <div
            style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
        >
            <Spinner size="md" />
        </div>
        ) : list.items.length === 0 ? (
        <div
            style={{
            textAlign: "center",
            padding: "3rem",
            color: "#94a3b8",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
        >
            Aucun article trouvé.
        </div>
        ) : (
        <div className="hp-post-list">
            {list.items.map((post, i) => (
            <PostCard
                key={post.ref}
                post={post}
                index={i}
                onClick={() => navigate(myroutes.article(post.ref))}
            />
            ))}
        </div>
        )}

        <Pagination
        meta={list.meta}
        page={list.page}
        onPageChange={list.setPage}
        />
    </HomeLayout>
    );
};

/// ─ Carte article
export const PostCard = ({ post, index, onClick }) => {
    const color = post.categories?.[0]
    ? (CATEGORY_COLORS[post.categories[0].name] ?? "#0ea5e9")
    : "#0ea5e9";

    return (
    <div
        className="hp-post-card"
        style={{ animationDelay: `${index * 0.06}s` }}
        onClick={onClick}
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
                ? new Date(post.published_at).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                })
                : "—"}
            </span>
        </div>

        <h3 className="hp-post-card-title">{post.title}</h3>

        {post.excerpt && <p className="hp-post-card-excerpt">{post.excerpt}</p>}

        <div className="hp-post-card-footer">
            <div className="hp-post-card-author">
            <div className="hp-post-avatar">
                {post.author?.name?.slice(0, 2).toUpperCase() ?? "MB"}
            </div>
            <div>
                <div className="hp-post-author-name">
                {post.author?.name ?? "MonBlog"}
                </div>
                <div className="hp-post-meta">{post.views_count ?? 0} vues</div>
            </div>
            </div>
            <span className="hp-read-link">
            Lire <span>→</span>
            </span>
        </div>
        </div>
    </div>
    );
};

// Couleurs par catégorie
const CATEGORY_COLORS = {
    Backend: "#0ea5e9",
    Frontend: "#6366f1",
    "Base de données": "#ef4444",
    DevOps: "#8b5cf6",
    Technologie: "#f59e0b",
};

export default ArticlesPage;

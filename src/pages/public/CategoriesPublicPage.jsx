import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import HomeLayout from "../../layouts/HomeLayout";
import publicCategoryService from "../../services/publicCategoryService";
import publicPostService from "../../services/publicPostService";
import Spinner from "../../components/ui/Spinner";
import { PostCard } from "./ArticlesPage";
import { myroutes } from "../../routes/routes";

const CategoriesPublicPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Tous");

  // Charger les catégories
    useEffect(() => {
        publicCategoryService
            .getAll()
            .then((r) => setCategories(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoadingCats(false));
    }, []);

  // Charger les posts de la catégorie sélectionnée
    useEffect(() => {
        if (!selected) {
            setPosts([]);
            return;
        }
        setLoadingPosts(true);
        publicPostService
            .getByCategory(selected.ref)
            .then((r) => setPosts(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoadingPosts(false));
    }, [selected]);

    return (
        <HomeLayout
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
        >
            <h1
            style={{
                fontFamily: "'Lora', serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#0c4a6e",
                marginBottom: "1.5rem",
            }}
            >
            Catégories
            </h1>

            {loadingCats ? (
            <div
                style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
            >
                <Spinner />
            </div>
            ) : (
            <>
                {/* Grille des catégories */}
                <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "1rem",
                    marginBottom: "2rem",
                }}
                >
                {categories.map((cat) => (
                    <div
                    key={cat.ref}
                    onClick={() =>
                        setSelected(cat.ref === selected?.ref ? null : cat)
                    }
                    style={{
                        padding: "1.25rem",
                        background: selected?.ref === cat.ref ? "#e0f2fe" : "white",
                        border: `1.5px solid ${selected?.ref === cat.ref ? "#38bdf8" : "#f1f5f9"}`,
                        borderRadius: "1rem",
                        cursor: "pointer",
                        transition: "all .2s",
                        textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                        if (selected?.ref !== cat.ref) {
                        e.currentTarget.style.borderColor = "#bae6fd";
                        e.currentTarget.style.background = "#f0f9ff";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selected?.ref !== cat.ref) {
                        e.currentTarget.style.borderColor = "#f1f5f9";
                        e.currentTarget.style.background = "white";
                        }
                    }}
                    >
                    <div
                        style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: ".65rem",
                        background:
                            selected?.ref === cat.ref ? "#bae6fd" : "#f0f9ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto .75rem",
                        }}
                    >
                        <LayoutGrid size={16} color="#0284c7" />
                    </div>
                    <p
                        style={{
                        fontSize: ".875rem",
                        fontWeight: 600,
                        color: "#0c4a6e",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        {cat.name}
                    </p>
                    <p
                        style={{
                        fontSize: ".72rem",
                        color: "#94a3b8",
                        marginTop: ".2rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        {cat.slug}
                    </p>
                    </div>
                ))}
                </div>

                {/* Posts de la catégorie sélectionnée */}
                {selected && (
                <>
                    <h2
                    style={{
                        fontFamily: "'Lora', serif",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#0c4a6e",
                        marginBottom: "1rem",
                    }}
                    >
                    Articles — {selected.name}
                    </h2>

                    {loadingPosts ? (
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "2rem",
                        }}
                    >
                        <Spinner />
                    </div>
                    ) : posts.length === 0 ? (
                    <p
                        style={{
                        color: "#94a3b8",
                        fontSize: ".85rem",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        Aucun article dans cette catégorie.
                    </p>
                    ) : (
                    <div className="hp-post-list">
                        {posts.map((post, i) => (
                        <PostCard
                            key={post.ref}
                            post={post}
                            index={i}
                            onClick={() => navigate(myroutes.article(post.ref))}
                        />
                        ))}
                    </div>
                    )}
                </>
                )}
            </>
            )}
        </HomeLayout>
    );
};

export default CategoriesPublicPage;

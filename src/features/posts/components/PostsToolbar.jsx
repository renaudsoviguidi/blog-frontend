import React from "react";
import { Search, Plus } from "lucide-react";
import { CATEGORIES } from "../constants";

const PostsToolbar = ({
    search, setSearch,
    statusFilter, setStatusFilter,
    categoryFilter, setCategoryFilter,
    setCurrentPage,
    onNew,
}) => {
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    const handleStatus = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleCategory = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="pl-toolbar">
            {/* Recherche */}
            <div className="pl-search">
                <Search size={15} className="pl-search-icon" />
                <input
                    placeholder="Rechercher un article ou un auteur…"
                    value={search}
                    onChange={handleSearch}
                />
            </div>

            {/* Filtre statut */}
            <select className="pl-filter-select" value={statusFilter} onChange={handleStatus}>
                <option value="all">Tous les statuts</option>
                <option value="published">Publié</option>
                <option value="draft">Brouillon</option>
                <option value="review">En révision</option>
            </select>

            {/* Filtre catégorie */}
            <select className="pl-filter-select" value={categoryFilter} onChange={handleCategory}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Bouton nouveau */}
            <button className="pl-new-btn" onClick={onNew}>
                <Plus size={15} strokeWidth={2.5} /> Nouvel article
            </button>
        </div>
    );
};

export default PostsToolbar;
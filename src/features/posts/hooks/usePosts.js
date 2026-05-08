import { useState, useMemo } from "react";
import { ITEMS_PER_PAGE } from "../constants";

export const usePosts = (initialPosts) => {
    const [search, setSearch]               = useState("");
    const [statusFilter, setStatusFilter]   = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("Toutes");
    const [currentPage, setCurrentPage]     = useState(1);
    const [sortField, setSortField]         = useState("date");
    const [sortDir, setSortDir]             = useState("desc");

    const filtered = useMemo(() => {
        return initialPosts
            .filter(p => {
                const q = search.toLowerCase();
                if (q && !p.title.toLowerCase().includes(q)
                    && !p.author.toLowerCase().includes(q)) return false;
                if (statusFilter !== "all" && p.status !== statusFilter) return false;
                if (categoryFilter !== "Toutes" && p.category !== categoryFilter) return false;
                return true;
            })
            .sort((a, b) => {
                let av = sortField === "views" ? +a[sortField] : a[sortField];
                let bv = sortField === "views" ? +b[sortField] : b[sortField];
                return av < bv ? (sortDir === "asc" ? -1 : 1)
                    : av > bv ? (sortDir === "asc" ?  1 : -1) : 0;
            });
    }, [initialPosts, search, statusFilter, categoryFilter, sortField, sortDir]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated  = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const toggleSort = (field) => {
        if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortField(field); setSortDir("asc"); }
    };

    const stats = useMemo(() => ({
        total:     initialPosts.length,
        published: initialPosts.filter(p => p.status === "published").length,
        draft:     initialPosts.filter(p => p.status === "draft").length,
        views:     initialPosts.reduce((s, p) => s + p.views, 0),
    }), [initialPosts]);

    return {
        // état des filtres
        search, setSearch,
        statusFilter, setStatusFilter,
        categoryFilter, setCategoryFilter,
        currentPage, setCurrentPage,
        // données
        filtered, paginated, totalPages, stats,
        // actions
        toggleSort, sortField, sortDir,
    };
};
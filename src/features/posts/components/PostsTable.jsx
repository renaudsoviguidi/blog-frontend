import React from "react";
import {
    Eye, Pencil, Trash2,
    ArrowUpDown, ChevronLeft, ChevronRight
} from "lucide-react";
import { STATUS_CONFIG, ITEMS_PER_PAGE } from "../constants";

const PostsTable = ({
    paginated,
    filtered,
    totalPages,
    currentPage, setCurrentPage,
    toggleSort,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="pl-card">
            <div className="pl-table-wrap">
                <table className="pl-table">
                    <thead>
                        <tr>
                            <th>
                                <span className="pl-th-sort" onClick={() => toggleSort("title")}>
                                    Article <ArrowUpDown size={11} />
                                </span>
                            </th>
                            <th>Catégorie</th>
                            <th>Auteur</th>
                            <th>Statut</th>
                            <th>
                                <span className="pl-th-sort" onClick={() => toggleSort("views")}>
                                    Vues <ArrowUpDown size={11} />
                                </span>
                            </th>
                            <th>
                                <span className="pl-th-sort" onClick={() => toggleSort("date")}>
                                    Date <ArrowUpDown size={11} />
                                </span>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={7}>
                                    <div className="pl-empty">
                                        <div className="pl-empty-icon">📭</div>
                                        <div className="pl-empty-title">Aucun article trouvé</div>
                                        <div>Modifiez vos filtres ou créez un nouvel article.</div>
                                    </div>
                                </td>
                            </tr>
                        ) : paginated.map(post => {
                            const s = STATUS_CONFIG[post.status];
                            return (
                                <tr key={post.id}>
                                    <td>
                                        <div className="pl-post-title">
                                            <span title={post.title}>{post.title}</span>
                                            <div className="pl-post-meta">ID #{post.id}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="pl-cat-badge">{post.category}</span>
                                    </td>
                                    <td style={{ color: "#475569", fontSize: ".82rem" }}>
                                        {post.author}
                                    </td>
                                    <td>
                                        <span
                                            className="pl-status-badge"
                                            style={{ background: s.bg, color: s.color }}
                                        >
                                            <span className="pl-status-dot" style={{ background: s.dot }} />
                                            {s.label}
                                        </span>
                                    </td>
                                    <td className="pl-views">
                                        {post.views.toLocaleString("fr-FR")}
                                    </td>
                                    <td style={{ color: "#475569", fontSize: ".82rem" }}>
                                        {new Date(post.date).toLocaleDateString("fr-FR", {
                                            day: "2-digit", month: "short", year: "numeric"
                                        })}
                                    </td>
                                    <td>
                                        <div className="pl-actions">
                                            <button className="pl-action-btn pl-btn-view" title="Voir">
                                                <Eye size={13} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                className="pl-action-btn pl-btn-edit"
                                                title="Modifier"
                                                onClick={() => onEdit(post.id)}
                                            >
                                                <Pencil size={13} strokeWidth={2.5} />
                                            </button>
                                            <button
                                                className="pl-action-btn pl-btn-del"
                                                title="Supprimer"
                                                onClick={() => onDelete(post.id)}
                                            >
                                                <Trash2 size={13} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pl-pagination">
                    <span className="pl-pag-info">
                        {filtered.length} article{filtered.length > 1 ? "s" : ""} · page {currentPage}/{totalPages}
                    </span>
                    <div className="pl-pag-btns">
                        <button
                            className="pl-pag-btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => p - 1)}
                        >
                            <ChevronLeft size={13} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                className={`pl-pag-btn ${p === currentPage ? "active" : ""}`}
                                onClick={() => setCurrentPage(p)}
                            >
                                {p}
                            </button>
                        ))}

                        <button
                            className="pl-pag-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => p + 1)}
                        >
                            <ChevronRight size={13} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsTable;
import React, { useState } from "react";
import { myroutes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../features/auth/hooks";
import { File, LayoutDashboard, LayoutGrid, LogOut, Menu, MessageCircle, Newspaper, Pencil, Settings, Users } from "lucide-react";

/// - Menus
const NAV_ITEMS = [
    { icon: "▪", label: "Tableau de bord", id: "dashboard", active: true },
    { icon: "▪", label: "Articles", id: "posts" },
    { icon: "▪", label: "Commentaires", id: "comments" },
    { icon: "▪", label: "Catégories", id: "categories" },
    { icon: "▪", label: "Utilisateurs", id: "users" },
    { icon: "▪", label: "Paramètres", id: "settings" },
];

const AppSideBar = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeNav, setActiveNav] = useState("dashboard");
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    async function handleLogout() {
        await logout();
        navigate(myroutes.login);
    }

    const initials = user?.name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "AD";
return (
<div>
    {/* ── Sidebar ── */}
    <aside className={`db-sidebar ${sidebarOpen ? "" : "collapsed"}`}>
    <div className="db-sidebar-header">
        <div className="db-sidebar-logo">
        <div className="db-sidebar-logo-mark">
            <Pencil className="w-[0.9rem] h-[0.9rem] stroke-[2.5]" />
        </div>
        {sidebarOpen && (
            <span className="db-sidebar-logo-name">MonBlog</span>
        )}
        </div>
        <button
        className="db-collapse-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        >
        <Menu className="w-[0.85rem] h-[0.85rem] stroke-[2.5]" />
        </button>
    </div>

    <nav className="db-nav">
        {sidebarOpen && (
        <div className="db-nav-section">
            <div className="db-nav-section-label">Menu principal</div>
        </div>
        )}
        {NAV_ITEMS.map((item) => (
        <div
            key={item.id}
            className={`db-nav-item ${activeNav === item.id ? "active" : ""}`}
            onClick={() => setActiveNav(item.id)}
            title={!sidebarOpen ? item.label : undefined}
        >
            <div className="db-nav-icon">
            {item.id === "dashboard" && (
                <LayoutDashboard className="w-[1.1rem] h-[1.1rem]" />
            )}
            {item.id === "posts" && (
                <Newspaper className="w-[1.1rem] h-[1.1rem]" />
            )}
            {item.id === "comments" && (
                <MessageCircle className="w-[1.1rem] h-[1.1rem]" />
            )}
            {item.id === "categories" && (
                <LayoutGrid className="w-[1.1rem] h-[1.1rem]" />
            )}
            {item.id === "users" && (
                <Users className="w-[1.1rem] h-[1.1rem]" />
            )}
            {item.id === "settings" && (
                <Settings className="w-[1.1rem] h-[1.1rem] stroke-[2.5]" />
            )}
            </div>
            {sidebarOpen && <span>{item.label}</span>}
        </div>
        ))}
    </nav>

    <div className="db-sidebar-footer">
        <div className="db-user-card">
        <div className="db-user-avatar">{initials}</div>
        {sidebarOpen && (
            <div className="db-user-info">
            <div className="db-user-name">
                {user?.name || "Administrateur"}
            </div>
            <div className="db-user-role">
                {user?.roles?.[0] || "Admin"}
            </div>
            </div>
        )}
        {sidebarOpen && (
            <button
            className="db-logout-btn"
            onClick={handleLogout}
            title="Se déconnecter"
            >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            </button>
        )}
        </div>
    </div>
    </aside>
</div>
);
};

export default AppSideBar;

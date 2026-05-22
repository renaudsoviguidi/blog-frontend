import React from 'react'
import "../styles/admin.css"
import AppSideBar from './include/backend/AppSideBar';
import AppTopBar from './include/backend/AppTopBar';

const AdminLayout = ({ children }) => {
    
    return (
        <>
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

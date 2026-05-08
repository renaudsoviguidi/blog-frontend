import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppTopBar = () => {
    const navigate = useNavigate();
  return (
    <div>
      {/* Topbar */}
        <div className="db-topbar">
        <div className="db-topbar-title">Tableau de bord</div>
        <div className="db-topbar-right">
            <button className="db-notif-btn">
            <div className="db-notif-dot" />
            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: "1.1rem" }}>
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
            </svg>
            </button>
            <button className="db-topbar-btn" onClick={() => navigate()}>
            <svg viewBox="0 0 20 20" fill="currentColor" style={{ width: ".9rem" }}>
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
            </svg>
            Nouvel article
            </button>
        </div>
        </div>
    </div>
  )
}

export default AppTopBar

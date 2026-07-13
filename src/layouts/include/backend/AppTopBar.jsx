import React from 'react'
import { Link } from 'react-router-dom'
import { myroutes } from '../../../routes/routes';
import { Bell, Plus } from 'lucide-react';

const AppTopBar = () => {
  return (
    <div>
      {/* Topbar */}
        <div className="db-topbar">
        <div className="db-topbar-title">Tableau de bord</div>
        <div className="db-topbar-right">
            <button className="db-notif-btn">
            <div className="db-notif-dot" />
            <Bell style={{ width: "1.1rem" }}/>
            
            </button>
            <Link className="db-topbar-btn" to={myroutes.posts}>
            <Plus  style={{ width: ".9rem" }}/>
            Nouvel article
            </Link>
        </div>
        </div>
    </div>
  )
}

export default AppTopBar

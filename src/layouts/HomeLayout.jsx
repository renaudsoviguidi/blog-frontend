import React from 'react'
import '../styles/home.css'
import AppLeftSideBar from './include/frontend/AppLeftSideBar'
import AppFooter from './include/frontend/AppFooter'
import AppRightSideBarApp from './include/frontend/AppRightSideBarApp'

const HomeLayout = ({ children }) => {
    
    return (
        <>
        <div className="hp-root">
                {/* SIDEBAR GAUCHE */}
                <AppLeftSideBar />

                {/* CONTENU + SIDEBAR DROITE */}
                <main className="hp-main">
                    <div className="hp-center">
                        {children}
                        {/* Footer */}
                        <AppFooter />
                    </div>

                    {/* SIDEBAR DROITE */}
                    <AppRightSideBarApp />
                </main>
            </div>
        </>
    )
}

export default HomeLayout

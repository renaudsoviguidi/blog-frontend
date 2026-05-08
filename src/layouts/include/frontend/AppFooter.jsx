import React from 'react'

const AppFooter = () => {
    return (
        <footer className="hp-footer" style={{ marginTop: "3rem", borderRadius: "1rem", overflow: "hidden" }}>
            <div className="hp-footer-inner">
            <div>
                <div className="hp-footer-logo">MonBlog</div>
                <div style={{ fontSize: ".72rem", opacity: .5, marginTop: ".25rem" }}>Pour les développeurs passionnés.</div>
            </div>
            <div className="hp-footer-links">
                <a href="/a-propos">À propos</a>
                <a href="/contact">Contact</a>
                <a href="/confidentialite">Confidentialité</a>
            </div>
            <div className="hp-footer-copy">© 2026 MonBlog</div>
            </div>
        </footer>
    )
}

export default AppFooter

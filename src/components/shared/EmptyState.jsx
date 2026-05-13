import React from 'react';

const EmptyState = ({ icon: Icon, title, description }) => (
    <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '4rem 2rem', gap: '.75rem',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
        <div style={{
            width: '3.5rem', height: '3.5rem', borderRadius: '1rem',
            background: '#f0f7ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <Icon size={22} color="#7dd3fc" />
        </div>
        <p style={{ fontSize: '.95rem', fontWeight: 600, color: '#1e293b' }}>{title}</p>
        {description && (
            <p style={{ fontSize: '.82rem', color: '#94a3b8', textAlign: 'center', maxWidth: 300 }}>
                {description}
            </p>
        )}
    </div>
);

export default EmptyState;
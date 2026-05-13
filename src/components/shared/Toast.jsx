import React from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

const TOAST_CONFIG = {
    success: { border: '#10b981', icon: CheckCircle,   color: '#10b981', bg: '#f0fdf4' },
    error:   { border: '#ef4444', icon: XCircle,       color: '#ef4444', bg: '#fef2f2' },
    info:    { border: '#0284c7', icon: Info,           color: '#0284c7', bg: '#f0f7ff' },
    warning: { border: '#f59e0b', icon: AlertTriangle,  color: '#f59e0b', bg: '#fffbeb' },
};

const Toast = ({ toasts, removeToast }) => {
    if (!toasts.length) return null;

    return (
        <div style={{
            position: 'fixed', bottom: '1.5rem', right: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '.5rem',
            zIndex: 9999,
        }}>
            {toasts.map(t => {
                const config = TOAST_CONFIG[t.type] ?? TOAST_CONFIG.success;
                const Icon   = config.icon;

                return (
                    <div key={t.id} style={{
                        display: 'flex', alignItems: 'center', gap: '.65rem',
                        padding: '.75rem 1.1rem',
                        background: config.bg,
                        border: `1px solid ${config.border}30`,
                        borderLeft: `4px solid ${config.border}`,
                        borderRadius: '.75rem',
                        boxShadow: '0 8px 24px rgba(0,0,0,.09)',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '.85rem', fontWeight: 500, color: '#1e293b',
                        minWidth: 280, maxWidth: 380,
                        animation: 'toastIn .2s ease',
                    }}>
                        {/* Icône */}
                        <Icon size={16} color={config.color} style={{ flexShrink: 0 }} />

                        {/* Message */}
                        <span style={{ flex: 1 }}>{t.message}</span>

                        {/* Bouton fermer — optionnel si removeToast fourni */}
                        {removeToast && (
                            <button
                                onClick={() => removeToast(t.id)}
                                style={{
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', padding: '.1rem',
                                    color: '#94a3b8', display: 'flex',
                                    alignItems: 'center', flexShrink: 0,
                                    transition: 'color .15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#475569'}
                                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>
                );
            })}
            <style>{`
                @keyframes toastIn {
                    from { opacity: 0; transform: translateX(12px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default Toast;
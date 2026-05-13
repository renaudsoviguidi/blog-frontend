import React from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';

const Modal = ({ open, title, onClose, onSubmit, submitting = false, size = 'md', children }) => {
    if (!open) return null;

    const maxWidths = { sm: 420, md: 580, lg: 760, xl: 960 };

    return (
        <div
            onClick={e => e.target === e.currentTarget && onClose()}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(12,74,110,.45)',
                backdropFilter: 'blur(6px)',
                zIndex: 500,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div style={{
                background: 'white',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: maxWidths[size],
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 32px 64px rgba(0,0,0,.18)',
                animation: 'modalIn .22s ease',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.5rem 1.75rem 0',
                }}>
                    <h3 style={{
                        fontFamily: "'Lora', serif",
                        fontSize: '1.1rem', fontWeight: 600,
                        color: '#0c4a6e',
                    }}>{title}</h3>
                    <button onClick={onClose} style={{
                        background: '#f0f7ff', border: 'none', borderRadius: '.5rem',
                        width: '2rem', height: '2rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: '#64748b', transition: 'all .15s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.background = '#e0f2fe'}
                        onMouseLeave={e => e.currentTarget.style.background = '#f0f7ff'}
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem 1.75rem' }}>{children}</div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 1.75rem 1.5rem',
                    display: 'flex', gap: '.75rem', justifyContent: 'flex-end',
                    borderTop: '1px solid #f1f5f9',
                }}>
                    <Button variant="secondary" size="md" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" size="md" loading={submitting} onClick={onSubmit}>
                        Enregistrer
                    </Button>
                </div>
            </div>
            <style>{`@keyframes modalIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }`}</style>
        </div>
    );
};

export default Modal;
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';

const ConfirmModal = ({ open, title, description, onConfirm, onCancel, loading = false }) => {
    if (!open) return null;

    return (
        <div
            onClick={e => e.target === e.currentTarget && onCancel()}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(12,74,110,.45)',
                backdropFilter: 'blur(6px)',
                zIndex: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div style={{
                background: 'white',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: 420,
                padding: '2rem',
                boxShadow: '0 32px 64px rgba(0,0,0,.18)',
                animation: 'modalIn .22s ease',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                {/* Icône */}
                <div style={{
                    width: '3rem', height: '3rem',
                    background: '#fef2f2',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                }}>
                    <AlertTriangle size={20} color="#ef4444" />
                </div>

                {/* Titre */}
                <h3 style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '1.1rem', fontWeight: 600,
                    color: '#0c4a6e', marginBottom: '.5rem',
                }}>
                    {title}
                </h3>

                {/* Description */}
                <p style={{
                    fontSize: '.875rem', color: '#64748b',
                    lineHeight: 1.6, marginBottom: '1.75rem',
                }}>
                    {description}
                </p>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'flex-end' }}>
                    <Button variant="secondary" size="md" onClick={onCancel} disabled={loading}>
                        Annuler
                    </Button>
                    <Button variant="danger" size="md" loading={loading} onClick={onConfirm}>
                        Supprimer
                    </Button>
                </div>
            </div>
            <style>{`@keyframes modalIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }`}</style>
        </div>
    );
};

export default ConfirmModal;
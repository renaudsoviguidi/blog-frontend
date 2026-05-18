import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Button   from '../ui/Button';
import TextArea from '../ui/TextArea';

const RejectReasonModal = ({ open, postTitle, onConfirm, onCancel, loading = false }) => {
    const [reason, setReason] = useState('');
    const [error,  setError]  = useState('');

    if (!open) return null;

    const handleConfirm = () => {
        if (!reason.trim() || reason.trim().length < 10) {
            setError('Le motif doit contenir au moins 10 caractères.');
            return;
        }
        setError('');
        onConfirm(reason.trim());
    };

    const handleCancel = () => {
        setReason('');
        setError('');
        onCancel();
    };

    return (
        <div
            onClick={e => e.target === e.currentTarget && handleCancel()}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(12,74,110,.5)',
                backdropFilter: 'blur(6px)',
                zIndex: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
            }}
        >
            <div style={{
                background: 'white',
                borderRadius: '1.25rem',
                width: '100%',
                maxWidth: 460,
                padding: '2rem',
                boxShadow: '0 32px 64px rgba(0,0,0,.18)',
                animation: 'modalIn .22s ease',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                {/* Icône */}
                <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: '#fef3c7',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem',
                }}>
                    <AlertTriangle size={20} color="#d97706" />
                </div>

                {/* Titre */}
                <h3 style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: '#0c4a6e',
                    marginBottom: '.4rem',
                }}>
                    Motif du rejet
                </h3>
                <p style={{
                    fontSize: '.85rem',
                    color: '#64748b',
                    marginBottom: '1.25rem',
                    lineHeight: 1.6,
                }}>
                    Expliquez à <strong>l'auteur</strong> pourquoi
                    <em> "{postTitle}"</em> est rejeté.
                </p>

                {/* Textarea motif */}
                <TextArea
                    label="Motif du rejet"
                    required
                    value={reason}
                    onChange={e => { setReason(e.target.value); setError(''); }}
                    placeholder="ex : Le contenu ne respecte pas les guidelines, veuillez revoir la section introduction…"
                    rows={4}
                    error={error}
                />

                {/* Compteur caractères */}
                <p style={{
                    fontSize: '.72rem',
                    color: reason.length < 10 ? '#ef4444' : '#94a3b8',
                    marginTop: '.35rem',
                    textAlign: 'right',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    {reason.length} / 500 caractères
                    {reason.length < 10 && ` (minimum 10)`}
                </p>

                {/* Actions */}
                <div style={{
                    display: 'flex',
                    gap: '.75rem',
                    justifyContent: 'flex-end',
                    marginTop: '1.5rem',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid #f1f5f9',
                }}>
                    <Button variant="secondary" size="sm" onClick={handleCancel} disabled={loading}>
                        Annuler
                    </Button>
                    <Button
                        size="sm"
                        loading={loading}
                        onClick={handleConfirm}
                        style={{
                            background: '#d97706',
                            border: 'none',
                            color: 'white',
                        }}
                    >
                        Confirmer le rejet
                    </Button>
                </div>
            </div>
            <style>{`@keyframes modalIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }`}</style>
        </div>
    );
};

export default RejectReasonModal;
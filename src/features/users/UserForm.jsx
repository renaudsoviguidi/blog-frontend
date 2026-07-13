// Responsabilité unique : formulaire création/édition utilisateur
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff }  from 'lucide-react';
import Input from '../../components/ui/Input';
import roleService from '../../services/roleService';

const labelStyle = {
    display: 'block',
    fontSize: '.8rem',
    fontWeight: 600,
    color: '#475569',
    marginBottom: '.4rem',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const UserForm = ({ formData, onChange, editing = false }) => {
    const [roles, setRoles] = useState([]);
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        roleService.getAll()
            .then(r => setRoles(r.data?.data ?? []))
            .catch(() => {});
    }, []);

    const set = (key, value) => onChange({ ...formData, [key]: value });

    const toggleRole = (roleId) => {
        const current = formData.role_ids ?? [];
        const exists  = current.includes(roleId);
        set('role_ids', exists
            ? current.filter(id => id !== roleId)
            : [...current, roleId]
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

            {/* Nom */}
            <Input
                label="Nom complet"
                value={formData.name ?? ''}
                onChange={e => set('name', e.target.value)}
                placeholder="ex : Jean Dupont"
                required
            />

            {/* Email */}
            <Input
                label="Adresse email"
                type="email"
                value={formData.email ?? ''}
                onChange={e => set('email', e.target.value)}
                placeholder="jean@example.com"
                required
            />

            {/* Mot de passe */}
            <div style={{ position: 'relative' }}>
                <Input
                    label={editing ? 'Nouveau mot de passe (laisser vide pour ne pas changer)' : 'Mot de passe *'}
                    type={showPass ? 'text' : 'password'}
                    value={formData.password ?? ''}
                    onChange={e => set('password', e.target.value)}
                    placeholder="8 caractères minimum"
                />
                <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    style={{
                        position:   'absolute',
                        right:      '.85rem',
                        top:        '2.25rem',
                        background: 'none',
                        border:     'none',
                        cursor:     'pointer',
                        color:      '#94a3b8',
                        display:    'flex',
                    }}
                >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>

            {/* Confirmation mot de passe */}
            {(!editing || formData.password) && (
                <div style={{ position: 'relative' }}>
                    <Input
                        label="Confirmer le mot de passe"
                        type={showConfirm ? 'text' : 'password'}
                        value={formData.password_confirmation ?? ''}
                        onChange={e => set('password_confirmation', e.target.value)}
                        placeholder="Répéter le mot de passe"
                        error={
                            formData.password_confirmation &&
                            formData.password !== formData.password_confirmation
                                ? 'Les mots de passe ne correspondent pas'
                                : undefined
                        }
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(v => !v)}
                        style={{
                            position:   'absolute',
                            right:      '.85rem',
                            top:        '2.25rem',
                            background: 'none',
                            border:     'none',
                            cursor:     'pointer',
                            color:      '#94a3b8',
                            display:    'flex',
                        }}
                    >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            )}

            {/* Rôles */}
            <div>
                <label style={labelStyle}>Rôles</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
                    {roles.map(role => {
                        const selected = (formData.role_ids ?? []).includes(role.id);
                        return (
                            <button
                                key={role.id}
                                type="button"
                                onClick={() => toggleRole(role.id)}
                                style={{
                                    padding:      '.35rem .9rem',
                                    borderRadius: '1rem',
                                    border:       `1.5px solid ${selected ? '#0284c7' : '#e2e8f0'}`,
                                    background:   selected ? '#e0f2fe' : 'white',
                                    color:        selected ? '#0284c7' : '#64748b',
                                    fontSize:     '.8rem',
                                    fontWeight:   selected ? 600 : 400,
                                    cursor:       'pointer',
                                    fontFamily:   "'Plus Jakarta Sans', sans-serif",
                                    transition:   'all .15s',
                                }}
                            >
                                {selected && '✓ '}{role.libelle}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Statut actif */}
            <div style={{
                display:      'flex',
                alignItems:   'center',
                gap:          '.75rem',
                padding:      '.85rem 1rem',
                background:   '#f8fafc',
                borderRadius: '.75rem',
                border:       '1.5px solid #e2e8f0',
            }}>
                <button
                    type="button"
                    onClick={() => set('is_active', !formData.is_active)}
                    style={{
                        width:        '2.5rem',
                        height:       '1.35rem',
                        borderRadius: '1rem',
                        background:   formData.is_active ? '#0284c7' : '#e2e8f0',
                        border:       'none',
                        cursor:       'pointer',
                        position:     'relative',
                        transition:   'background .2s',
                        flexShrink:   0,
                    }}
                >
                    <span style={{
                        position:   'absolute',
                        top:        '.15rem',
                        left:       formData.is_active ? '1.25rem' : '.15rem',
                        width:      '1rem',
                        height:     '1rem',
                        borderRadius: '50%',
                        background: 'white',
                        transition: 'left .2s',
                        boxShadow:  '0 1px 3px rgba(0,0,0,.2)',
                    }} />
                </button>
                <div>
                    <p style={{ fontSize: '.85rem', fontWeight: 600, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Compte {formData.is_active ? 'actif' : 'inactif'}
                    </p>
                    <p style={{ fontSize: '.75rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {formData.is_active
                            ? "L'utilisateur peut se connecter"
                            : "L'utilisateur ne peut pas se connecter"
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserForm;
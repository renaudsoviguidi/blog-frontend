import React, { useState, useEffect } from 'react';
import Input        from '../../components/ui/Input';
import roleService  from '../../services/roleService';
import Spinner      from '../../components/ui/Spinner';

/// ─ Groupes de permissions
const GROUPS = {
    'Posts': 'post.',
    'Catégories': 'category.',
    'Tags': 'tag.',
    'Commentaires': 'comment.',
    'Utilisateurs': 'user.',
    'Rôles': 'role.',
    'Dashboard': 'dashboard.',
    'Paramètres': 'settings.',
};

const RoleForm = ({ formData, onChange }) => {
    const [habilitations, setHabilitations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        roleService.getHabilitations()
            .then(r => setHabilitations(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const set = (key, value) => onChange({ ...formData, [key]: value });

    const toggleHabilitation = (habId) => {
        const current = formData.habilitation_ids ?? [];
        set('habilitation_ids', current.includes(habId)
            ? current.filter(id => id !== habId)
            : [...current, habId]
        );
    };

    const toggleGroup = (prefix) => {
        const groupIds = habilitations
            .filter(h => h.slug.startsWith(prefix))
            .map(h => h.id);

        const current = formData.habilitation_ids ?? [];
        const allChecked = groupIds.every(id => current.includes(id));

        set('habilitation_ids', allChecked
            ? current.filter(id => !groupIds.includes(id)) // tout décocher
            : [...new Set([...current, ...groupIds])] // tout cocher
        );
    };

    /**
     * Vérifie si toutes les habilitations d'un groupe sont cochées.
     * Retourne true uniquement si les trois habilitations sont sélectionnées.
    */
    const isGroupChecked = (prefix) => {
        const groupIds = habilitations.filter(h => h.slug.startsWith(prefix)).map(h => h.id);
        return groupIds.length > 0 && groupIds.every(id => (formData.habilitation_ids ?? []).includes(id));
    };

    /**
     * Vérifie si une partie seulement des habilitations d'un groupe est cochée.
     * Cette fonction permet d'afficher la case parent en état "indeterminate"
    */
    const isGroupIndeterminate = (prefix) => {
        const groupIds  = habilitations.filter(h => h.slug.startsWith(prefix)).map(h => h.id);
        const checkedNb = groupIds.filter(id => (formData.habilitation_ids ?? []).includes(id)).length;
        return checkedNb > 0 && checkedNb < groupIds.length;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Nom du rôle */}
            <Input
                label="Nom du rôle"
                value={formData.libelle ?? ''}
                onChange={e => set('libelle', e.target.value.toUpperCase())}
                placeholder="ex : EDITOR"
                required
            />

            {/* Description du rôle */}
            <Input
                label="Description"
                value={formData.description ?? ''}
                onChange={e => set('description', e.target.value)}
                placeholder="ex : Accès complet à toutes les fonctionnalités"
            />

            {/* Permissions groupées */}
            <div>
                <label style={{
                    display: 'block',
                    fontSize: '.8rem',
                    fontWeight: 600,
                    color: '#475569',
                    marginBottom: '.75rem',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    Permissions
                </label>

                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                        <Spinner />
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                        {Object.entries(GROUPS).map(([groupLabel, prefix]) => {
                            const groupHabs = habilitations.filter(h => h.slug.startsWith(prefix));
                            if (groupHabs.length === 0) return null;

                            return (
                                <div key={prefix} style={{
                                    border: '1.5px solid #e2e8f0',
                                    borderRadius: '.75rem',
                                    overflow: 'hidden',
                                }}>
                                    {/* Header groupe */}
                                    <div
                                        onClick={() => toggleGroup(prefix)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '.75rem',
                                            padding: '.75rem 1rem',
                                            background: isGroupChecked(prefix) ? '#e0f2fe' : '#f8fafc',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #f1f5f9',
                                            transition: 'background .15s',
                                        }}
                                    >
                                        <CheckBox
                                            checked={isGroupChecked(prefix)}
                                            indeterminate={isGroupIndeterminate(prefix)}
                                        />
                                        <span style={{
                                            fontSize: '.85rem',
                                            fontWeight: 600,
                                            color: '#0c4a6e',
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        }}>
                                            {groupLabel}
                                        </span>
                                        <span style={{
                                            marginLeft: 'auto',
                                            fontSize: '.72rem',
                                            color: '#94a3b8',
                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        }}>
                                            {groupHabs.filter(h => (formData.habilitation_ids ?? []).includes(h.id)).length}/{groupHabs.length}
                                        </span>
                                    </div>

                                    {/* Permissions du groupe */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                        gap: '.5rem',
                                        padding: '.75rem 1rem',
                                    }}>
                                        {groupHabs.map(hab => {
                                            const checked = (formData.habilitation_ids ?? []).includes(hab.id);
                                            return (
                                                <label
                                                    key={hab.id}
                                                    onClick={() => toggleHabilitation(hab.id)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '.5rem',
                                                        cursor: 'pointer',
                                                        padding: '.4rem .5rem',
                                                        borderRadius: '.45rem',
                                                        background: checked ? '#f0f7ff' : 'transparent',
                                                        transition: 'background .15s',
                                                    }}
                                                >
                                                    <CheckBox checked={checked} />
                                                    <div>
                                                        <p style={{
                                                            fontSize: '.78rem',
                                                            fontWeight: checked ? 600 : 400,
                                                            color: checked ? '#0284c7' : '#475569',
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        }}>
                                                            {hab.libelle}
                                                        </p>
                                                        {hab.description && (
                                                            <p style={{
                                                                fontSize: '.68rem',
                                                                color: '#94a3b8',
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                            }}>
                                                                {hab.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

/// ─ Checkbox visuelle
const CheckBox = ({ checked, indeterminate = false }) => (
    <div style={{
        width: '1rem',
        height: '1rem',
        borderRadius: '.25rem',
        border: `2px solid ${checked || indeterminate ? '#0284c7' : '#cbd5e1'}`,
        background: checked ? '#0284c7' : indeterminate ? '#bae6fd' : 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all .15s',
    }}>
        {checked && (
            <svg viewBox="0 0 10 8" style={{ width: '.6rem' }}>
                <path d="M1 4l2.5 2.5L9 1" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
        )}
        {indeterminate && !checked && (
            <div style={{ width: '.45rem', height: '2px', background: '#0284c7', borderRadius: '1px' }} />
        )}
    </div>
);

export default RoleForm;
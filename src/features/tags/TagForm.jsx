import React from 'react';
import Input from '../../components/ui/Input';

const TagForm = ({ formData, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        <Input
            label="Nom du tag"
            value={formData.name ?? ''}
            onChange={e => onChange({ ...formData, name: e.target.value })}
            placeholder="ex : Laravel, React, DevOps…"
            required
        />

        {formData.name?.trim() && (
            <div style={{
                display: 'flex', alignItems: 'center', gap: '.5rem',
                padding: '.6rem 1rem',
                background: '#f0fdf4',
                borderRadius: '.55rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                    background: '#d1fae5', color: '#059669',
                    padding: '.25rem .75rem', borderRadius: '1rem',
                    fontWeight: 600, fontSize: '.8rem',
                }}>
                    # {formData.name}
                </span>
                <span style={{ color: '#94a3b8', fontSize: '.78rem' }}>— aperçu du tag</span>
            </div>
        )}
    </div>
);

export default TagForm;
import React from 'react';
import Input from '../../components/ui/Input';

const CategoryForm = ({ formData, onChange }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
                <Input
                    label="Nom de la catégorie"
                    value={formData.name ?? ''}
                    onChange={e => onChange({ ...formData, name: e.target.value })}
                    placeholder="ex : Développement Web"
                    required
                />
            </div>

            {formData.name?.trim() && (
                <div style={{
                    padding: '.6rem 1rem',
                    background: '#f0f7ff',
                    borderRadius: '.55rem',
                    fontSize: '.78rem',
                    color: '#0284c7',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    Slug généré : <strong>
                        {formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                    </strong>
                </div>
            )}
        </div>
    );
};

export default CategoryForm;
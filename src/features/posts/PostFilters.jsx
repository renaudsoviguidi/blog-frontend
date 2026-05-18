import React from 'react';
import { Search } from 'lucide-react';
import Input from '../../components/ui/Input';

const PostFilters = ({ search, status, onSearchChange, onStatusChange }) => (
    <div style={{
        display: 'flex', gap: '.75rem',
        marginBottom: '1.25rem', flexWrap: 'wrap',
    }}>
        {/* Recherche */}
        <div style={{ flex: 1, minWidth: 200 }}>
            <Input
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Rechercher un post…"
                icon={<Search size={16} />}
            />
        </div>

        {/* Filtre statut */}
        <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            style={{
                padding: '.6rem 1.1rem',
                border: '1.5px solid #e2e8f0',
                borderRadius: '.75rem',
                fontSize: '.875rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: '#475569',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
                minWidth: 160,
                transition: 'border-color .2s',
            }}
            onFocus={e => e.target.style.borderColor = '#38bdf8'}
            onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
        >
            <option value="">Tous les statuts</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
        </select>
    </div>
);

export default PostFilters;
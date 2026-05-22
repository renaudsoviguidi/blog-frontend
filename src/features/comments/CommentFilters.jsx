import React from 'react';
import Input from '../../components/ui/Input';
import { Search } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: '',         label: 'Tous les statuts' },
    { value: 'pending',  label: 'En attente'       },
    { value: 'approved', label: 'Approuvés'        },
    { value: 'rejected', label: 'Rejetés'          },
    { value: 'spam',     label: 'Spam'             },
    { value: 'hidden',   label: 'Masqués'          },
];

const CommentFilters = ({ search, status, onSearchChange, onStatusChange }) => (
    <div style={{ display: 'flex', gap: '.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
            <Input
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Rechercher dans les commentaires…"
                icon={<Search size={16} />}
            />
        </div>
        <select
            value={status}
            onChange={e => onStatusChange(e.target.value)}
            style={{
                padding:      '.6rem 1.1rem',
                border:       '1.5px solid #e2e8f0',
                borderRadius: '.75rem',
                fontSize:     '.875rem',
                fontFamily:   "'Plus Jakarta Sans', sans-serif",
                color:        '#475569',
                outline:      'none',
                background:   'white',
                cursor:       'pointer',
                minWidth:     180,
            }}
            onFocus={e => e.target.style.borderColor = '#38bdf8'}
            onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
        >
            {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
            ))}
        </select>
    </div>
);

export default CommentFilters;
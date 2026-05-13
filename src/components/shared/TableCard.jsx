import { Pencil, Trash2 } from "lucide-react";
import Button from "../ui/Button";

export const TableCard = ({ children }) => (
    <div style={{
        background: 'white',
        border: '1px solid #f1f5f9',
        borderRadius: '1rem',
        overflow: 'hidden',
    }}>
        {children}
    </div>
);

export const TableHead = ({ columns }) => (
    <thead>
        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
            {columns.map(col => (
                <th key={col} style={{
                    padding: '.75rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '.08em',
                    color: '#94a3b8',
                    fontWeight: 600,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    whiteSpace: 'nowrap',
                }}>
                    {col}
                </th>
            ))}
        </tr>
    </thead>
);

export const ActionButtons = ({ onEdit, onDelete }) => (
    <div style={{ display: 'flex', gap: '.4rem' }}>
        <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            title="Modifier"
            style={{
                width: '1.75rem', height: '1.75rem',
                padding: 0,
                background: '#e0f2fe',
                color: '#0284c7',
                borderRadius: '.4rem',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#bae6fd'}
            onMouseLeave={e => e.currentTarget.style.background = '#e0f2fe'}
        >
            <Pencil size={13} />
        </Button>
        <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            title="Supprimer"
            style={{
                width: '1.75rem', height: '1.75rem',
                padding: 0,
                background: '#fee2e2',
                color: '#dc2626',
                borderRadius: '.4rem',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fecaca'}
            onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}
        >
            <Trash2 size={13} />
        </Button>
    </div>
);
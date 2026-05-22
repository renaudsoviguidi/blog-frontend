import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, EyeOff, ExternalLink } from 'lucide-react';
import Button from '../../components/ui/Button';
import { TableHead, ActionButtons } from '../../components/shared/TableCard';
import { useNavigate } from 'react-router-dom';
import { myroutes } from '../../routes/routes';

const STATUS_BADGE = {
    pending:  { bg: '#fef3c7', color: '#d97706', label: 'En attente' },
    approved: { bg: '#d1fae5', color: '#059669', label: 'Approuvé'   },
    rejected: { bg: '#fef2f2', color: '#dc2626', label: 'Rejeté'     },
    spam:     { bg: '#fff7ed', color: '#ea580c', label: 'Spam'        },
    hidden:   { bg: '#f1f5f9', color: '#64748b', label: 'Masqué'     },
};

const StatusBadge = ({ status }) => {
    const s = STATUS_BADGE[status] ?? STATUS_BADGE.pending;
    return (
        <span style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          '.3rem',
            background:   s.bg,
            color:        s.color,
            padding:      '.2rem .65rem',
            borderRadius: '1rem',
            fontSize:     '.72rem',
            fontWeight:   600,
            fontFamily:   "'Plus Jakarta Sans', sans-serif",
            whiteSpace:   'nowrap',
        }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
            {s.label}
        </span>
    );
};

const CommentRow = ({ comment, index, onApprove, onReject, onSpam, onHide, onDelete }) => {
    const navigate = useNavigate();

    return (
        <tr
            style={{ borderBottom: '1px solid #f8fafc', transition: 'background .15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8faff'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
            {/* # */}
            <td style={{ padding: '1rem 1.5rem' }}>
                <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {index}
                </span>
            </td>

            {/* Auteur */}
            <td style={{ padding: '1rem 1.5rem', minWidth: 120 }}>
                <p style={{ fontSize: '.85rem', fontWeight: 600, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {comment.author?.name ?? 'Anonyme'}
                </p>
                {comment.guest_email && (
                    <p style={{ fontSize: '.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                        {comment.guest_email}
                    </p>
                )}
            </td>

            {/* Contenu */}
            <td style={{ padding: '1rem 1.5rem', maxWidth: 320 }}>
                <p style={{
                    fontSize:     '.85rem',
                    color:        '#475569',
                    fontFamily:   "'Plus Jakarta Sans', sans-serif",
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                    lineHeight:   1.5,
                }}>
                    {comment.content}
                </p>
                {comment.rejection_reason && (
                    <p style={{
                        fontSize:   '.72rem',
                        color:      '#dc2626',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        marginTop:  '.2rem',
                    }}>
                        Motif : {comment.rejection_reason}
                    </p>
                )}
            </td>

            {/* Post */}
            <td style={{ padding: '1rem 1.5rem' }}>
                {comment.post && (
                    <button
                        onClick={() => navigate(myroutes.article(comment.post.ref))}
                        style={{
                            background:  'none',
                            border:      'none',
                            cursor:      'pointer',
                            display:     'flex',
                            alignItems:  'center',
                            gap:         '.3rem',
                            fontSize:    '.78rem',
                            color:       '#0284c7',
                            fontFamily:  "'Plus Jakarta Sans', sans-serif",
                            fontWeight:  500,
                            maxWidth:    180,
                            overflow:    'hidden',
                            textOverflow:'ellipsis',
                            whiteSpace:  'nowrap',
                        }}
                    >
                        <ExternalLink size={11} />
                        {comment.post.title}
                    </button>
                )}
            </td>

            {/* Statut */}
            <td style={{ padding: '1rem 1.5rem' }}>
                <StatusBadge status={comment.status} />
            </td>

            {/* Date */}
            <td style={{ padding: '1rem 1.5rem', fontSize: '.78rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: 'nowrap' }}>
                {comment.created_at
                    ? new Date(comment.created_at).toLocaleDateString('fr-FR')
                    : '—'
                }
            </td>

            {/* Actions */}
            <td style={{ padding: '1rem 1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', flexWrap: 'wrap' }}>
                    {comment.status !== 'approved' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onApprove(comment)}
                            style={{ background: '#d1fae5', color: '#059669', border: '1px solid #a7f3d0', padding: '.3rem .6rem' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#a7f3d0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#d1fae5'}
                        >
                            <CheckCircle size={12} /> Approuver
                        </Button>
                    )}
                    {comment.status !== 'rejected' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onReject(comment)}
                            style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '.3rem .6rem' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fecaca'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fef2f2'}
                        >
                            <XCircle size={12} /> Rejeter
                        </Button>
                    )}
                    {comment.status !== 'spam' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onSpam(comment)}
                            style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid #fed7aa', padding: '.3rem .6rem' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#fed7aa'}
                            onMouseLeave={e => e.currentTarget.style.background = '#fff7ed'}
                        >
                            <AlertTriangle size={12} /> Spam
                        </Button>
                    )}
                    {comment.status !== 'hidden' && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onHide(comment)}
                            style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0', padding: '.3rem .6rem' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e2e8f0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f1f5f9'}
                        >
                            <EyeOff size={12} /> Masquer
                        </Button>
                    )}
                    <ActionButtons
                        onEdit={null}
                        onDelete={() => onDelete(comment)}
                    />
                </div>
            </td>
        </tr>
    );
};

const CommentList = ({ items, onApprove, onReject, onSpam, onHide, onDelete }) => (
    <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <TableHead columns={['#', 'Auteur', 'Commentaire', 'Article', 'Statut', 'Date', 'Actions']} />
            <tbody>
                {items.map((comment, index) => (
                    <CommentRow
                        key={comment.ref}
                        comment={comment}
                        index={index + 1}
                        onApprove={onApprove}
                        onReject={onReject}
                        onSpam={onSpam}
                        onHide={onHide}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    </div>
);

export default CommentList;
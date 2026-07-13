import React, { useState, useEffect, useCallback } from 'react';
import { MessageCircle, User, Reply, Send } from 'lucide-react';
import publicCommentService from '../../services/publicCommentService';
import { useCurrentUser } from '../../features/auth/hooks';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import useToast from '../../hooks/useToast';
import Spinner from '../../components/ui/Spinner';
import Toast from '../../components/shared/Toast';

/// ─ Composant : un commentaire + ses réponses
const CommentItem = ({ comment, onReply, replyingTo, onSubmitReply, submittingReply }) => {
    const [replyForm, setReplyForm] = useState({ content: '', guest_name: '', guest_email: '' });
    const user = useCurrentUser();
    const isReplying = replyingTo === comment.ref;

    return (
        <div style={{ marginBottom: '1.25rem' }}>

            {/* ── Commentaire principal ── */}
            <div style={{
                background: 'white',
                border: '1px solid #f1f5f9',
                borderRadius: '1rem',
                padding: '1rem 1.25rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '.65rem' }}>
                    <div style={{
                        width: '2rem', height: '2rem', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '.65rem', fontWeight: 700, color: 'white', flexShrink: 0,
                    }}>
                        {comment.author?.name?.slice(0, 2).toUpperCase() ?? '?'}
                    </div>
                    <div>
                        <p style={{ fontSize: '.85rem', fontWeight: 600, color: '#1e293b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {comment.author?.name ?? 'Anonyme'}
                        </p>
                        <p style={{ fontSize: '.72rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {comment.created_at
                                ? new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                    day: '2-digit', month: 'long', year: 'numeric',
                                })
                                : '—'
                            }
                        </p>
                    </div>
                </div>

                <p style={{
                    fontSize: '.875rem', color: '#475569', lineHeight: 1.7,
                    fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: '.65rem',
                }}>
                    {comment.content}
                </p>

                <button
                    onClick={() => onReply(isReplying ? null : comment.ref)}
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '.35rem',
                        fontSize: '.78rem', color: '#0284c7', fontWeight: 500,
                        fontFamily: "'Plus Jakarta Sans', sans-serif", padding: 0,
                    }}
                >
                    <Reply size={13} />
                    {isReplying ? 'Annuler' : 'Répondre'}
                </button>
            </div>

            {/* ── Formulaire de réponse — inline sous le commentaire ── */}
            {isReplying && (
                <div style={{
                    marginTop: '.5rem',
                    marginLeft: '1.5rem',
                    paddingLeft: '1rem',
                    borderLeft: '2px solid #e0f2fe',
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '.75rem',
                    padding: '1rem',
                }}>
                    <p style={{
                        fontSize: '.78rem', fontWeight: 600, color: '#0284c7',
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        marginBottom: '.75rem',
                    }}>
                        Répondre à {comment.author?.name ?? 'Anonyme'}
                    </p>
                    <ReplyForm
                        user={user}
                        formData={replyForm}
                        onChange={setReplyForm}
                        onSubmit={() => onSubmitReply(comment.ref, replyForm)}
                        submitting={submittingReply}
                    />
                </div>
            )}

            {/* ── Réponses indentées ── */}
            {(comment.replies ?? []).length > 0 && (
                <div style={{
                    marginTop: '.5rem',
                    marginLeft: '1.5rem',
                    paddingLeft: '1rem',
                    borderLeft: '2px solid #e0f2fe',
                }}>
                    {comment.replies.map((reply, i) => (
                        <div
                            key={reply.ref}
                            style={{
                                background: 'white',
                                border: '1px solid #f1f5f9',
                                borderRadius: '.75rem',
                                padding: '.85rem 1.1rem',
                                marginBottom: i < comment.replies.length - 1 ? '.5rem' : 0,
                            }}
                        >
                            {/* Header réponse */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
                                <div style={{
                                    width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #bae6fd, #0284c7)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '.6rem', fontWeight: 700, color: 'white', flexShrink: 0,
                                }}>
                                    {reply.author?.name?.slice(0, 2).toUpperCase() ?? '?'}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{
                                        fontSize: '.82rem', fontWeight: 600, color: '#1e293b',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}>
                                        {reply.author?.name ?? 'Anonyme'}
                                    </p>
                                    <p style={{
                                        fontSize: '.7rem', color: '#94a3b8',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}>
                                        {reply.created_at
                                            ? new Date(reply.created_at).toLocaleDateString('fr-FR', {
                                                day: '2-digit', month: 'long', year: 'numeric',
                                            })
                                            : '—'
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Contenu réponse */}
                            <p style={{
                                fontSize: '.85rem', color: '#475569', lineHeight: 1.6,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}>
                                {reply.content}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

/// ─ Formulaire de réponse
const ReplyForm = ({ user, formData, onChange, onSubmit, submitting }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
        {!user && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.75rem' }}>
                <Input
                    label="Nom *"
                    value={formData.guest_name}
                    onChange={e => onChange({ ...formData, guest_name: e.target.value })}
                    placeholder="Votre nom"
                />
                <Input
                    label="Email *"
                    type="email"
                    value={formData.guest_email}
                    onChange={e => onChange({ ...formData, guest_email: e.target.value })}
                    placeholder="votre@email.com"
                />
            </div>
        )}
        <TextArea
            label="Réponse *"
            value={formData.content}
            onChange={e => onChange({ ...formData, content: e.target.value })}
            placeholder="Votre réponse…"
            rows={3}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="primary"
                size="sm"
                loading={submitting}
                onClick={onSubmit}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}
            >
                <Send size={13} />
                Envoyer
            </Button>
        </div>
    </div>
);

/// ─ Section principale
const CommentSection = ({ postRef }) => {
    const user = useCurrentUser();
    const { toasts, toast, removeToast } = useToast();

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [submittingReply, setSubmittingReply] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [form, setForm] = useState({
        content: '',
        guest_name: '',
        guest_email: '',
    });

    const loadComments = useCallback(() => {
        setLoading(true);
        publicCommentService.getByPost(postRef)
            .then(r => setComments(r.data?.data ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [postRef]);

    useEffect(() => { loadComments(); }, [loadComments]);

    const handleSubmit = async () => {
        if (!form.content.trim()) return;
        setSubmitting(true);
        try {
            await publicCommentService.create(postRef, form);
            setForm({ content: '', guest_name: '', guest_email: '' });
            setSubmitted(true);
            toast.success('Commentaire soumis ! Il sera visible après modération.');
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitReply = async (parentRef, replyData) => {
        if (!replyData.content.trim()) return;
        setSubmittingReply(true);
        try {
            await publicCommentService.create(postRef, {
                content: replyData.content,
                guest_name: replyData.guest_name,
                guest_email: replyData.guest_email,
                parent_ref: parentRef, 
            });
            setReplyingTo(null);
            toast.success('Réponse soumise ! Elle sera visible après modération.');
        } catch (e) {
            toast.error(e.message);
        } finally {
            setSubmittingReply(false);
        }
    };

    return (
        <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>

            {/* Titre */}
            <h2 style={{
                fontFamily: "'Lora', serif",
                fontSize: '1.2rem',
                fontWeight: 600,
                color: '#0c4a6e',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '.6rem',
            }}>
                <MessageCircle size={20} color="#0284c7" />
                Commentaires
                {comments.length > 0 && (
                    <span style={{
                        background: '#e0f2fe',
                        color: '#0284c7',
                        padding: '.15rem .6rem',
                        borderRadius: '1rem',
                        fontSize: '.78rem',
                        fontWeight: 600,
                    }}>
                        {comments.length}
                    </span>
                )}
            </h2>

            {/* Formulaire principal */}
            {!submitted ? (
                <div style={{
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '1rem',
                    padding: '1.25rem',
                    marginBottom: '2rem',
                }}>
                    <h3 style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: '.9rem',
                        fontWeight: 600,
                        color: '#0c4a6e',
                        marginBottom: '1rem',
                    }}>
                        Laisser un commentaire
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '.85rem' }}>
                        {/* Champs invité si non connecté */}
                        {!user && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.85rem' }}>
                                <Input
                                    label="Nom *"
                                    value={form.guest_name}
                                    onChange={e => setForm(f => ({ ...f, guest_name: e.target.value }))}
                                    placeholder="Votre nom"
                                />
                                <Input
                                    label="Email *"
                                    type="email"
                                    value={form.guest_email}
                                    onChange={e => setForm(f => ({ ...f, guest_email: e.target.value }))}
                                    placeholder="votre@email.com (non publié)"
                                />
                            </div>
                        )}

                        {user && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '.6rem',
                                padding: '.65rem .85rem',
                                background: '#e0f2fe',
                                borderRadius: '.65rem',
                                fontSize: '.82rem',
                                color: '#0284c7',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}>
                                <User size={14} />
                                Connecté en tant que <strong>{user.name}</strong>
                            </div>
                        )}

                        <TextArea
                            label="Commentaire *"
                            value={form.content}
                            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                            placeholder="Partagez votre avis…"
                            rows={4}
                        />

                        <p style={{ fontSize: '.72rem', color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Votre commentaire sera visible après modération.
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="primary"
                                size="sm"
                                loading={submitting}
                                onClick={handleSubmit}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem' }}
                            >
                                <Send size={14} />
                                Publier le commentaire
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
                    borderLeft: '4px solid #10b981',
                    borderRadius: '.75rem',
                    padding: '1rem 1.25rem',
                    marginBottom: '2rem',
                    fontSize: '.875rem',
                    color: '#065f46',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    Merci ! Votre commentaire sera visible après modération.
                    <button
                        onClick={() => setSubmitted(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: '#0284c7',
                            fontSize: '.82rem',
                            marginLeft: '.75rem',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                    >
                        Laisser un autre commentaire
                    </button>
                </div>
            )}

            {/* Liste des commentaires */}
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                    <Spinner />
                </div>
            ) : comments.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '2.5rem',
                    color: '#94a3b8',
                    fontSize: '.875rem',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: '#f8fafc',
                    borderRadius: '1rem',
                }}>
                    <MessageCircle size={28} color="#e2e8f0" style={{ margin: '0 auto .75rem' }} />
                    Aucun commentaire pour l'instant. Soyez le premier !
                </div>
            ) : (
                comments.map(comment => (
                    <CommentItem
                        key={comment.ref}
                        comment={comment}
                        onReply={setReplyingTo}
                        replyingTo={replyingTo}
                        onSubmitReply={handleSubmitReply}
                        submittingReply={submittingReply}
                    />
                ))
            )}

            <Toast toasts={toasts} removeToast={removeToast} />
        </section>
    );
};

export default CommentSection;
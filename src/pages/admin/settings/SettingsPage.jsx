import React           from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Users, Heart, Shield, Bell, Database } from 'lucide-react';
import AdminLayout     from '../../../layouts/AdminLayout';
import { myroutes }    from '../../../routes/routes';

const SETTINGS_CARDS = [
    {
        id: 'newsletters',
        icon: Mail,
        color: '#0284c7',
        bg: '#e0f2fe',
        title: 'Newsletter',
        description: 'Gérer les abonnés, voir les inscriptions et désabonnements.',
        route: myroutes.newsletters,
    },
    {
        id: 'users',
        icon: Users,
        color: '#10b981',
        bg: '#d1fae5',
        title: 'Utilisateurs',
        description: 'Gérer les comptes utilisateurs et leurs rôles.',
        route: myroutes.users,
        disabled: false,
    },
    {
        id: 'likes',
        icon: Heart,
        color: '#ef4444',
        bg: '#fef2f2',
        title: 'Likes',
        description: 'Voir les likes par article et par commentaire.',
        route: '',
        disabled: true,
    },
    {
        id: 'roles',
        icon: Shield,
        color: '#6366f1',
        bg: '#ede9fe',
        title: 'Rôles & Permissions',
        description: 'Gérer les rôles et les habilitations.',
        route: myroutes.roles,
        disabled: false,
    },
    {
        id: 'notifications',
        icon: Bell,
        color: '#f59e0b',
        bg: '#fef3c7',
        title: 'Notifications',
        description: 'Configurer les notifications email et système.',
        route: '',
        disabled: true,
    },
    {
        id: 'system',
        icon: Database,
        color: '#64748b',
        bg: '#f1f5f9',
        title: 'Système',
        description: 'Informations système, logs et maintenance.',
        route: '',
        disabled: true,
    },
];

const SettingsPage = () => {
    const navigate = useNavigate();

    return (
        <AdminLayout>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{
                    fontFamily:   "'Lora', serif",
                    fontSize:     '1.5rem',
                    fontWeight:   600,
                    color:        '#0c4a6e',
                    marginBottom: '.35rem',
                }}>
                    Paramètres
                </h1>
                <p style={{
                    fontSize:   '.875rem',
                    color:      '#94a3b8',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                    Gérez les différentes configurations de votre blog.
                </p>
            </div>

            {/* Grille de cards */}
            <div style={{
                display:               'grid',
                gridTemplateColumns:   'repeat(auto-fill, minmax(280px, 1fr))',
                gap:                   '1.25rem',
            }}>
                {SETTINGS_CARDS.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.id}
                            onClick={() => !card.disabled && navigate(card.route)}
                            style={{
                                background:    'white',
                                border:        `1.5px solid ${card.disabled ? '#f1f5f9' : '#f1f5f9'}`,
                                borderRadius:  '1rem',
                                padding:       '1.5rem',
                                cursor:        card.disabled ? 'not-allowed' : 'pointer',
                                opacity:       card.disabled ? .55 : 1,
                                transition:    'all .2s',
                                animation:     `fadeUp .35s ease ${i * 0.07}s both`,
                            }}
                            onMouseEnter={e => {
                                if (!card.disabled) {
                                    e.currentTarget.style.borderColor = card.color + '60';
                                    e.currentTarget.style.boxShadow  = `0 8px 24px rgba(0,0,0,.06)`;
                                    e.currentTarget.style.transform  = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = '#f1f5f9';
                                e.currentTarget.style.boxShadow   = 'none';
                                e.currentTarget.style.transform   = 'translateY(0)';
                            }}
                        >
                            {/* Icône */}
                            <div style={{
                                width:          '3rem',
                                height:         '3rem',
                                borderRadius:   '.75rem',
                                background:     card.bg,
                                display:        'flex',
                                alignItems:     'center',
                                justifyContent: 'center',
                                marginBottom:   '1rem',
                            }}>
                                <Icon size={20} color={card.color} />
                            </div>

                            {/* Titre */}
                            <h3 style={{
                                fontFamily:   "'Lora', serif",
                                fontSize:     '1rem',
                                fontWeight:   600,
                                color:        '#0c4a6e',
                                marginBottom: '.4rem',
                                display:      'flex',
                                alignItems:   'center',
                                gap:          '.6rem',
                            }}>
                                {card.title}
                                {card.disabled && (
                                    <span style={{
                                        fontSize:   '.65rem',
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontWeight: 500,
                                        color:      '#94a3b8',
                                        background: '#f1f5f9',
                                        padding:    '.15rem .5rem',
                                        borderRadius: '1rem',
                                    }}>
                                        Bientôt
                                    </span>
                                )}
                            </h3>

                            {/* Description */}
                            <p style={{
                                fontSize:   '.82rem',
                                color:      '#64748b',
                                lineHeight: 1.6,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                            }}>
                                {card.description}
                            </p>

                            {/* Flèche si actif */}
                            {!card.disabled && (
                                <div style={{
                                    marginTop:  '1rem',
                                    fontSize:   '.8rem',
                                    color:      card.color,
                                    fontWeight: 600,
                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                }}>
                                    Accéder →
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>
        </AdminLayout>
    );
};

export default SettingsPage;
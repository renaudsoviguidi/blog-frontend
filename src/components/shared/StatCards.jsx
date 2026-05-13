export const StatCards = ({ stats }) => (
    <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.75rem',
    }}>
        {stats.map((s, i) => (
            <div key={i} style={{
                background: 'white',
                border: '1px solid #f1f5f9',
                borderRadius: '1rem',
                padding: '1.25rem 1.5rem',
                animation: `fadeUp .35s ease ${i * 0.07}s both`,
            }}>
                <div style={{
                    width: '2.25rem', height: '2.25rem', borderRadius: '.65rem',
                    background: s.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '.9rem',
                }}>
                    <s.Icon size={16} color={s.color} />
                </div>
                <div style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '1.6rem', fontWeight: 600, color: '#0c4a6e',
                }}>{s.value ?? '—'}</div>
                <div style={{ fontSize: '.78rem', color: '#94a3b8', marginTop: '.15rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {s.label}
                </div>
            </div>
        ))}
        <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
);
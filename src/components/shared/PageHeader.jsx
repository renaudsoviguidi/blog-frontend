import Button from "../ui/Button";

export const PageHeader = ({ title, count, actionLabel, onAction }) => (
    <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1.75rem',
    }}>
        <div>
            <h1 style={{
                fontFamily: "'Lora', serif",
                fontSize: '1.5rem', fontWeight: 600, color: '#0c4a6e',
            }}>
                {title}
            </h1>
            {count !== undefined && (
                <p style={{ fontSize: '.8rem', color: '#94a3b8', marginTop: '.2rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {count} entrée{count !== 1 ? 's' : ''}
                </p>
            )}
        </div>
        {actionLabel && (
            <Button variant="primary" size="md" onClick={onAction}>
                + {actionLabel}
            </Button>
        )}
    </div>
);
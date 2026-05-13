import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const CONFIG = {
  success: {
    border: "#10b981",
    icon: CheckCircle,
    color: "#10b981",
    bg: "#f0fdf4",
    title: "#065f46",
  },
  error: {
    border: "#ef4444",
    icon: XCircle,
    color: "#ef4444",
    bg: "#fef2f2",
    title: "#991b1b",
  },
  warning: {
    border: "#f59e0b",
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "#92400e",
  },
  info: {
    border: "#0284c7",
    icon: Info,
    color: "#0284c7",
    bg: "#f0f7ff",
    title: "#075985",
  },
};

const ToastItem = ({ id, type, title, message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 280);
  };

  const c = CONFIG[type] ?? CONFIG.info;
  const Icon = c.icon;

  return (
    <div
      style={{
        transition: "all .28s cubic-bezier(.4,0,.2,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          gap: ".75rem",
          padding: ".9rem 1rem",
          background: c.bg,
          border: `1px solid ${c.border}25`,
          borderLeft: `4px solid ${c.border}`,
          borderRadius: "1rem",
          boxShadow: "0 8px 32px rgba(0,0,0,.1)",
          minWidth: 320,
          maxWidth: 400,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Icône */}
        <Icon
          size={17}
          color={c.color}
          style={{ flexShrink: 0, marginTop: ".1rem" }}
        />

        {/* Contenu */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: ".875rem",
              fontWeight: 600,
              color: c.title,
              lineHeight: 1.4,
            }}
          >
            {title}
          </p>
          {message && (
            <p
              style={{
                fontSize: ".78rem",
                color: "#64748b",
                marginTop: ".2rem",
                lineHeight: 1.5,
              }}
            >
              {message}
            </p>
          )}
        </div>

        {/* Fermer */}
        <button
          onClick={handleClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: ".1rem",
            color: "#94a3b8",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            transition: "color .15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "1.25rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: ".6rem",
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;

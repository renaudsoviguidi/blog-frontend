import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

const STYLES = {
  success: {
    bar:  "bg-emerald-500",
    icon: <CheckCircle size={18} className="text-emerald-500" />,
    title: "text-emerald-700",
  },
  error: {
    bar:  "bg-red-500",
    icon: <XCircle size={18} className="text-red-500" />,
    title: "text-red-700",
  },
  warning: {
    bar:  "bg-amber-400",
    icon: <AlertTriangle size={18} className="text-amber-500" />,
    title: "text-amber-700",
  },
  info: {
    bar:  "bg-sky-500",
    icon: <Info size={18} className="text-sky-500" />,
    title: "text-sky-700",
  },
};

const Toast = ({ id, type, title, message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Entrée avec un léger délai pour déclencher l'animation
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const s = STYLES[type] || STYLES.info;

  return (
    <div
      className="pointer-events-auto"
      style={{
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <div
        className="relative flex items-start gap-3 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden"
        style={{ minWidth: "320px", maxWidth: "400px", padding: "14px 16px" }}
      >
        {/* Barre colorée gauche */}
        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${s.bar}`} />

        {/* Icône */}
        <div className="mt-0.5 shrink-0">{s.icon}</div>

        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${s.title}`}>{title}</p>
          {message && (
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{message}</p>
          )}
        </div>

        {/* Bouton fermer */}
        <button
          onClick={handleClose}
          className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors mt-0.5"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};

const ToastContainer = ({ toasts, removeToast }) => {
  if (!toasts.length) return null;

  return (
    <div
      className="fixed top-5 right-5 z-50 flex flex-col gap-3 pointer-events-none"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
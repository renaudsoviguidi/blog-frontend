import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const VARIANTS = {
  error: {
    bg: "#fef2f2",
    border: "#fecaca",
    color: "#dc2626",
    icon: XCircle,
  },
  success: {
    bg: "#f0fdf4",
    border: "#bbf7d0",
    color: "#16a34a",
    icon: CheckCircle,
  },
  info: {
    bg: "#f0f7ff",
    border: "#bae6fd",
    color: "#0284c7",
    icon: Info,
  },
  warning: {
    bg: "#fffbeb",
    border: "#fde68a",
    color: "#d97706",
    icon: AlertTriangle,
  },
};

export default function Alert({ message, variant = "error" }) {
  if (!message) return null;

  const v = VARIANTS[variant] ?? VARIANTS.error;
  const Icon = v.icon;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: ".65rem",
        padding: ".85rem 1rem",
        background: v.bg,
        border: `1.5px solid ${v.border}`,
        borderLeft: `4px solid ${v.color}`,
        borderRadius: ".75rem",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Icon
        size={16}
        color={v.color}
        style={{ flexShrink: 0, marginTop: ".1rem" }}
      />
      <p
        style={{
          fontSize: ".85rem",
          color: v.color,
          fontWeight: 500,
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>
    </div>
  );
}

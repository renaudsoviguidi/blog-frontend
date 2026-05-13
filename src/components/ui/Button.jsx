import Spinner from "./Spinner";

const VARIANTS = {
  primary: {
    background: "linear-gradient(135deg, #38bdf8, #0284c7)",
    color: "white",
    border: "none",
    boxShadow: "0 2px 8px rgba(2,132,199,.25)",
    hoverShadow: "0 4px 14px rgba(2,132,199,.35)",
  },
  secondary: {
    background: "white",
    color: "#475569",
    border: "1.5px solid #e2e8f0",
    boxShadow: "none",
    hoverShadow: "none",
  },
  danger: {
    background: "#ef4444",
    color: "white",
    border: "none",
    boxShadow: "0 2px 8px rgba(239,68,68,.25)",
    hoverShadow: "0 4px 14px rgba(239,68,68,.35)",
  },
  ghost: {
    background: "transparent",
    color: "#64748b",
    border: "1.5px solid transparent",
    boxShadow: "none",
    hoverShadow: "none",
  },
};

const SIZES = {
  sm: { padding: ".45rem 1rem", fontSize: ".82rem" },
  md: { padding: ".6rem 1.35rem", fontSize: ".875rem" },
  lg: { padding: ".75rem 1.75rem", fontSize: "1rem" },
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  style = {},
  ...props
}) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;

  return (
    <button
      disabled={loading || props.disabled}
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: ".5rem",
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        borderRadius: ".75rem",
        border: v.border,
        background: loading
          ? variant === "primary"
            ? "#7dd3fc"
            : v.background
          : v.background,
        color: v.color,
        boxShadow: v.boxShadow,
        cursor: loading || props.disabled ? "not-allowed" : "pointer",
        opacity: props.disabled && !loading ? 0.6 : 1,
        transition: "all .2s",
        whiteSpace: "nowrap",
        width: props.fullWidth ? "100%" : undefined,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (loading || props.disabled) return;
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.boxShadow = v.hoverShadow;
        if (variant === "secondary")
          e.currentTarget.style.borderColor = "#bae6fd";
        if (variant === "ghost") e.currentTarget.style.background = "#f0f7ff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = v.boxShadow;
        if (variant === "secondary")
          e.currentTarget.style.borderColor = "#e2e8f0";
        if (variant === "ghost")
          e.currentTarget.style.background = "transparent";
      }}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}

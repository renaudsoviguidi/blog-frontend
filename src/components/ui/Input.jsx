import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, icon, style = {}, ...props },
  ref,
) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
      {/* Label au-dessus si fourni */}
      {label && (
        <label
          style={{
            fontSize: ".8rem",
            fontWeight: 600,
            color: "#475569",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".65rem",
          padding: "0 1rem",
          height: "3.25rem",
          borderRadius: ".75rem",
          border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
          background: error ? "#fff5f5" : "#f8fafc",
          transition: "all .2s",
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = error ? "#ef4444" : "#38bdf8";
          e.currentTarget.style.background = "white";
          e.currentTarget.style.boxShadow = error
            ? "0 0 0 3px rgba(239,68,68,.1)"
            : "0 0 0 3px rgba(56,189,248,.1)";
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = error ? "#fca5a5" : "#e2e8f0";
          e.currentTarget.style.background = error ? "#fff5f5" : "#f8fafc";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {icon && (
          <span style={{ color: "#94a3b8", display: "flex", flexShrink: 0 }}>
            {icon}
          </span>
        )}
        <input
          ref={ref}
          placeholder={label}
          {...props}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: ".9rem",
            color: "#1e293b",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            ...style,
          }}
        />
      </div>

      {/* Message d'erreur */}
      {error && (
        <p
          style={{
            fontSize: ".75rem",
            color: "#ef4444",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            paddingLeft: ".25rem",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;

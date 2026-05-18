import React from "react";

const TextArea = ({
    label,
    required,
    error,
    rows = 3,
    style = {},
    ...props
}) => (
    <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
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
            {required && (
                <span style={{ color: "#ef4444", marginLeft: ".25rem" }}>*</span>
            )}
            </label>
    )}
    <textarea
        rows={rows}
        {...props}
        style={{
        width: "100%",
        padding: ".65rem 1rem",
        border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
        borderRadius: ".75rem",
        fontSize: ".875rem",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#1e293b",
        outline: "none",
        background: error ? "#fff5f5" : "#f8fafc",
        transition: "border-color .2s",
        resize: "vertical",
        ...style,
        }}
        onFocus={(e) => (e.target.style.borderColor = "#38bdf8")}
        onBlur={(e) =>
        (e.target.style.borderColor = error ? "#fca5a5" : "#e2e8f0")
        }
    />
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

export default TextArea;

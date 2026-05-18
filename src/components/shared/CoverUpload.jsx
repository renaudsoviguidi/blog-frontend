import React, { useRef } from "react";
import { Upload, X } from "lucide-react";

const labelStyle = {
    display: "block",
    fontSize: ".8rem",
    fontWeight: 600,
    color: "#475569",
    marginBottom: ".4rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const CoverUpload = ({
    preview,
    onFile,
    onClear,
    label = "Image de couverture",
    accept = "image/png,image/jpeg,image/svg+xml",
    hint = "PNG, JPG, SVG — 5 Mo max",
}) => {
    const ref = useRef();

    return (
    <div>
        <label style={labelStyle}>{label}</label>
        {preview ? (
        <div style={{ position: "relative", width: "100%" }}>
            <img
            src={preview}
            alt="preview"
            style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: ".75rem",
                border: "1.5px solid #e2e8f0",
            }}
            />
            <button
            onClick={onClear}
            style={{
                position: "absolute",
                top: ".5rem",
                right: ".5rem",
                background: "rgba(0,0,0,.5)",
                border: "none",
                borderRadius: "50%",
                width: "1.75rem",
                height: "1.75rem",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            >
            <X size={13} />
            </button>
        </div>
        ) : (
        <div
            onClick={() => ref.current?.click()}
            style={{
            border: "2px dashed #cbd5e1",
            borderRadius: ".75rem",
            padding: "2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "all .2s",
            background: "#f8fafc",
            }}
            onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#38bdf8";
            e.currentTarget.style.background = "#f0f7ff";
            }}
            onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#cbd5e1";
            e.currentTarget.style.background = "#f8fafc";
            }}
        >
            <Upload
            size={22}
            color="#94a3b8"
            style={{ margin: "0 auto .6rem" }}
            />
            <p
            style={{
                fontSize: ".82rem",
                color: "#64748b",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            >
            Cliquez pour choisir une image
            </p>
            <p
            style={{
                fontSize: ".72rem",
                color: "#94a3b8",
                marginTop: ".25rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
            >
            {hint}
            </p>
        </div>
        )}
        <input
        ref={ref}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFile(file);
        }}
        />
    </div>
    );
};

export default CoverUpload;

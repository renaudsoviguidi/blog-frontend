import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";

const PageBtn = ({ children, active, disabled, onClick }) => (
    <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        disabled={disabled}
        style={{
            width: "2.1rem",
            height: "2.1rem",
            padding: 0,
            borderRadius: ".55rem",
            border: active ? "none" : "1.5px solid #e2e8f0",
            background: active
            ? "linear-gradient(135deg, #38bdf8, #0284c7)"
            : disabled
                ? "#f8fafc"
                : "white",
            color: active ? "white" : disabled ? "#cbd5e1" : "#475569",
            fontSize: ".82rem",
            fontWeight: active ? 600 : 400,
            boxShadow: active ? "0 2px 8px rgba(2,132,199,.3)" : "none",
        }}
        >
        {children}
    </Button>
);

const Pagination = ({ meta, page, onPageChange }) => {
  if (!meta || meta.last_page <= 1) return null;

  const pages = Array.from({ length: meta.last_page }, (_, i) => i + 1);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 1.5rem",
        borderTop: "1px solid #f1f5f9",
      }}
    >
      <span
        style={{
          fontSize: ".8rem",
          color: "#94a3b8",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {meta.from}–{meta.to} sur {meta.total} résultats
      </span>
      <div style={{ display: "flex", gap: ".35rem" }}>
        <PageBtn disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft size={14} />
        </PageBtn>
        {pages.map((p) => (
          <PageBtn key={p} active={p === page} onClick={() => onPageChange(p)}>
            {p}
          </PageBtn>
        ))}
        <PageBtn
          disabled={page === meta.last_page}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={14} />
        </PageBtn>
      </div>
    </div>
  );
};

export default Pagination;

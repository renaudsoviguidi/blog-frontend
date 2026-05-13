const SIZES = {
  sm: { width: "1rem", height: "1rem", borderWidth: 2 },
  md: { width: "1.5rem", height: "1.5rem", borderWidth: 2 },
  lg: { width: "2.25rem", height: "2.25rem", borderWidth: 3 },
};

export default function Spinner({ size = "md", color = "#0284c7" }) {
  const s = SIZES[size] ?? SIZES.md;

  return (
    <div
      style={{
        width: s.width,
        height: s.height,
        borderRadius: "50%",
        border: `${s.borderWidth}px solid #e2e8f0`,
        borderTop: `${s.borderWidth}px solid ${color}`,
        animation: "spin .7s linear infinite",
        flexShrink: 0,
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

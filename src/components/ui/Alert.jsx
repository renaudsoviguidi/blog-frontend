const variants = {
  error: "bg-red-50 text-red-700 border-red-200",
  success: "bg-green-50 text-green-700 border-green-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function Alert({ message, variant = "error" }) {
  if (!message) return null;

  return (
    <div className={`px-4 py-3 rounded-lg border text-sm ${variants[variant]}`}>
      {message}
    </div>
  );
}
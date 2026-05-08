import Spinner from "./Spinner";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  ghost: "hover:bg-gray-100 text-gray-600",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium rounded-lg transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}

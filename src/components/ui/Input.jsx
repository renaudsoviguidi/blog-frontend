import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, icon, className = "", ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className={`
          flex items-center gap-3 px-4 h-[58px]
          rounded-2xl border
          bg-blue-50 border-blue-200
          focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100
          transition-all duration-150
          ${error ? "!border-red-400 !bg-red-50 focus-within:!ring-red-100" : ""}
        `}
      >
        {icon && (
          <span className="text-blue-400 flex-shrink-0 flex items-center">
            {icon}
          </span>
        )}

        <input
          ref={ref}
          placeholder={label}
          className={`
            flex-1 bg-transparent outline-none border-none
            text-base text-gray-700 placeholder:text-gray-400
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 pl-1">{error}</p>
      )}
    </div>
  );
});

export default Input;
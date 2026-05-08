import { useState, useCallback } from "react";

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = "info", title, message, duration = 4000 }) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (message, title = "Succès")        => addToast({ type: "success", title, message }),
    error:   (message, title = "Erreur")        => addToast({ type: "error",   title, message }),
    warning: (message, title = "Attention")     => addToast({ type: "warning", title, message }),
    info:    (message, title = "Information")   => addToast({ type: "info",    title, message }),
  };

  return { toasts, toast, removeToast };
};
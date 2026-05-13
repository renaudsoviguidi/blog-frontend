import { useState, useCallback } from "react";

const useToast = (duration = 3500) => {
    const [toasts, setToasts] = useState([]);

    const show = useCallback((message, type = "success") => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, [duration]);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Raccourcis — compatibles avec ton LoginForm existant
    const toast = {
        success: (message) => show(message, "success"),
        error:   (message) => show(message, "error"),
        info:    (message) => show(message, "info"),
        warning: (message) => show(message, "warning"),
    };

    return { toasts, show, toast, removeToast };
};

export default useToast;
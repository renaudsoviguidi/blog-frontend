import { useState, useCallback } from 'react';

const useModal = () => {
    const [open, setOpen]    = useState(false);
    const [editing, setEditing] = useState(null);

    const openCreate = useCallback(() => { setEditing(null); setOpen(true);  }, []);
    const openEdit = useCallback((item) => { setEditing(item); setOpen(true);  }, []);
    const close = useCallback(() => { setOpen(false); setEditing(null); }, []);

    return { open, editing, openCreate, openEdit, close };
};

export default useModal;
import { useState, useCallback } from 'react';

const useConfirm = () => {
    const [state, setState] = useState({
        open:        false,
        title:       '',
        description: '',
        onConfirm:   null,
    });
    const [loading, setLoading] = useState(false);

    const confirm = useCallback(({ title, description, onConfirm }) => {
        setState({ open: true, title, description, onConfirm });
    }, []);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await state.onConfirm?.();
        } finally {
            setLoading(false);
            setState(s => ({ ...s, open: false }));
        }
    };

    const handleCancel = useCallback(() => {
        setState(s => ({ ...s, open: false }));
    }, []);

    return {
        confirmState: state,
        confirmLoading: loading,
        confirm,
        handleConfirm,
        handleCancel,
    };
};

export default useConfirm;
import { useState, useEffect, useCallback } from 'react';

const usePaginatedList = (fetchFn, deps = []) => {
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const load = useCallback(async (p = page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFn(p);
            const res = response.data;
            setItems(res.data ?? []);
            setMeta(res.meta  ?? null);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, ...deps]);

    useEffect(() => { load(page); }, [page, ...deps]);

    const reload = () => load(page);

    return { items, meta, page, setPage, loading, error, reload };
};

export default usePaginatedList;
import { useState, useEffect } from 'react';

export const useGetData = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products', { mode: 'cors' })
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error('Server error! Please check the URL.');
                }
                return res.json();
            })
            .then((res) => setData(res))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, []);

    // console.log({ data, error, loading });
    return { data, error, loading };
};

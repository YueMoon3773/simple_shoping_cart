import { useState, useRef, useEffect } from 'react';

export const useHeaderNavShadow = (threshold = 0.2) => {
    const [headerShadow, setHeaderShadow] = useState(false);
    const pageMarker = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entries]) => {
                setHeaderShadow(!entries.isIntersecting);
            },
            { threshold },
        );

        if (pageMarker.current) {
            observer.observe(pageMarker.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    return { headerShadow, pageMarker };
};

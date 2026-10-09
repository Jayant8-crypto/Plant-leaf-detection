'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const directionClass = {
        up: visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0',

        down: visible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-8 opacity-0',

        left: visible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-8 opacity-0',

        right: visible
            ? 'translate-x-0 opacity-100'
            : '-translate-x-8 opacity-0',

        none: visible
            ? 'opacity-100'
            : 'opacity-0',
    };

    return (
        <div
            ref={ref}
            className={`${directionClass[direction]} ${className}`}
            style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '800ms',
                transitionTimingFunction:
                    'cubic-bezier(0.22, 1, 0.36, 1)',
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
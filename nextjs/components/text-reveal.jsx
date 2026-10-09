'use client';

import { useEffect, useRef, useState } from 'react';

export default function TextReveal({ children, className = '' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const words = String(children).split(' ');

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return (
        <span
            ref={ref}
            className={`text-reveal ${visible ? 'text-reveal-visible' : ''} ${className}`}
            aria-label={String(children)}
        >
            {words.map((word, index) => (
                <span
                    key={`${word}-${index}`}
                    className='text-reveal-word'
                    aria-hidden='true'
                    style={{ transitionDelay: `${index * 45}ms` }}
                >
                    {word}
                </span>
            ))}
        </span>
    );
}

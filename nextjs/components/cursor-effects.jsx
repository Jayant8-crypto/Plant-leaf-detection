'use client';

import { useEffect } from 'react';

export default function CursorEffects() {
    useEffect(() => {
        const handlePointerMove = (event) => {
            document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
            document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
        };

        window.addEventListener('pointermove', handlePointerMove);

        return () => window.removeEventListener('pointermove', handlePointerMove);
    }, []);

    return (
        <>
            <div className='pointer-ring' aria-hidden='true' />
            <div className='pointer-dot' aria-hidden='true' />
        </>
    );
}

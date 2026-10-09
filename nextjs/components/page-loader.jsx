'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        const leaveTimer = window.setTimeout(() => setIsLeaving(true), 700);
        const removeTimer = window.setTimeout(() => setIsVisible(false), 1100);

        return () => {
            window.clearTimeout(leaveTimer);
            window.clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`page-loader ${isLeaving ? 'page-loader-leaving' : ''}`}>
            <div className='page-loader-mark'>
                <span className='page-loader-leaf page-loader-leaf-left' />
                <span className='page-loader-leaf page-loader-leaf-right' />
            </div>
            <div className='page-loader-meta'>
                <span>Cotton / Lens</span>
                <span>Field intelligence</span>
            </div>
            <div className='page-loader-line'>
                <span />
            </div>
        </div>
    );
}

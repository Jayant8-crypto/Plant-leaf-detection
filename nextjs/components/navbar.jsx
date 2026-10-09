'use client';

import { ArrowUpRightIcon, MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Cotton Diseases', href: '#cotton-diseases' },
    { name: 'Analyze', href: '#analyze' },
    { name: 'About', href: '#faq' },
    ];

    return (
        <>
            <nav className="site-nav sticky top-0 z-50 mx-3 mt-3 flex w-[calc(100%-1.5rem)] items-center justify-between rounded-2xl border border-[#10231d]/10 bg-[#f4f7ef]/80 px-4 py-3 shadow-[0_12px_35px_rgba(16,35,29,0.06)] backdrop-blur-xl md:mx-6 md:w-[calc(100%-3rem)] md:px-6 lg:mx-10 lg:w-[calc(100%-5rem)] lg:px-8">

                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="brand-mark relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-[#10231d] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        <span className="absolute h-5 w-2.5 -rotate-45 rounded-full bg-[#b7db68]" />
                        <span className="absolute h-5 w-2.5 rotate-45 rounded-full bg-[#6fa86b]" />
                    </div>

                    <span className="text-[15px] font-semibold tracking-[-0.02em] text-[#10231d]">
                        Cotton <span className="text-[#6b8171]">/ Lens</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 rounded-xl border border-[#10231d]/5 bg-white/35 p-1 text-[13px] font-medium text-[#51635a] md:flex">
                    {links.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link rounded-lg px-3 py-2 transition hover:bg-white/80 hover:text-[#315c43]"
                            style={{ '--nav-delay': `${index * 65}ms` }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Buttons */}
                <div className="hidden items-center gap-2 md:flex">
                    <Link
                        href="/login"
                        className="nav-action rounded-xl border border-[#10231d]/15 px-4 py-2.5 text-sm font-medium text-[#315c43] transition hover:border-[#315c43] hover:bg-white"
                    >
                        Login
                    </Link>

                    <Link
                        href="/signup"
                        className="cursor-glow group flex items-center gap-1.5 rounded-xl bg-[#10231d] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#315c43]"
                    >
                        Start analysis <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-xl border border-[#10231d]/10 bg-white/50 p-2 transition hover:bg-white active:scale-90 md:hidden"
                    aria-label="Open navigation"
                >
                    <MenuIcon className="size-6" />
                </button>
            </nav>

            {/* Mobile Navigation */}
            <div
                className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-7 bg-[#10231d]/95 text-lg font-medium text-[#f4f7ef] backdrop-blur-xl transition duration-300 md:hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-[#dce8d6] transition hover:text-[#b7db68]"
                        onClick={() => setIsOpen(false)}
                    >
                        {link.name}
                    </Link>
                ))}

                <div className="mt-2 flex flex-col gap-3">
                    <Link
                        href="/login"
                        className="rounded-xl border border-white/20 px-8 py-2.5 text-center text-[#dce8d6]"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>

                    <Link
                        href="/signup"
                        className="rounded-xl bg-[#b7db68] px-8 py-2.5 text-center text-[#10231d]"
                        onClick={() => setIsOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                        className="mt-3 rounded-xl border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/20"
                        aria-label="Close navigation"
                >
                    <XIcon className="size-5" />
                </button>
            </div>
        </>
    );
}
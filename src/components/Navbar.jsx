import React, { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // THE FIX: Custom scroll function to bypass GSAP's pin confusion
    const scrollToTop = (e) => {
        e.preventDefault(); // Stops the default #home jump
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false); // Closes menu if on mobile
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-[100]">
            {/* Desktop */}
            <div className="hidden md:flex w-full items-center justify-between px-8 pt-2">

                <div className="flex-1 flex justify-end space-x-8 pr-6 md:pr-10">
                    {/* THE FIX: Added onClick={scrollToTop} */}
                    <a href="#home" onClick={scrollToTop} className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">HOME</a>
                    <a href="#about" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">ABOUT</a>
                </div>

                <div className="flex-shrink-0 flex justify-center items-center relative z-50">
                    {/* THE FIX: Added onClick={scrollToTop} to the logo as well */}
                    <img
                        src="/logo.webp"
                        fetchpriority="high"
                        alt="Quizzitch Cup Logo"
                        onClick={scrollToTop}
                        className="w-40 h-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] cursor-pointer hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="flex-1 flex justify-start space-x-8 pl-6 md:pl-10">
                    <a href="#events" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">EVENTS</a>
                    <a href="#sponsors" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">SPONSORS</a>
                </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden relative p-4 flex justify-between items-center">
                <img
                    src="/logo.webp"
                    fetchpriority="high"
                    alt="Menu Toggle"
                    className="w-24 h-auto cursor-pointer relative z-50 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />

                <div className={`absolute top-24 left-4 flex flex-col space-y-6 bg-[#070B14]/90 backdrop-blur-xl border border-[#D4AF37]/40 rounded-xl p-8 transition-all duration-300 origin-top-left shadow-[0_0_30px_rgba(0,0,0,0.8)] ${isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                    {/* THE FIX: Added onClick={scrollToTop} */}
                    <a href="#home" onClick={scrollToTop} className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider">HOME</a>

                    <a href="#about" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
                    <a href="#events" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>EVENTS</a>
                    <a href="#sponsors" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>SPONSORS</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
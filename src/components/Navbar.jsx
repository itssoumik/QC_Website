import React, { useState } from 'react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100]">
            {/* Desktop View: Ultra-Tight Symmetrical Split Menu */}
            {/* Changed pt-4 to pt-2 to move the entire navbar right against the top edge */}
            <div className="hidden md:flex w-full items-center justify-between px-8 pt-2">

                {/* Left Links - Using flex-1 to stretch and push links tight against the logo */}
                <div className="flex-1 flex justify-end space-x-8 pr-6 md:pr-10">
                    <a href="#home" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">HOME</a>
                    <a href="#about" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">ABOUT</a>
                </div>

                {/* Center Logo - flex-shrink-0 ensures the container shrinks exactly to the 40w image size */}
                <div className="flex-shrink-0 flex justify-center items-center relative z-50">
                    <img src="/logo.png" alt="Quizzitch Cup Logo" className="w-40 h-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.6)] cursor-pointer hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Right Links - Using flex-1 to stretch and push links tight against the logo */}
                <div className="flex-1 flex justify-start space-x-8 pl-6 md:pl-10">
                    <a href="#event" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">EVENTS</a>
                    <a href="#sponsors" className="text-[#D4AF37] font-serif font-bold text-2xl tracking-widest hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 drop-shadow-md">SPONSORS</a>
                </div>
            </div>

            {/* Mobile View: Logo Top Left acting as Hamburger */}
            <div className="md:hidden relative p-4 flex justify-between items-center">
                <img
                    src="/logo.png"
                    alt="Menu Toggle"
                    className="w-24 h-auto cursor-pointer relative z-50 drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />

                {/* Mobile Dropdown Menu */}
                <div className={`absolute top-24 left-4 flex flex-col space-y-6 bg-[#070B14]/90 backdrop-blur-xl border border-[#D4AF37]/40 rounded-xl p-8 transition-all duration-300 origin-top-left shadow-[0_0_30px_rgba(0,0,0,0.8)] ${isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                    <a href="#home" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>HOME</a>
                    <a href="#about" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>ABOUT</a>
                    <a href="#event" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>EVENTS</a>
                    <a href="#sponsors" className="text-[#D4AF37] font-serif font-bold text-xl tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>SPONSORS</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
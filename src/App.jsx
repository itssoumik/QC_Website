import React from 'react';
import HeroParallax from './components/HeroParallax';
import Navbar from './components/Navbar';
import About from './components/About';
import Events from './components/Events';
import Sponsors from './components/Sponsors';

const App = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white">

      {/* Fixed Navigation */}
      <Navbar />

      {/* THE FIX: We trap the entire Hero inside a strict z-50 stacking context. 
          This forces the GSAP pin-spacer to render OVER the About section, 
          allowing your clouds to bleed seamlessly into the black void. */}
      <div className="relative z-50">
        <HeroParallax />
      </div>

      {/* The Pensieve Memory Gallery (Pitch Black Background) */}
      <About />

      <Events />

      <Sponsors />

    </main>
  );
};

export default App;
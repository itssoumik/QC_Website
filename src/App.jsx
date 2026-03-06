import React from 'react';
import HeroParallax from './components/HeroParallax';
import Navbar from './components/Navbar';
import About from './components/About';

const App = () => {
  return (
    // Removed the overflow-x-hidden class so 'sticky' works again!
    <main className="relative w-full min-h-screen bg-black text-white">

      {/* Fixed Navigation */}
      <Navbar />

      {/* The Hero Section (Handles the Sky -> Black Transition) */}
      <HeroParallax />

      {/* The Pensieve Memory Gallery (Pitch Black Background) */}
      <About />

      {/* The Void*/}
      <section className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center bg-black pt-40">
        <h2 className="text-[#D4AF37] opacity-20 text-4xl font-serif uppercase tracking-widest text-center">
          MEOW MEOW MEOW
        </h2>
      </section>

    </main>
  );
};

export default App;
import React from 'react';
import HeroParallax from './components/HeroParallax';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <Navbar />

      {/* The Pinned Hero Section */}
      <HeroParallax />

      {/* The Infinite Sky Transition Section */}
      <section
        className="relative z-10 w-full min-h-[300vh] flex flex-col items-center pt-40"
        style={{
          backgroundImage: `url('/infinite-sky.png')`,
          backgroundRepeat: 'repeat-y',
          backgroundSize: '100% auto',
          backgroundPosition: 'top center',
          backgroundColor: '#070B14'
        }}
      >
        {/* THE REVERSE FADE: Melts the solid #0B1A30 from the Hero's bottom seamlessly into the infinite sky image */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#0B1A30] to-transparent pointer-events-none"></div>

        {/* Temporary Content to test the readability against the clouds */}
        <div className="relative z-20 text-center mt-32 px-4">
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-widest uppercase mb-6 text-magic-glow">
            The Infinite Sky
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-xl leading-relaxed bg-black/40 p-6 rounded-xl backdrop-blur-sm">
            Scroll down. The background should tile infinitely without any visible horizontal seams. Notice how this text card requires a dark, blurred background to remain readable against the cloud textures.
          </p>
        </div>
      </section>
    </main>
  );
};

export default App;

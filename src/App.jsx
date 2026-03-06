import React from 'react';
import HeroParallax from './components/HeroParallax';
import Navbar from './components/Navbar';
import About from './components/About';

const App = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white">
      {/* Fixed Navigation */}
      <Navbar />

      {/* The Pinned Hero Section */}
      <HeroParallax />

      {/* The Pensieve Memory Gallery */}
      <About />

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

      </section>
    </main>
  );
};

export default App;

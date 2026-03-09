import React from 'react';
import HeroParallax from './components/HeroParallax';
import Navbar from './components/Navbar';
import About from './components/About';
import Events from './components/Events';
import Sponsors from './components/Sponsors';

const App = () => {
  return (
    <main className="relative w-full min-h-screen bg-black text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero wrapper — z-50 keeps the pin-spacer above About */}
      <div className="relative z-50">
        <HeroParallax />
      </div>


      <About />

      <Events />

      <Sponsors />

    </main>
  );
};

export default App;
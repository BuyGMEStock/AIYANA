import React, { useState } from 'react';
import PianoKeys from '../components/PianoKeys';
import ContactModal from '../components/ContactModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="container mx-auto px-4">
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-serif mb-8 text-center">AIYANA</h1>
        <div className="w-full max-w-5xl">
          <PianoKeys />
        </div>
        <div className="absolute bottom-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-black text-white font-serif text-xl border border-white/20 
                     hover:animate-border-glow transition-all duration-300 rounded-lg
                     transform hover:scale-105"
          >
            Book the magic
          </button>
        </div>
      </div>
      <ContactModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}

export default Home;
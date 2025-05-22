import React, { useState, useEffect } from 'react';
import { useDeviceDetect } from '../hooks/useDeviceDetect';

const notes = [
  { note: 'A', text: 'Sound begins here' },
  { note: 'B', text: 'Book the magic' },
  { note: 'C', text: 'Notes find light' },
  { note: 'E', text: 'Fire in silence' },
  { note: 'D', text: 'Stage becomes soul' },
  { note: 'C', text: 'Music meets you' },
  { note: 'B', text: 'Book the magic' },
];

const PianoKeys = () => {
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    // Create AudioContext on component mount
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(context);

    // Cleanup on unmount
    return () => {
      if (context) {
        context.close();
      }
    };
  }, []);

  const playNote = async (frequency: number) => {
    if (!audioContext || !hasInteracted) return;

    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
    } catch (error) {
      console.error('Error playing note:', error);
    }
  };

  const getNoteFrequency = (note: string): number => {
    const frequencies: { [key: string]: number } = {
      'A': 220.00,  // A3
      'B': 246.94,  // B3
      'C': 261.63,  // C4
      'D': 293.66,  // D4
      'E': 329.63,  // E4
    };
    return frequencies[note] || 440;
  };

  const handleInteraction = () => {
    if (!hasInteracted && audioContext) {
      setHasInteracted(true);
      audioContext.resume();
    }
  };

  const formatMobileText = (text: string) => {
    return text.split(' ').map((word, i) => (
      <React.Fragment key={i}>
        {word.charAt(0).toUpperCase() + word.slice(1)}
        {i < text.split(' ').length - 1 && (
          <span className="inline-block mx-1">•</span>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className="relative" onClick={handleInteraction}>
      <div className="flex">
        {notes.map((note, index) => (
          <div
            key={index}
            className="relative flex-1"
            onMouseEnter={() => {
              setActiveKey(index);
              playNote(getNoteFrequency(note.note));
            }}
            onMouseLeave={() => setActiveKey(null)}
          >
            <div className={`
              h-[calc(100vh-200px)] 
              border-l border-gray-800
              transition-colors duration-300
              ${activeKey === index ? 'bg-gray-800' : 'bg-white'}
              ${index === notes.length - 1 ? 'border-r' : ''}
              cursor-pointer
            `}>
              {activeKey === index && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full px-4">
                  <p className={`
                    text-lg font-serif 
                    ${activeKey === index ? 'text-white' : 'text-black'}
                    ${isMobile ? 'tracking-wide' : ''}
                    md:text-lg 
                    sm:text-sm 
                    xs:text-xs
                    whitespace-normal
                    break-words
                    max-w-[90%]
                    mx-auto
                    leading-tight
                  `}>
                    {isMobile ? formatMobileText(note.text) : note.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PianoKeys;
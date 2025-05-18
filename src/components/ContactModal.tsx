import React, { useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const form = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm('service_327qz8g', 'template_i61bcqu', form.current, 'ZoNR1cGp0SWlmUfWo')
        .then((result) => {
          console.log('Success:', result.text);
          alert('Message sent successfully!');
          onClose();
          if (form.current) form.current.reset();
        }, (error) => {
          console.error('Error:', error.text);
          alert('Failed to send message. Please try again.');
        });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className="bg-black w-full max-w-lg rounded-t-3xl border border-white/20 p-8 transform transition-transform duration-500 ease-out animate-slide-up"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Book the magic</h2>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
        
        <form ref={form} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="user_name"
              placeholder="your name"
              required
              className="w-full bg-transparent border-b border-white/20 py-2 px-0 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors font-serif"
            />
          </div>
          
          <div>
            <input
              type="email"
              name="user_email"
              placeholder="your email"
              required
              className="w-full bg-transparent border-b border-white/20 py-2 px-0 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors font-serif"
            />
          </div>
          
          <div>
            <textarea
              name="message"
              placeholder="your message"
              rows={4}
              required
              className="w-full bg-transparent border-b border-white/20 py-2 px-0 text-white placeholder-white/40 focus:outline-none focus:border-white transition-colors font-serif resize-none"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 border border-white/20 text-white font-serif hover:border-white transition-colors rounded-lg"
          >
            send message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal; 
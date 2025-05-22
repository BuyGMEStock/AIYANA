import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import anthemBackground from '../../project/src/assets/backgrounds/Anthem_Picture.jpg';
import restaurantBackground from '../../project/src/assets/backgrounds/Restaurant_Picture.jpg';
import privateEventBackground from '../../project/src/assets/backgrounds/PrivateEvent_Picture.jpg';
import studioBackground from '../../project/src/assets/backgrounds/Studio_Picture.jpg';

// Initialize EmailJS
emailjs.init('ZoNR1cGp0SWlmUfWo');

const services = [
  {
    title: "Anthems",
    description: "Custom compositions for organizations, events, and special occasions. Each anthem is crafted to embody your values and vision.",
    image: anthemBackground
  },
  {
    title: "Restaurant Ambiance",
    description: "Elevate your dining experience with sophisticated piano performances. Creating the perfect atmosphere for your establishment.",
    image: restaurantBackground
  },
  {
    title: "Private Events",
    description: "Bespoke musical experiences for weddings, corporate gatherings, and exclusive celebrations.",
    image: privateEventBackground
  },
  {
    title: "Studio Releases",
    description: "Available on Spotify",
    image: studioBackground
  }
];

// Add this component at the top of your file
const DashedArrow = () => (
  <div className="absolute right-24 top-0 h-screen pointer-events-none">
    <svg className="h-full w-20">
      <path
        d="M10,90% L10,10%"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="10,10"
        fill="none"
        className="animate-dash opacity-60"
      />
      <path
        d="M0,10% L10,5% L20,10%"
        stroke="white"
        strokeWidth="2"
        fill="none"
        className="opacity-60"
      />
      <text
        x="30"
        y="50%"
        fill="white"
        className="text-sm opacity-60"
        style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
      >
        Now on Spotify
      </text>
    </svg>
  </div>
);

// Add these styles to your global CSS or Tailwind config
const styles = `
  @keyframes dash {
    to {
      stroke-dashoffset: 100;
    }
  }
  .animate-dash {
    animation: dash 20s linear infinite;
  }
`;

function Commission() {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.current) {
      emailjs.sendForm('service_327qz8g', 'template_i61bcqu', form.current, 'ZoNR1cGp0SWlmUfWo')
        .then((result) => {
          console.log('Success:', result.text);
          alert('Message sent successfully!');
          if (form.current) form.current.reset();
        }, (error) => {
          console.error('Error details:', error);
          alert(`Failed to send message: ${error.text}`);
        });
    }
  };

  return (
    <div className="w-full">
      {services.map((service, index) => {
        const { ref, inView } = useInView({
          threshold: 0.3,
          triggerOnce: false
        });

        return (
          <section
            key={index}
            ref={ref}
            className="relative h-screen w-full overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-no-repeat scale-110"
              style={{ 
                backgroundImage: `url(${service.image})`,
                transform: `scale(${inView ? 1.1 : 1.2})`,
                opacity: inView ? 1 : 0.5,
                transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                backgroundPosition: index === 0 ? 'center 25%' : 
                                  index === 2 ? 'center 60%' : 
                                  index === 3 ? 'center 35%' : 
                                  'center',
                backgroundSize: index === 3 ? 'contain' : 'cover',
                backgroundColor: index === 3 ? 'black' : 'transparent',
                backgroundRepeat: index === 3 ? 'no-repeat' : 'no-repeat'
              }}
            >
              <div 
                className="absolute inset-0 bg-black"
                style={{
                  opacity: inView ? 0.4 : 0.7,
                  transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
              {/* Add the arrow only to the Studio Sessions section */}
              {index === 3 && inView && <DashedArrow />}
            </div>
            
            <div 
              className={`relative h-full flex flex-col items-center ${
                index === 3 ? 'justify-end pb-32' : 'justify-center'
              } text-white p-8`}
              style={{
                transform: `translateY(${inView ? '0' : '30px'})`,
                opacity: inView ? 1 : 0,
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <h2 
                className="text-7xl font-serif mb-6 text-center"
                style={{
                  transform: `translateY(${inView ? '0' : '20px'})`,
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                }}
              >
                {service.title}
              </h2>
              <p 
                className="text-xl max-w-2xl text-center font-serif"
                style={{
                  transform: `translateY(${inView ? '0' : '30px'})`,
                  transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
                }}
              >
                {service.description}
              </p>
            </div>
          </section>
        );
      })}

      <section className="relative bg-black px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 text-center text-white">Get in Touch</h2>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <input 
              type="text" 
              name="user_name"
              placeholder="Your Name" 
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required 
            />
            <input 
              type="email" 
              name="user_email"
              placeholder="Your Email" 
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              required 
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded h-32"
              required 
            />
            <button 
              type="submit"
              className="w-full p-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Commission;
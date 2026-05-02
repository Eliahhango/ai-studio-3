import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import SessionButton from './components/SessionButton';
import QuoteDisplay from './components/QuoteDisplay';
import MusicPlayer from './components/MusicPlayer';

const sessionLinks = [
  { label: "SESSION-1", href: "#link1" },
  { label: "SESSION-2", href: "#link2" },
  { label: "SESSION-3", href: "#link3" },
  { label: "SESSION-4", href: "#link4" },
];

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author: "Albert Einstein" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" }
];


const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.2
    }
  }
};

const App: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    const handleFirstScroll = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(error => {
          console.warn("Audio playback on scroll was prevented by the browser:", error);
        });
      }
      // Remove listener after first trigger
      window.removeEventListener('scroll', handleFirstScroll);
    };

    window.addEventListener('scroll', handleFirstScroll);

    return () => {
      window.removeEventListener('scroll', handleFirstScroll);
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-transparent font-sans text-gray-100">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 z-10">
        <div className="w-full max-w-2xl text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            CodeskyTz pairing site
          </motion.h1>

          <QuoteDisplay quote={quotes[currentQuoteIndex]} />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={buttonContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {sessionLinks.map((link) => (
              <SessionButton key={link.href} href={link.href}>
                {link.label}
              </SessionButton>
            ))}
          </motion.div>
        </div>
      </main>
      <MusicPlayer audioRef={audioRef} />
      <Footer />
    </div>
  );
};

export default App;
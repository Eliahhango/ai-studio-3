import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface SessionButtonProps {
  href: string;
  children: React.ReactNode;
}

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 14 }
  },
};

const Spinner: React.FC = () => (
  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const SessionButton: React.FC<SessionButtonProps> = ({ href, children }) => {
  const [clickState, setClickState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (clickState !== 'idle') {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    setClickState('loading');

    // 1. Show spinner for a moment
    setTimeout(() => {
      setClickState('success');
      
      // 2. Show success confirmation, then navigate
      setTimeout(() => {
        window.location.href = href;
      }, 400); // Show checkmark for 400ms

    }, 1100); // Show spinner for 1100ms
  };
  
  const isBusy = clickState !== 'idle';

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      variants={buttonVariants}
      whileHover={!isBusy ? { 
        scale: 1.05,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 0 25px rgba(99, 102, 241, 0.5)'
      } : {}}
      whileTap={!isBusy ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      aria-disabled={isBusy}
      aria-busy={isBusy}
      className={`
        flex items-center justify-center w-full text-center px-8 py-6 bg-white/10 backdrop-blur-md 
        text-white font-bold text-xl rounded-2xl border border-white/20 
        shadow-lg transition-all duration-300 focus:outline-none 
        focus:ring-4 focus:ring-cyan-400 focus:border-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-950
        ${isBusy 
          ? 'cursor-not-allowed opacity-90' 
          : 'active:bg-white/25'
        }
        ${clickState === 'success' ? '!bg-green-500/40 !border-green-400/50' : ''}
      `}
    >
      {clickState === 'loading' && <Spinner />}
      {clickState === 'success' && <CheckIcon />}
      {clickState === 'idle' && children}
    </motion.a>
  );
};

export default SessionButton;
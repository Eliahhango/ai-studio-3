import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Quote {
  text: string;
  author: string;
}

interface QuoteDisplayProps {
  quote: Quote;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] }, // Corrected easing value
  },
};


const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  return (
    <div className="h-28 sm:h-24 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.text} // The key is crucial for AnimatePresence to detect changes
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-center px-4"
        >
          <motion.blockquote
            variants={itemVariants}
            className="text-lg md:text-xl italic text-gray-300"
          >
            "{quote.text}"
          </motion.blockquote>
          <motion.cite
            variants={itemVariants}
            className="block text-base text-cyan-400 mt-2 not-italic"
          >
            — {quote.author}
          </motion.cite>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuoteDisplay;
import React from 'react';
import { motion } from 'framer-motion';

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  }
};


const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full p-4 sm:p-6 z-20">
      <motion.div
        className="container mx-auto flex items-center"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center gap-3"
          variants={itemVariants}
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full border-2 border-gray-500 flex-shrink-0"></div>
          <span className="font-bold text-lg hidden sm:block text-gray-200">Codesky Tz Bot</span>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;
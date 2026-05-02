import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GithubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-300">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const Footer: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);
    const repoUrl = 'https://github.com/codeskytz/codeskytz-md';

    const handleCopyClick = () => {
        if (isCopied) return;
        navigator.clipboard.writeText(repoUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

  return (
    <footer className="w-full p-4 sm:p-6 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left text-sm text-gray-400">
          Powered by Codesky Tz
        </p>
        <div className="flex items-center gap-3">
            <motion.a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-full shadow-lg shadow-indigo-500/30 transition-shadow duration-300 ease-in-out hover:shadow-xl hover:shadow-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-950"
            >
              <GithubIcon />
              <span className="hidden sm:inline">Git Repo (codeskytz/codeskytz-md)</span>
              <span className="sm:hidden">GitHub</span>
            </motion.a>
            <motion.button
                onClick={handleCopyClick}
                aria-label={isCopied ? "URL Copied!" : "Copy repository URL"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative flex items-center justify-center w-10 h-10 bg-gray-700/50 backdrop-blur-md border border-white/20 text-white rounded-full transition-colors duration-300 ease-in-out hover:bg-gray-600/70 focus:outline-none focus:ring-4 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-gray-950"
                title={isCopied ? "Copied!" : "Copy URL"}
            >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
            </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
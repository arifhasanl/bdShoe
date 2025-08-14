import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
  }),
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedTextCharacter = ({ text, className }) => {
  return (
    <motion.h1
      style={{ overflow: 'hidden', display: 'flex', flexWrap: 'wrap' }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} style={{ marginRight: '0.5em' }}>
          {word.split('').map((character, charIndex) => (
            <motion.span key={charIndex} style={{ display: 'inline-block' }} variants={child}>
              {character}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
};

export default AnimatedTextCharacter;
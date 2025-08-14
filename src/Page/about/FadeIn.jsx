import React from 'react';
import { motion } from 'framer-motion';

const FadeIn = ({ children, delay, direction, fullWidth, padding }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay || 0.2,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // অ্যানিমেশনটি একবারই হবে
      className={`${fullWidth ? 'w-full' : ''} ${padding ? 'p-4' : ''}`}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
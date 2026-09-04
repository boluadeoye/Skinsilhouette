import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -25,
    scale: 0.98,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%", display: "flex", flexDirection: "column", flex: "1" }} // Dynamic flex stretch integration
    >
      {children}
    </motion.div>
  );
}

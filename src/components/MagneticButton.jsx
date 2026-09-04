import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { universalTouchSquash } from '../utils/motion.js';

export default function MagneticButton({ children, className = "", onClick, href, target, rel, strength = 30 }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((clientX - (left + width / 2)) / (width / 2)) * strength;
    const y = ((clientY - (top + height / 2)) / (height / 2)) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isAnchor = Boolean(href);
  const MotionComponent = isAnchor ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 380, damping: 18, mass: 0.45 }}
      whileTap={universalTouchSquash}
      style={{ willChange: "transform", display: "inline-flex" }}
    >
      {children}
    </MotionComponent>
  );
}

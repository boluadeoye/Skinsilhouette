import React from 'react';
import { motion } from 'framer-motion';
import { wordRevealContainer, wordRevealItem } from '../utils/motion.js';

export default function KineticText({ text, className = "", tag: Tag = "h2", delay = 0 }) {
  if (!text) return null;
  const words = text.split(" ");

  return (
    <Tag className={className} style={{ perspective: "1200px" }}>
      <motion.span
        className="kinetic-text-wrapper"
        variants={wordRevealContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        custom={delay}
        style={{ display: "inline-block" }}
      >
        {words.map((word, idx) => (
          <span key={idx} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.28em" }}>
            <motion.span
              variants={wordRevealItem}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {word === "<br />" ? <br /> : word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

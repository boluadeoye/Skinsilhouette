import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import { CLINIC_CONTENT } from '../data/content.js';
import './AboutSnippet.css';

export default function AboutSnippet() {
  return (
    <section className="about-pod-section">
      <div className="container">
        <motion.div 
          className="about-floating-pod"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        >
          <div className="about-pod-badge-wrap">
            <span className="about-pod-badge">&bull; About</span>
          </div>

          <KineticText 
            text="Personalised Care. Clinically Led."
            className="about-pod-title"
            tag="h2"
          />

          {/* VERBATIM CONCISE PARAGRAPH */}
          <p className="about-pod-desc">
            {CLINIC_CONTENT.about.concise}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

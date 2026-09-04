import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton.jsx';
import './CtaBanner.css';

export default function CtaBanner() {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <motion.div 
          className="cta-banner-card-light"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: "3.25rem" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="cta-text">
            <h2 className="cta-heading">
              Planning Your Next<br />Brand Activation?
            </h2>
            <p className="cta-subtext">
              Tell us and we'll help you turn the idea into a memorable brand experience.
            </p>
          </div>
          <div className="cta-action">
            <MagneticButton
              href="https://wa.me/2348140000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-black"
              strength={20}
            >
              Book a consultation
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

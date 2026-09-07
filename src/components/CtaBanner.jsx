import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton.jsx';
import { BOOKING_URL } from '../data/content.js';
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
            {/* CLINICAL LUXURY HEADLINE */}
            <h2 className="cta-heading">
              Ready to Begin Your<br />Skin Journey?
            </h2>
            {/* BESPOKE CLINICAL SUBTEXT */}
            <p className="cta-subtext">
              Book a comprehensive consultation with our nurse-led clinic for an individualised, evidence-based treatment plan tailored to you.
            </p>
          </div>
          <div className="cta-action">
            <MagneticButton
              href={BOOKING_URL}
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

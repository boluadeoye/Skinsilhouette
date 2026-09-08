import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import MagneticButton from './MagneticButton.jsx';
import { ArrowRightIcon } from './Icons.jsx';
import { BOOKING_URL } from '../data/content.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="luxury-hero">
      <div className="container">
        <div className="luxury-hero-content">
          <KineticText 
            text="Clinical Aesthetics, Tailored to You." 
            className="luxury-hero-title"
            tag="h1"
          />

          <motion.p 
            className="luxury-hero-sub"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 15, delay: 0.35 }}
          >
            Nurse-led, evidence-based skin, regenerative and injectable treatments tailored to your individual needs.
          </motion.p>

          <motion.div 
            className="luxury-hero-btns"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.5 }}
          >
            <MagneticButton href="#services" className="btn-luxury-white" strength={20}>
              <span>Explore Treatments</span>
              <ArrowRightIcon size={14} color="currentColor" />
            </MagneticButton>
            <MagneticButton 
              href={BOOKING_URL}
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-luxury-outline"
              strength={20}
            >
              Book a Consultation
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import MagneticButton from './MagneticButton.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './AvailableTreatments.css';

export default function AvailableTreatments() {
  return (
    <section className="available-treatments-section" id="services">
      <div className="container">
        
        {/* UPDATED SECTION TITLE: "Our Treatments" */}
        <div className="editorial-section-head">
          <span className="editorial-section-badge">CLINICAL SELECTION</span>
          <KineticText text="Our Treatments" tag="h2" />
          <p>Bespoke aesthetic and regenerative procedures tailored to enhance your natural features.</p>
        </div>

        <div className="available-asym-layout">
          
          {/* CARD 1: MALE PROCEDURE SHOT (PROMINENT TITLE OVERLAY + NO EMOJIS) */}
          <motion.div 
            className="available-card-large" 
            whileTap={universalTouchSquash}
          >
            <div className="dark-foreground-overlay"></div>
            <img src={ASSETS.available_1} alt="Regenerative Injectables Procedure" loading="lazy" />
            
            <div className="card-content-top">
              <span className="card-tag">INJECTABLES</span>
              <h3 className="card-title">Regenerative Injectables</h3>
            </div>
            
            <div className="card-content-bottom">
              <a href="https://wa.me/2348140000000" target="_blank" rel="noopener noreferrer" className="book-link">
                <span>BOOK NOW</span>
                <ArrowUpRightIcon size={12} color="#FFFFFF" />
              </a>
            </div>
          </motion.div>

          <div className="available-right-stack">
            
            {/* CARD 2 */}
            <motion.div className="available-card-small" whileTap={universalTouchSquash}>
              <img src={ASSETS.available_2} alt="Skin Remodelling Treatments" loading="lazy" />
              <div className="card-overlay-content">
                <span className="card-tag">TREATMENTS</span>
                <h3 className="card-title-small">Skin Remodelling Treatments</h3>
                <a href="/services/hydrofacial" className="book-link">
                  <span>BOOK NOW</span>
                  <ArrowUpRightIcon size={12} color="#FFFFFF" />
                </a>
              </div>
            </motion.div>

            {/* CARD 3: ANTI-WRINKLE TREATMENTS (HYPHENATED & PLURAL) */}
            <motion.div className="available-card-small" whileTap={universalTouchSquash}>
              <img src={ASSETS.available_3} alt="Anti-Wrinkle Treatments" loading="lazy" />
              <div className="card-overlay-content">
                <span className="card-tag">TREATMENTS</span>
                <h3 className="card-title-small">Anti-Wrinkle Treatments</h3>
                <a href="https://wa.me/2348140000000" target="_blank" rel="noopener noreferrer" className="book-link">
                  <span>BOOK NOW</span>
                  <ArrowUpRightIcon size={12} color="#FFFFFF" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        <div className="available-cta-wrap">
          <MagneticButton href="/services" className="btn-black-center" strength={25}>
            View All Services
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

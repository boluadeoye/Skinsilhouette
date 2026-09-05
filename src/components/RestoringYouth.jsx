import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../assets.js';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './RestoringYouth.css';

export default function RestoringYouth({ customImage }) {
  const activeSrc = customImage || ASSETS.ry_home;

  return (
    <section className="ry-boundary-section">
      <div className="container">
        <div className="ry-grid-master">
          
          {/* SLIM SHARP BLACK CARD */}
          <div className="ry-dark-card">
            <div className="ry-content-inner">
              <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
              
              {/* UPDATED HEADING */}
              <h2 className="ry-title">
                Your Treatment Begins<br />With a Consultation.
              </h2>
              
              {/* UPDATED SUBTEXT DIRECTIVE */}
              <p className="ry-desc">
                Individualised recommendations. Evidence-led treatment. No pressure.
              </p>
              
              {/* METRIC: 50+ PATIENTS TREATED */}
              <div className="ry-metrics-row">
                <div className="ry-metric">
                  <h3>50+</h3>
                  <p>PATIENTS TREATED</p>
                </div>
                <div className="ry-metric">
                  <h3>5.0</h3>
                  <p>STAR REVIEWS</p>
                </div>
              </div>

              {/* ACTION: BOOK CONSULTATION LINKING TO FACES CONSENT */}
              <div className="ry-btn-wrap">
                <motion.a 
                  href={BOOKING_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ry-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={universalTouchSquash}
                >
                  Book Consultation
                </motion.a>
              </div>
            </div>
          </div>

          {/* TALL BREAKOUT MEDIA COLUMN */}
          <div className="ry-media-col">
            <div className="ry-image-frame">
              <img 
                src={activeSrc} 
                alt="Skin Silhouette Aesthetics Clinical Excellence" 
                className="ry-fused-img"
                loading="lazy" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

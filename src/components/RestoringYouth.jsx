import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '../assets.js';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './RestoringYouth.css';

export default function RestoringYouth({ customImage }) {
  const activeSrc = customImage || ASSETS.ry_home || "https://res.cloudinary.com/dwbjb3svx/image/upload/v1788514772/blog_assets/qw97siv6ch1iiy2oqonp.jpg";

  return (
    <section className="ry-boundary-section">
      <div className="container">
        <div className="ry-grid-master">
          
          {/* SLIM SHARP BLACK CARD */}
          <div className="ry-dark-card">
            <div className="ry-content-inner">
              <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
              
              <h2 className="ry-title">
                Your Treatment Begins<br />With a Consultation.
              </h2>
              
              <p className="ry-desc">
                Individualised recommendations. Evidence-led treatment. No pressure.
              </p>
              
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

          {/* TALL OVERLAPPING MEDIA BREAKOUT (SINGLE PHOTO - ZERO PIP INSETS) [1] */}
          <div className="ry-media-col">
            <div className="ry-image-frame">
              <img 
                src={activeSrc} 
                alt="Skin Silhouette Aesthetics Official Treatment Experience" 
                className="ry-single-img"
                loading="lazy" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

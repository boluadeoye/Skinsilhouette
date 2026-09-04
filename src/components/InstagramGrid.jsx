import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import { CameraIcon } from './Icons.jsx';
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './InstagramGrid.css';

export default function InstagramGrid() {
  return (
    <section className="social-journey-section">
      <div className="container">
        
        <div className="social-journey-head">
          <KineticText text="Follow Our Beauty Journey" tag="h2" />
          <motion.p 
            className="social-handle-badge"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* IMMUNIZED VECTOR CAMERA ICON (NO EMOJI) */}
            <CameraIcon size={14} color="var(--primary-gold)" />
            <span>@skinsilhouette</span>
          </motion.p>
        </div>

        <motion.div 
          className="social-dual-frame"
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
        >
          <motion.div className="social-feature-card" whileHover={{ scale: 1.03 }} whileTap={universalTouchSquash}>
            <img src={ASSETS.social_1} alt="Clinical Treatment Action" loading="lazy" />
          </motion.div>
          <motion.div className="social-feature-card" whileHover={{ scale: 1.03 }} whileTap={universalTouchSquash}>
            <img src={ASSETS.social_2} alt="Clinical Treatment Detail" loading="lazy" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

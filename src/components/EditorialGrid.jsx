import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton.jsx';
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './EditorialGrid.css';

export default function EditorialGrid() {
  return (
    <section className="editorial-grid-section">
      <div className="container">
        <div className="editorial-asym-layout">
          
          <motion.div 
            className="editorial-card-large"
            initial={{ opacity: 0, x: -70, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            whileHover={{ scale: 1.02 }}
            whileTap={universalTouchSquash}
          >
            <img src={ASSETS.editorial_main} alt="5 Tips to Look Younger" loading="lazy" />
            <div className="editorial-glass-overlay">
              <h3>5 Tips on How to Look Younger than Your Age</h3>
            </div>
          </motion.div>

          <div className="editorial-right-stack">
            <motion.div 
              className="editorial-card-small"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 160, damping: 15, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={universalTouchSquash}
            >
              <img src={ASSETS.editorial_top} alt="How to Care For Your Skin" loading="lazy" />
              <div className="editorial-glass-overlay">
                <h3>How To Care For Your Skin After Aesthetic Procedures</h3>
              </div>
            </motion.div>

            <motion.div 
              className="editorial-card-small"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 160, damping: 15, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={universalTouchSquash}
            >
              <img src={ASSETS.editorial_bot} alt="Lip Fillers Guide" loading="lazy" />
              <div className="editorial-glass-overlay">
                <h3>Lip Fillers: the Best Drugs and Brands</h3>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="editorial-cta-row">
          <MagneticButton href="/blog" className="btn-editorial-all" strength={25}>
            View All Blogs
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { CLINIC_CONTENT } from '../data/content.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './StatsBar.css';

const STAT_ICONS = [
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
  </svg>,
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>,
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
  </svg>,
  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  </svg>
];

export default function StatsBar({ variant }) {
  const isDark = variant === "dark" || variant === "hydro-stats-ribbon";
  const statsList = CLINIC_CONTENT.stats;

  return (
    <section className={`stats-floating-section ${isDark ? 'dark hydro-stats-ribbon' : 'light'}`}>
      <div className="container">
        <motion.div 
          className="stats-floating-grid"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {statsList.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="stat-floating-card"
              variants={staggerCardExtreme}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={universalTouchSquash}
              style={{ cursor: 'pointer' }}
            >
              <div className="stat-floating-icon">{STAT_ICONS[idx]}</div>
              <h3 className="stat-floating-num">{stat.number}</h3>
              <p className="stat-floating-desc">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

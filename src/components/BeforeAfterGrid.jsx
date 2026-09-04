import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import { ASSETS } from '../assets.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './BeforeAfterGrid.css';

const RESULTS_DATA = [
  { id: 1, image: ASSETS.results_1, alt: "Clinical Result 1" },
  { id: 2, image: ASSETS.results_2, alt: "Clinical Result 2" },
  { id: 3, image: ASSETS.results_3, alt: "Clinical Result 3" },
  { id: 4, image: ASSETS.results_4, alt: "Clinical Result 4" }
];

function InteractiveResultCard({ item }) {
  const [swapped, setSwapped] = useState(false);

  return (
    <motion.div
      className="results-pure-card"
      variants={staggerCardExtreme}
      whileHover={{ scale: 1.04, y: -6 }}
      whileTap={universalTouchSquash}
      onClick={() => setSwapped(!swapped)}
      style={{ cursor: 'pointer' }}
      role="button"
      aria-label="Click to swap before and after view"
    >
      {/* MAIN BACKGROUND (AFTER DEFAULT / BEFORE ON SWAP) */}
      <div className="results-pip-bg">
        <img
          src={item.image}
          alt={swapped ? "Before Result" : "After Result"}
          className={`results-fused-img ${swapped ? 'results-img-left' : 'results-img-right'}`}
          loading="lazy"
        />
        <span className="card-badge badge-after">{swapped ? 'BEFORE' : 'AFTER'}</span>
      </div>

      {/* INSET BOX (BEFORE DEFAULT / AFTER ON SWAP) */}
      <div className="results-pip-inset">
        <img
          src={item.image}
          alt={swapped ? "After Result" : "Before Result"}
          className={`results-fused-img ${swapped ? 'results-img-right' : 'results-img-left'}`}
          loading="lazy"
        />
        <span className="card-badge badge-before">{swapped ? 'AFTER' : 'BEFORE'}</span>
      </div>

      {/* JUNCTION CORNER BADGE */}
      <div className="card-junction-badge" aria-hidden="true">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
          <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
        </svg>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterGrid({
  title = "Before & After",
  badge = "REAL RESULTS",
  subtitle = "From skin rejuvenation to laser and advanced aesthetic procedures, our approach is personalised and led by our clinical experts."
}) {
  return (
    <section className="real-results-section">
      <div className="container">
        
        <div className="results-header">
          <motion.span 
            className="results-coral-pill"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {badge}
          </motion.span>
          <KineticText text={title} tag="h2" />
          <p>{subtitle}</p>
        </div>

        {/* 4-COLUMN SYMMETRICAL INTERACTIVE PIP GRID */}
        <motion.div
          className="real-results-grid"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {RESULTS_DATA.map((item) => (
            <InteractiveResultCard key={item.id} item={item} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

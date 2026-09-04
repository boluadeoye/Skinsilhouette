import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { ASSETS } from '../assets.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Works.css';

const CATEGORIES = ["All", "Plastic Surgery", "Treatments", "Injectables", "Laser Treatments", "Cosmetology"];

const WORKS_ITEMS = [
  { id: 1, category: "Plastic Surgery", image: ASSETS.works_matrix[0] },
  { id: 2, category: "Treatments", image: ASSETS.works_matrix[1] },
  { id: 3, category: "Injectables", image: ASSETS.works_matrix[2] },
  { id: 4, category: "Laser Treatments", image: ASSETS.works_matrix[3] },
  { id: 5, category: "Cosmetology", image: ASSETS.works_matrix[4] },
  { id: 6, category: "Plastic Surgery", image: ASSETS.works_matrix[5] },
  { id: 7, category: "Treatments", image: ASSETS.works_matrix[6] },
  { id: 8, category: "Injectables", image: ASSETS.works_matrix[7] },
  { id: 9, category: "Laser Treatments", image: ASSETS.works_matrix[8] },
  { id: 10, category: "Cosmetology", image: ASSETS.works_matrix[9] },
  { id: 11, category: "Plastic Surgery", image: ASSETS.works_matrix[10] },
  { id: 12, category: "Treatments", image: ASSETS.works_matrix[11] }
];

/* INTERACTIVE CARD WRAPPED IN ROUTER LINK TO CASE STUDY TEMPLATE */
function InteractiveWorkCard({ item }) {
  return (
    <motion.div 
      key={item.id} 
      className="works-pure-card"
      layout
      variants={staggerCardExtreme}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -8 }}
      whileTap={universalTouchSquash}
    >
      <Link to={`/works/case-study-${item.id}`} className="works-card-nav-link" aria-label={`View Case Study ${item.id}`}>
        {/* MAIN BACKGROUND (AFTER) */}
        <div className="works-matrix-pip-bg">
          <img src={item.image} alt={item.category} className="works-matrix-fused-img works-matrix-img-right" loading="lazy" />
          <span className="works-matrix-badge badge-after">AFTER</span>
        </div>

        {/* INSET CARD (BEFORE) */}
        <div className="works-matrix-pip-inset">
          <img src={item.image} alt={item.category} className="works-matrix-fused-img works-matrix-img-left" loading="lazy" />
          <span className="works-matrix-badge badge-before">BEFORE</span>
        </div>

        {/* JUNCTION BADGE */}
        <div className="works-matrix-junction-badge" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
          </svg>
        </div>

        {/* VIEW CASE STUDY OVERLAY ON HOVER/TAP */}
        <div className="works-card-hover-overlay">
          <span>VIEW CASE STUDY ↗</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [swapped, setSwapped] = useState(false);

  const filteredWorks = activeCategory === "All"
    ? WORKS_ITEMS
    : WORKS_ITEMS.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="works-page-wrapper">
      <section className="works-hero-section">
        <div className="container works-hero-grid">
          <div className="works-hero-text">
            <div className="works-pill-badge">
              <span>&bull; Our Works</span>
            </div>
            <KineticText text="Bespoke Treatments. Natural Results. The Best of You." className="works-hero-title" tag="h1" />
            <p className="works-hero-subtitle">
              Explore our expertly crafted aesthetic vision.
            </p>
          </div>

          <motion.div 
            className="works-hero-featured-image"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
            whileHover={{ scale: 1.02 }}
          >
            <img src={ASSETS.works_hero} alt="Bespoke Clinical Transformation" />
          </motion.div>
        </div>
      </section>

      <section className="works-filter-section">
        <div className="container">
          <div className="works-filter-bar">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                className={`works-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.08 }}
                whileTap={universalTouchSquash}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="works-matrix-section">
        <div className="container">
          <motion.div 
            className="works-matrix-grid"
            layout
            variants={staggerGridContainer}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredWorks.map((item) => (
                <InteractiveWorkCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* RESTORING YOUTH BREAKOUT VARIANT */}
      <section className="works-ry-section">
        <div className="container">
          <div className="works-ry-grid-master">
            <div className="works-ry-dark-card">
              <div className="works-ry-content">
                <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
                <h2 className="ry-title">RESTORING YOUR<br />YOUTH IS ONE<br />CALL AWAY</h2>
                <p className="ry-desc">
                  We make it a priority to not only listen to your story, but to also address any questions or concerns that you may have about the services offered at our clinic.
                </p>
                <div className="ry-metrics-row">
                  <div className="ry-metric"><h3>200+</h3><p>PATIENTS TREATED</p></div>
                  <div className="ry-metric"><h3>5.0</h3><p>STAR REVIEWS</p></div>
                </div>
                <div className="ry-btn-wrap">
                  <a href="https://wa.me/2348140000000" target="_blank" rel="noopener noreferrer" className="btn-ry-white">
                    Book Appointment
                  </a>
                </div>
              </div>
            </div>

            <div 
              className="works-ry-media-col" 
              onClick={() => setSwapped(!swapped)} 
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label="Click to swap before and after views"
            >
              <div className="works-ry-image-frame">
                <div className="works-ry-pip-bg">
                  <img src={ASSETS.ry_works} alt={swapped ? "Before Result" : "After Result"} className={`works-ry-fused-img ${swapped ? 'works-ry-img-left' : 'works-ry-img-right'}`} loading="lazy" />
                  <span className="works-ry-badge works-ry-badge-after">{swapped ? 'BEFORE' : 'AFTER'}</span>
                </div>
                <div className="works-ry-pip-inset">
                  <img src={ASSETS.ry_works} alt={swapped ? "After Result" : "Before Result"} className={`works-ry-fused-img ${swapped ? 'works-ry-img-right' : 'works-ry-img-left'}`} loading="lazy" />
                  <span className="works-ry-badge works-ry-badge-before">{swapped ? 'AFTER' : 'BEFORE'}</span>
                </div>
                <div className="works-ry-junction-badge" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                    <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

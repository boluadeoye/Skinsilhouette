import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { fetchCaseStudies } from '../services/api.js';
import { ASSETS } from '../assets.js';
import { BOOKING_URL } from '../data/content.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Works.css';

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
      <Link to={`/works/${item.slug}`} className="works-card-nav-link" aria-label={`View Case Study ${item.id}`}>
        <div className="works-matrix-pip-bg">
          <img src={item.afterImage || item.image} alt={item.title} className="works-matrix-fused-img works-matrix-img-right" loading="lazy" />
          <span className="works-matrix-badge badge-after">AFTER</span>
        </div>

        {item.beforeImage && (
          <div className="works-matrix-pip-inset">
            <img src={item.beforeImage} alt={item.title} className="works-matrix-fused-img works-matrix-img-left" loading="lazy" />
            <span className="works-matrix-badge badge-before">BEFORE</span>
          </div>
        )}

        <div className="works-matrix-junction-badge" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
          </svg>
        </div>

        <div className="works-card-hover-overlay">
          <span>VIEW CASE STUDY ↗</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Works() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    fetchCaseStudies().then((data) => {
      setCaseStudies(data);
      setLoading(false);
    });
  }, []);

  const dynamicCategories = ["All", ...new Set(caseStudies.map(item => item.category).filter(Boolean))];

  const filteredWorks = activeCategory === "All"
    ? caseStudies
    : caseStudies.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

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

      {/* DYNAMIC CATEGORY FILTER TRACK */}
      <section className="works-filter-section">
        <div className="container">
          <div className="works-filter-bar">
            {dynamicCategories.map((cat) => (
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
          {loading && (
            <div className="works-empty-state">
              <p>Loading case studies from clinic records...</p>
            </div>
          )}

          {!loading && filteredWorks.length === 0 && (
            <div className="works-empty-state">
              <p>No case studies available.</p>
            </div>
          )}

          {!loading && filteredWorks.length > 0 && (
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
          )}
        </div>
      </section>

      <section className="works-ry-section">
        <div className="container">
          <div className="works-ry-grid-master">
            <div className="works-ry-dark-card">
              <div className="works-ry-content">
                <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
                <h2 className="ry-title">Your Treatment Begins<br />With a Consultation.</h2>
                <p className="ry-desc">
                  Individualised recommendations. Evidence-led treatment. No pressure.
                </p>
                <div className="ry-metrics-row">
                  <div className="ry-metric"><h3>50+</h3><p>PATIENTS TREATED</p></div>
                  <div className="ry-metric"><h3>5.0</h3><p>STAR REVIEWS</p></div>
                </div>
                <div className="ry-btn-wrap">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ry-white">
                    Book Consultation
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

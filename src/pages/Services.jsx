import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import Review from '../components/Review.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';
import { fetchTreatments, fetchTreatmentCategories } from '../services/api.js';
import { ASSETS } from '../assets.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Services.css';

export default function Services() {
  const [treatments, setTreatments] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    Promise.all([fetchTreatments(), fetchTreatmentCategories()]).then(([treatmentsData, catsData]) => {
      setTreatments(treatmentsData);
      setCategories(catsData);
      setLoading(false);
    });
  }, []);

  const filteredTreatments = activeCategory === "All"
    ? treatments
    : treatments.filter(item => item.category.toUpperCase() === activeCategory.toUpperCase());

  const heroTreatment = filteredTreatments[0] || null;
  const gridTreatments = filteredTreatments.slice(1);

  return (
    <div className="services-page-wrapper">
      
      <section className="treatment-edit-hero">
        <div className="container treatment-edit-hero-container">
          <div className="treatment-edit-hero-text">
            <span className="treatment-edit-badge">THE TREATMENT EDIT</span>
            <KineticText text="Our Treatments" className="treatment-edit-title" tag="h1" />
            <p className="treatment-edit-subtext">
              A considered collection of treatments, selected around your skin, facial structure and individual goals.
            </p>
          </div>

          <div className="treatment-edit-hero-artwork" aria-hidden="true">
            <svg viewBox="0 0 200 120" fill="none" className="gold-eye-svg">
              <rect x="1" y="1" width="198" height="118" rx="59" stroke="rgba(200, 169, 106, 0.4)" strokeWidth="1.5" />
              <path d="M40 60C65 35 135 35 160 60C135 85 65 85 40 60Z" stroke="#C8A96A" strokeWidth="1.5" />
              <circle cx="100" cy="60" r="16" stroke="#C8A96A" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
      </section>

      {categories.length > 1 && (
        <section className="services-filter-bar-section">
          <div className="container">
            <div className="services-filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`services-filter-btn ${activeCategory.toUpperCase() === cat.toUpperCase() ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="treatment-editorial-body">
        <div className="container">
          
          {loading && (
            <div className="services-empty-state">
              <p>Loading clinical treatments...</p>
            </div>
          )}

          {!loading && filteredTreatments.length === 0 && (
            <div className="services-empty-state">
              <h3>Treatments Coming Soon</h3>
              <p style={{ marginTop: '0.75rem' }}>No clinical treatments are currently available in this category.</p>
            </div>
          )}

          {!loading && heroTreatment && (
            <motion.div 
              className="treatment-featured-card"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="treatment-featured-content">
                <span className="treatment-featured-tag">
                  01 &bull; {heroTreatment.category || 'TREATMENTS'}
                </span>
                <h2 className="treatment-featured-title">{heroTreatment.title}</h2>
                <p className="treatment-featured-desc">
                  {heroTreatment.description || 'A considered collection designed to improve skin quality, stimulate collagen and support facial structure through progressive, considered treatment.'}
                </p>
                
                <div className="treatment-featured-btn-wrap">
                  <Link to={`/services/${heroTreatment.slug}`} className="btn-explore-collection">
                    <span>EXPLORE COLLECTION</span>
                    <ArrowRightIcon size={12} color="currentColor" />
                  </Link>
                </div>
              </div>

              <div className="treatment-featured-art" aria-hidden="true">
                <svg viewBox="0 0 240 240" fill="none" className="gold-circles-svg">
                  <circle cx="100" cy="100" r="70" stroke="#C8A96A" strokeWidth="1.5" strokeOpacity="0.45" />
                  <circle cx="140" cy="100" r="70" stroke="#C8A96A" strokeWidth="1.5" strokeOpacity="0.45" />
                  <circle cx="120" cy="140" r="70" stroke="#C8A96A" strokeWidth="1.5" strokeOpacity="0.45" />
                </svg>
              </div>
            </motion.div>
          )}

          {!loading && gridTreatments.length > 0 && (
            <motion.div 
              className="treatment-minimalist-grid"
              variants={staggerGridContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {gridTreatments.map((item, idx) => {
                const stepNumber = String(idx + 2).padStart(2, '0');
                return (
                  <motion.div 
                    key={item.id} 
                    className="treatment-minimal-card"
                    variants={staggerCardExtreme}
                    whileHover={{ y: -6 }}
                    whileTap={universalTouchSquash}
                  >
                    <Link to={`/services/${item.slug}`} className="treatment-minimal-card-link">
                      <span className="treatment-minimal-num">{stepNumber}</span>
                      <h3 className="treatment-minimal-title">{item.title}</h3>
                      <p className="treatment-minimal-desc">{item.description}</p>
                      <div className="treatment-minimal-action">
                        <span>EXPLORE</span>
                        <ArrowRightIcon size={11} color="currentColor" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          <div className="treatment-bottom-anchor">
            <h3 className="treatment-anchor-title">Every treatment begins with a consultation.</h3>
            <p className="treatment-anchor-sub">Assessment-led recommendations. No pressure. No one-size-fits-all plans.</p>
          </div>

        </div>
      </section>

      <BookingPolicy />
      <RestoringYouth customImage={ASSETS.ry_services} />
      <Review />
      <CtaBanner />
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CtaBanner from '../components/CtaBanner.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import Review from '../components/Review.jsx';
import { fetchTreatments, fetchTreatmentCategories } from '../services/api.js';
import { CLINIC_CONTENT } from '../data/content.js';
import { ASSETS } from '../assets.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Services.css';

export default function Services() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState(0);

  const clinicalFaqs = CLINIC_CONTENT.treatmentFAQs.slice(0, 5);

  useEffect(() => {
    Promise.all([fetchTreatments(), fetchTreatmentCategories()]).then(([treatmentsData, catsData]) => {
      setServices(treatmentsData);
      setCategories(catsData);
      setLoading(false);
    });
  }, []);

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter(item => item.category.toUpperCase() === activeCategory.toUpperCase());

  return (
    <div className="services-page-wrapper">
      <section className="services-hero-header">
        <div className="services-header-container">
          <div className="services-pill-badge">
            <span>• Our services</span>
          </div>
          <h1 className="services-main-title">Popular Treatments</h1>
          <p className="services-main-subtitle">
            We offer advanced, safe, personalized skin aesthetic treatments designed to restore strength, promote growth, and enhance natural beauty.
          </p>
        </div>
      </section>

      {/* MARQUEE OVERHAULED WITH 4 OFFICIAL BRAND SERVICES */}
      <div className="services-marquee-ribbon">
        <div className="marquee-track">
          <span className="marquee-item">
            INITIAL ASSESSMENT <span className="gold-star spinning-star">✦</span> ANTI-WRINKLE TREATMENTS <span className="gold-star spinning-star">✦</span> FACIAL HARMONISATION – DERMAL FILLERS <span className="gold-star spinning-star">✦</span> SKIN REGENERATIVE <span className="gold-star spinning-star">✦</span> INITIAL ASSESSMENT <span className="gold-star spinning-star">✦</span> ANTI-WRINKLE TREATMENTS <span className="gold-star spinning-star">✦</span> FACIAL HARMONISATION – DERMAL FILLERS <span className="gold-star spinning-star">✦</span> SKIN REGENERATIVE <span className="gold-star spinning-star">✦</span>
          </span>
          <span className="marquee-item" aria-hidden="true">
            INITIAL ASSESSMENT <span className="gold-star spinning-star">✦</span> ANTI-WRINKLE TREATMENTS <span className="gold-star spinning-star">✦</span> FACIAL HARMONISATION – DERMAL FILLERS <span className="gold-star spinning-star">✦</span> SKIN REGENERATIVE <span className="gold-star spinning-star">✦</span> INITIAL ASSESSMENT <span className="gold-star spinning-star">✦</span> ANTI-WRINKLE TREATMENTS <span className="gold-star spinning-star">✦</span> FACIAL HARMONISATION – DERMAL FILLERS <span className="gold-star spinning-star">✦</span> SKIN REGENERATIVE <span className="gold-star spinning-star">✦</span>
          </span>
        </div>
      </div>

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

      <section className="services-grid-section">
        <div className="container">
          {loading && (
            <div className="services-empty-state">
              <p>Loading treatments from clinic records...</p>
            </div>
          )}

          {!loading && filteredServices.length === 0 && (
            <div className="services-empty-state">
              <p>No treatments available in this category.</p>
            </div>
          )}

          {!loading && filteredServices.length > 0 && (
            <motion.div 
              className="services-cards-grid"
              variants={staggerGridContainer}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {filteredServices.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={staggerCardExtreme}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={universalTouchSquash}
                    layout
                  >
                    <Link to={`/services/${item.slug}`} className="treatment-card" style={{ textDecoration: 'none' }}>
                      <div className="treatment-card-content">
                        <span className="treatment-card-cat">{item.category}</span>
                        <h3 className="treatment-card-title">{item.title}</h3>
                        <p className="treatment-card-desc">{item.description}</p>
                      </div>
                      {item.image && (
                        <div className="treatment-card-image-wrap">
                          <img src={item.image} alt={item.title} loading="lazy" />
                        </div>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      <section className="services-faq-section">
        <div className="container">
          <div className="faq-watermark">FAQ</div>
          <div className="faq-list-container">
            {clinicalFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={formattedIndex}
                  className={`faq-accordion-row ${isOpen ? 'open' : ''}`}
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                >
                  <div className="faq-row-header">
                    <span className="faq-index">{formattedIndex}</span>
                    <h4 className="faq-question">{faq.q}</h4>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div className="faq-row-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
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

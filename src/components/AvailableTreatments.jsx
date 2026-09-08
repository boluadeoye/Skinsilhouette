import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import MagneticButton from './MagneticButton.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';
import { fetchTreatments } from '../services/api.js';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './AvailableTreatments.css';

export default function AvailableTreatments() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatments().then((data) => {
      setTreatments(data);
      setLoading(false);
    });
  }, []);

  const card1 = treatments[0];
  const card2 = treatments[1];
  const card3 = treatments[2];

  return (
    <section className="available-treatments-section" id="services">
      <div className="container">
        
        <div className="editorial-section-head">
          <span className="editorial-section-badge">CLINICAL SELECTION</span>
          <KineticText text="Our Treatments" tag="h2" />
          <p>Bespoke aesthetic and regenerative procedures tailored to enhance your natural features.</p>
        </div>

        {loading && (
          <div className="services-empty-state">
            <p>Loading treatments from clinic database...</p>
          </div>
        )}

        {!loading && treatments.length === 0 && (
          <div className="services-empty-state">
            <p>No treatments published yet in WordPress.</p>
          </div>
        )}

        {!loading && treatments.length > 0 && (
          <div className="available-asym-layout">
            
            {card1 && (
              <motion.div className="available-card-large" whileTap={universalTouchSquash}>
                <div className="dark-foreground-overlay"></div>
                {card1.image && <img src={card1.image} alt={card1.title} loading="lazy" />}
                
                <div className="card-content-top">
                  <span className="card-tag">{card1.category}</span>
                  <h3 className="card-title">{card1.title}</h3>
                </div>
                
                <div className="card-content-bottom">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="book-link">
                    <span>BOOK NOW</span>
                    <ArrowUpRightIcon size={12} color="#FFFFFF" />
                  </a>
                </div>
              </motion.div>
            )}

            <div className="available-right-stack">
              {card2 && (
                <motion.div className="available-card-small" whileTap={universalTouchSquash}>
                  {card2.image && <img src={card2.image} alt={card2.title} loading="lazy" />}
                  <div className="card-overlay-content">
                    <span className="card-tag">{card2.category}</span>
                    <h3 className="card-title-small">{card2.title}</h3>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="book-link">
                      <span>BOOK NOW</span>
                      <ArrowUpRightIcon size={12} color="#FFFFFF" />
                    </a>
                  </div>
                </motion.div>
              )}

              {card3 && (
                <motion.div className="available-card-small" whileTap={universalTouchSquash}>
                  {card3.image && <img src={card3.image} alt={card3.title} loading="lazy" />}
                  <div className="card-overlay-content">
                    <span className="card-tag">{card3.category}</span>
                    <h3 className="card-title-small">{card3.title}</h3>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="book-link">
                      <span>BOOK NOW</span>
                      <ArrowUpRightIcon size={12} color="#FFFFFF" />
                    </a>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        )}

        <div className="available-cta-wrap">
          <MagneticButton href="/services" className="btn-black-center" strength={25}>
            View All Services
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

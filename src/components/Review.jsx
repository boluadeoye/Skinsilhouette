import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLINIC_CONTENT } from '../data/content.js';
import { universalTouchSquash, SPRINGS } from '../utils/motion.js';
import './Review.css';

export default function Review() {
  const reviews = CLINIC_CONTENT.reviews;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="luxury-review-section">
      <div className="review-watermark-bg" aria-hidden="true">REVIEW</div>

      <div className="container">
        <div className="review-carousel-container">

          {/* DESKTOP NAVIGATION ARROWS WITH BOUNCE */}
          <motion.button 
            className="nav-arrow prev" 
            onClick={prevSlide} 
            aria-label="Previous Review"
            whileHover={{ scale: 1.25, x: -4 }}
            whileTap={universalTouchSquash}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <div className="review-slider-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="review-slide"
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -50 }}
                transition={SPRINGS.extremeBouncy}
              >
                <div className="luxury-review-card">
                  <motion.div 
                    className="review-avatar-circle"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={universalTouchSquash}
                  >
                    {reviews[currentIndex].initials}
                  </motion.div>
                  
                  <div className="review-stars-row">
                    {"★".repeat(reviews[currentIndex].stars || 5)}
                  </div>
                  
                  <blockquote className="review-quote-text">
                    “{reviews[currentIndex].quote}”
                  </blockquote>
                  
                  <div className="review-meta">
                    <h4 className="review-author-name">{reviews[currentIndex].name}</h4>
                    <p className="review-author-date">{reviews[currentIndex].role} &bull; {reviews[currentIndex].date}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button 
            className="nav-arrow next" 
            onClick={nextSlide} 
            aria-label="Next Review"
            whileHover={{ scale: 1.25, x: 4 }}
            whileTap={universalTouchSquash}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>

          {/* DYNAMIC PAGINATION DOTS WITH ELASTIC SPRINGS */}
          <div className="review-pagination">
            {reviews.map((_, idx) => (
              <motion.button
                key={idx}
                className={`pagination-dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                whileHover={{ scale: 1.3 }}
                whileTap={universalTouchSquash}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

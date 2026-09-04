import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import BeforeAfterGrid from '../components/BeforeAfterGrid.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Review from '../components/Review.jsx'; // Imported the unified review carousel
import { CLINIC_CONTENT } from '../data/content.js';
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './LaserHairRemoval.css';

const LASER_HOW_IT_WORKS = [
  { 
    id: "01", 
    question: "How does the treatment work?", 
    answer: "A concentrated beam of medical-grade laser light safely targets melanin in the hair follicle, disabling future regrowth while keeping the surrounding skin calm and protected." 
  },
  { 
    id: "02", 
    question: "Do I need a consultation beforehand?", 
    answer: "Yes, an initial clinical consultation is essential to evaluate your skin type, medical history, and treatment goals to design your bespoke roadmap." 
  },
  { 
    id: "03", 
    question: "Is the laser procedure painful?", 
    answer: "Our advanced laser platform features integrated contact cooling technology that continuously cools the skin surface for a comfortable, near-painless experience." 
  }
];

const SERVICE_FAQS = [
  {
    id: "01",
    question: "How long does semi-permanent makeup last?",
    answer: "Ombré Brows and Combo Brows typically last 1 to 2 years, depending on skin type, lifestyle, and aftercare. Regular touch-ups are recommended to maintain their appearance."
  },
  {
    id: "02",
    question: "Do I need a consultation before booking a brow service?",
    answer: "Yes, consultations are highly recommended to assess your skin type, facial structure, and discuss your desired look to ensure the best possible aesthetic outcome."
  },
  {
    id: "03",
    question: "Is the brow procedure painful?",
    answer: "Most clients experience minimal discomfort as a highly effective topical numbing cream is applied prior to and during the procedure."
  }
];

export default function LaserHairRemoval() {
  const [activeHiw, setActiveHiw] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  // Dynamic clinical FAQs from central registry
  const clinicalFaqs = CLINIC_CONTENT.treatmentFAQs.slice(0, 3);

  return (
    <div className="laser-page-wrapper">
      
      {/* 1. SEAMLESS HERO SECTION */}
      <section className="laser-hero-section">
        <div className="container">
          <div className="laser-hero-grid">
            
            {/* HERO LEFT: CLINICAL FACE IMAGE */}
            <motion.div 
              className="laser-hero-media"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <img src={ASSETS.service_detail_hero} alt="Laser Hair Removal Clinical Result" />
            </motion.div>

            {/* HERO RIGHT: SHARP BLACK SERVICE CARD */}
            <motion.div 
              className="laser-hero-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="ry-gold-badge">LASER TREATMENTS</span>
              <h1 className="laser-hero-title">LASER HAIR<br />REMOVAL</h1>
              <p className="laser-hero-desc">
                Laser hair removal is a medical procedure that uses a concentrated beam of light (laser) to remove unwanted hair.
              </p>
              <div className="ry-metrics-row">
                <div className="ry-metric"><h3>200+</h3><p>PATIENTS TREATED</p></div>
                <div className="ry-metric"><h3>5.0</h3><p>STAR REVIEWS</p></div>
              </div>
              <div className="laser-btn-wrap">
                <motion.a 
                  href="https://wa.me/2348140000000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ry-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={universalTouchSquash}
                >
                  Book Appointment
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SERVICE NARRATIVE */}
      <section className="laser-about-section">
        <div className="container">
          <div className="laser-about-content">
            <KineticText text="About Laser Hair Removal" className="laser-about-title" tag="h2" />
            <p className="laser-about-text">{CLINIC_CONTENT.about.practitioner_statement}</p>
            <p className="laser-about-text" style={{ marginTop: '1.25rem' }}>{CLINIC_CONTENT.about.p1}</p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="laser-hiw-section">
        <div className="container">
          <div className="laser-hiw-card">
            
            <div className="laser-hiw-left">
              <span className="hiw-standalone-heading">HOW IT WORKS</span>

              <div className="hiw-accordion-list">
                {LASER_HOW_IT_WORKS.map((faq, idx) => (
                  <div 
                    key={faq.id} 
                    className={`hiw-row ${activeHiw === idx ? 'open' : ''}`} 
                    onClick={() => setActiveHiw(activeHiw === idx ? null : idx)}
                  >
                    <div className="hiw-row-header">
                      <span className="hiw-row-index">{faq.id}</span>
                      <h4 className="hiw-row-title">{faq.question}</h4>
                      <span className="hiw-toggle-icon">{activeHiw === idx ? '−' : '+'}</span>
                    </div>
                    {activeHiw === idx && (
                      <motion.div 
                        className="hiw-row-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.35 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <motion.div 
              className="laser-hiw-right"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img src={ASSETS.service_detail_hiw} alt="Clinical Wand Procedure Action" loading="lazy" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. UNIFIED DYNAMIC CLIENT REVIEW CAROUSEL */}
      <Review />

      {/* 5. BORROWED CASE STUDIES SECTION */}
      <BeforeAfterGrid title="CASE STUDIES" badge="RESULTS" />

      {/* 6. SERVICE FAQ SECTION */}
      <section className="laser-faq-section">
        <div className="faq-watermark" aria-hidden="true">FAQ</div>
        <div className="container">
          <div className="laser-faq-container">
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
                      <motion.div 
                        className="faq-row-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="laser-faq-btn-wrap">
              <motion.a 
                href="https://wa.me/2348140000000" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-faq-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={universalTouchSquash}
              >
                BOOK AN APPOINTMENT
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <BookingPolicy />
      <CtaBanner />

    </div>
  );
}

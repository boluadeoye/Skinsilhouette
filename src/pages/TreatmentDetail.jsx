import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import BeforeAfterGrid from '../components/BeforeAfterGrid.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Review from '../components/Review.jsx';
import { fetchTreatmentBySlug } from '../services/api.js';
import { CLINIC_CONTENT, BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './TreatmentDetail.css';

const TREATMENT_HOW_IT_WORKS = [
  { 
    id: "01", 
    question: "How does the clinical procedure work?", 
    answer: "Our medical-grade protocols target the root cellular structures to stimulate natural collagen, relax targeted muscle groups, or restore structural definition while safeguarding tissue health." 
  },
  { 
    id: "02", 
    question: "Do I need a consultation beforehand?", 
    answer: "Yes, an initial clinical consultation is essential to evaluate your skin type, medical history, and aesthetic goals to design your bespoke roadmap." 
  },
  { 
    id: "03", 
    question: "Is the procedure comfortable?", 
    answer: "Client comfort is paramount. We employ integrated cooling technology and medical-grade topical anaesthetic agents to ensure an unhurried, comfortable experience." 
  }
];

export default function TreatmentDetail() {
  const { slug } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeHiw, setActiveHiw] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  const clinicalFaqs = CLINIC_CONTENT.treatmentFAQs.slice(0, 3);

  useEffect(() => {
    fetchTreatmentBySlug(slug).then((data) => {
      setTreatment(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="treatment-detail-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading treatment from clinical records...</p>
        </div>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div className="treatment-detail-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <h2>Treatment Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>The requested clinical treatment is currently unavailable.</p>
        </div>
      </div>
    );
  }

  const validHiwImage = typeof treatment.howItWorksImage === 'string' && (treatment.howItWorksImage.startsWith('http') || treatment.howItWorksImage.startsWith('/'));

  return (
    <div className="treatment-detail-page-wrapper">
      
      {/* 1. ASYMMETRICAL HERO */}
      <section className="treatment-hero-section">
        <div className="container">
          <div className="treatment-hero-grid">
            {treatment.image && (
              <motion.div 
                className="treatment-hero-media"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <img src={treatment.image} alt={treatment.title} />
              </motion.div>
            )}

            <motion.div 
              className="treatment-hero-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="ry-gold-badge">{treatment.category}</span>
              <h1 className="treatment-hero-title">{treatment.title}</h1>
              <p className="treatment-hero-desc">{treatment.summaryHook}</p>
              
              <div className="ry-metrics-row">
                <div className="ry-metric"><h3>50+</h3><p>PATIENTS TREATED</p></div>
                <div className="ry-metric"><h3>5.0</h3><p>STAR REVIEWS</p></div>
              </div>
              <div className="treatment-btn-wrap">
                <motion.a 
                  href={BOOKING_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ry-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={universalTouchSquash}
                >
                  Book Consultation
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="treatment-about-section">
        <div className="container">
          <div className="treatment-about-content">
            <KineticText text={`About ${treatment.title}`} className="treatment-about-title" tag="h2" />
            <p className="treatment-about-text">
              {treatment.description || CLINIC_CONTENT.about.practitioner_statement}
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (VALIDATED RESOLVER RENDERING) */}
      <section className="treatment-hiw-section">
        <div className="container">
          <div className={`treatment-hiw-card ${validHiwImage ? 'has-image' : 'no-image'}`}>
            <div className="treatment-hiw-left">
              <span className="hiw-standalone-heading">HOW IT WORKS</span>
              <div className="hiw-accordion-list">
                {TREATMENT_HOW_IT_WORKS.map((faq, idx) => (
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

            {validHiwImage && (
              <motion.div 
                className="treatment-hiw-right"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={treatment.howItWorksImage} alt="Clinical Treatment Procedure" loading="lazy" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 4. BOOKING POLICY BAR */}
      <BookingPolicy />

      {/* 5. CLIENT REVIEWS CAROUSEL */}
      <Review />

      {/* 6. CASE STUDIES SECTION */}
      <BeforeAfterGrid title="CASE STUDIES" badge="RESULTS" />

      {/* 7. SERVICE FAQ */}
      <section className="treatment-faq-section">
        <div className="faq-watermark" aria-hidden="true">FAQ</div>
        <div className="container">
          <div className="treatment-faq-container">
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

            <div className="treatment-faq-btn-wrap">
              <motion.a 
                href={BOOKING_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-faq-cta"
                whileHover={{ scale: 1.05 }}
                whileTap={universalTouchSquash}
              >
                BOOK A CONSULTATION
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

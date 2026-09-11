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
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './TreatmentDetail.css';

const TREATMENT_CATALOG = {
  "regenerative-injectables": {
    title: "Regenerative Injectables",
    category: "INJECTABLES",
    summaryHook: "Bespoke collagen-stimulating injectables tailored to improve dermal thickness and facial structural support.",
    description: "A curated collection designed to improve skin quality, stimulate collagen and support facial structure through progressive, considered treatment. By introducing biocompatible regenerative compounds, we trigger tissue renewal that enhances your natural contours.",
    image: ASSETS.available_1,
    howItWorksImage: ASSETS.laser_hiw
  },
  "regenerative-injectible": {
    title: "Regenerative Injectables",
    category: "INJECTABLES",
    summaryHook: "Bespoke collagen-stimulating injectables tailored to improve dermal thickness and facial structural support.",
    description: "A curated collection designed to improve skin quality, stimulate collagen and support facial structure through progressive, considered treatment. By introducing biocompatible regenerative compounds, we trigger tissue renewal that enhances your natural contours.",
    image: ASSETS.available_1,
    howItWorksImage: ASSETS.laser_hiw
  },
  "skin-regenerative": {
    title: "Regenerative Injectables",
    category: "INJECTABLES",
    summaryHook: "Bespoke collagen-stimulating injectables tailored to improve dermal thickness and facial structural support.",
    description: "A curated collection designed to improve skin quality, stimulate collagen and support facial structure through progressive, considered treatment. By introducing biocompatible regenerative compounds, we trigger tissue renewal that enhances your natural contours.",
    image: ASSETS.available_1,
    howItWorksImage: ASSETS.laser_hiw
  },
  "skin-remodelling": {
    title: "Skin Remodelling",
    category: "TREATMENTS",
    summaryHook: "Deep cellular hydration, vortex exfoliation, and targeted skin resurfacing protocols.",
    description: "Skin Remodelling Treatments refine skin texture, resolve uneven tone, and tighten structural epidermal layers. Utilising medical-grade infusions, this clinical protocol delivers essential nutrients deep into the dermis to achieve healthy, radiant skin.",
    image: ASSETS.available_2,
    howItWorksImage: ASSETS.laser_hiw
  },
  "anti-wrinkle-treatments": {
    title: "Anti-Wrinkle Treatments",
    category: "TREATMENTS",
    summaryHook: "Precision neuromodulator injections tailored to soften dynamic facial lines and preserve expression.",
    description: "Our Anti-Wrinkle Treatments utilise premium, clinically approved muscle relaxants to soften dynamic expression lines such as crow's feet, forehead creases, and frown lines. Every treatment is minimally invasive, subtle, and designed to preserve your natural facial animation.",
    image: ASSETS.available_3,
    howItWorksImage: ASSETS.available_3
  },
  "dermal-fillers": {
    title: "Dermal Fillers",
    category: "INJECTABLES",
    summaryHook: "Precision hyaluronic acid dermal filler therapies designed to restore volume and balance symmetry.",
    description: "Targeted dermal filler therapies designed to restore lost structural volume, enhance cheek and jawline contours, and balance facial symmetry. Administered with nurse-led clinical precision, our approach respects your underlying bone architecture to avoid an overfilled look.",
    image: ASSETS.available_dermal,
    howItWorksImage: ASSETS.available_dermal
  },
  "facial-harmonisation-dermal-fillers": {
    title: "Dermal Fillers",
    category: "INJECTABLES",
    summaryHook: "Precision hyaluronic acid dermal filler therapies designed to restore volume and balance symmetry.",
    description: "Targeted dermal filler therapies designed to restore lost structural volume, enhance cheek and jawline contours, and balance facial symmetry. Administered with nurse-led clinical precision, our approach respects your underlying bone architecture to avoid an overfilled look.",
    image: ASSETS.available_dermal,
    howItWorksImage: ASSETS.available_dermal
  },
  "fat-dissolving": {
    title: "Fat Dissolving",
    category: "INJECTABLES",
    summaryHook: "Targeted submental and body contouring to permanently eliminate localised fat cells.",
    description: "A target-specific clinical injectable treatment that permanently dissolves localized stubborn fat deposits beneath the chin and across body contours. Formulated with deoxycholic acid compounds, it refines and sculpts the silhouette.",
    image: ASSETS.blog_2,
    howItWorksImage: ASSETS.laser_hiw
  }
};

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
      if (data && data.title) {
        setTreatment(data);
      } else {
        const fallback = TREATMENT_CATALOG[slug] || TREATMENT_CATALOG["regenerative-injectables"];
        setTreatment(fallback);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading || !treatment) {
    return (
      <div className="treatment-detail-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading treatment from clinical records...</p>
        </div>
      </div>
    );
  }

  const validHiwImage = typeof treatment.howItWorksImage === 'string' && (treatment.howItWorksImage.startsWith('http') || treatment.howItWorksImage.startsWith('/'));

  return (
    <div className="treatment-detail-page-wrapper">
      
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

      <BookingPolicy />
      <Review />
      <BeforeAfterGrid title="CASE STUDIES" badge="RESULTS" />

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

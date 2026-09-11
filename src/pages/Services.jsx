import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import Review from '../components/Review.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';
import { ASSETS } from '../assets.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Services.css';

const HERO_TREATMENT = {
  number: "01",
  tag: "REGENERATIVE INJECTABLES",
  title: "Renewal, from within.",
  description: "A curated collection designed to improve skin quality, stimulate collagen and support facial structure through progressive, considered treatment.",
  slug: "regenerative-injectables"
};

const GRID_TREATMENTS = [
  {
    number: "02",
    title: "Skin Remodelling",
    description: "Texture, hydration and overall skin quality.",
    slug: "skin-remodelling"
  },
  {
    number: "03",
    title: "Anti-Wrinkle Treatments",
    description: "Tailored to facial movement and individual anatomy.",
    slug: "anti-wrinkle-treatments"
  },
  {
    number: "04",
    title: "Dermal Fillers",
    description: "Precision treatments for structure and proportion.",
    slug: "dermal-fillers"
  },
  {
    number: "05",
    title: "Fat Dissolving",
    description: "Targeted treatment for selected areas.",
    slug: "fat-dissolving"
  }
];

export default function Services() {
  return (
    <div className="services-page-wrapper">
      
      <section className="treatment-edit-hero">
        <div className="container treatment-edit-hero-container">
          <div className="treatment-edit-hero-text">
            <span className="treatment-edit-badge">THE TREATMENT EDIT</span>
            <KineticText text="Our Treatments" className="treatment-edit-title" tag="h1" />
            <p className="treatment-edit-subtext">
              A considered collection of nurse-led treatments, selected around your skin, facial structure and individual goals.
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

      <section className="treatment-editorial-body">
        <div className="container">
          
          <motion.div 
            className="treatment-featured-card"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="treatment-featured-content">
              <span className="treatment-featured-tag">
                {HERO_TREATMENT.number} &bull; {HERO_TREATMENT.tag}
              </span>
              <h2 className="treatment-featured-title">{HERO_TREATMENT.title}</h2>
              <p className="treatment-featured-desc">{HERO_TREATMENT.description}</p>
              
              <div className="treatment-featured-btn-wrap">
                <Link to={`/services/${HERO_TREATMENT.slug}`} className="btn-explore-collection">
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

          <motion.div 
            className="treatment-minimalist-grid"
            variants={staggerGridContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {GRID_TREATMENTS.map((item) => (
              <motion.div 
                key={item.number} 
                className="treatment-minimal-card"
                variants={staggerCardExtreme}
                whileHover={{ y: -6 }}
                whileTap={universalTouchSquash}
              >
                <Link to={`/services/${item.slug}`} className="treatment-minimal-card-link">
                  <span className="treatment-minimal-num">{item.number}</span>
                  <h3 className="treatment-minimal-title">{item.title}</h3>
                  <p className="treatment-minimal-desc">{item.description}</p>
                  <div className="treatment-minimal-action">
                    <span>EXPLORE</span>
                    <ArrowRightIcon size={11} color="currentColor" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

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

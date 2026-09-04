import React from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Privacy.css';

export default function Privacy() {
  return (
    <div className="privacy-page-wrapper">
      <section className="legal-hero-header">
        <div className="container legal-header-container">
          <div className="legal-pill-badge">
            <span>• DATA SECURITY</span>
          </div>
          <KineticText text="Privacy Policy" className="legal-main-title" tag="h1" />
          <p className="legal-main-subtitle">
            How we protect, encrypt, and manage your clinical health history.
          </p>
        </div>
      </section>

      {/* 3D CASCADE ARTICLE CARDS */}
      <section className="legal-content-section">
        <motion.div 
          className="container legal-editorial-grid"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          
          <motion.div className="legal-article" variants={staggerCardExtreme} whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
            <h2 className="legal-section-title">1. Clinical Information We Collect</h2>
            <p className="legal-text">
              We collect necessary personal data, including your name, contact details, and medical history. This is strictly required to plan safe treatments, evaluate potential contraindications, and protect your physiological welfare.
            </p>
          </motion.div>

          <motion.div className="legal-article" variants={staggerCardExtreme} whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
            <h2 className="legal-section-title">2. How Your Data Is Secured</h2>
            <p className="legal-text">
              All electronic records are locked behind clinical-grade, encrypted servers. Under no circumstances do we sell, rent, or distribute your private information to third-party marketing services. Your records are only visible to the treating clinical practitioner.
            </p>
          </motion.div>

          <motion.div className="legal-article" variants={staggerCardExtreme} whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
            <h2 className="legal-section-title">3. Visual Consent & Results</h2>
            <p className="legal-text">
              Before and After photos are used to track treatment progress. No diagnostic or clinical photos are shared publicly or on social media without your explicit, signed consent.
            </p>
          </motion.div>

        </motion.div>
      </section>

      <CtaBanner />
    </div>
  );
}

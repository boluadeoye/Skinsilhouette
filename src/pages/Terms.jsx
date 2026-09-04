import React from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Terms.css';

export default function Terms() {
  return (
    <div className="terms-page-wrapper">
      <section className="legal-hero-header">
        <div className="container legal-header-container">
          <div className="legal-pill-badge">
            <span>• LEGAL POLICIES</span>
          </div>
          <KineticText text="Terms & Conditions" className="legal-main-title" tag="h1" />
          <p className="legal-main-subtitle">
            Please read our clinic policies carefully before securing your appointment.
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
            <h2 className="legal-section-title">1. Booking & Deposits</h2>
            <p className="legal-text">
              To secure your luxury transformation, a non-refundable deposit of <strong>£50</strong> is required for all appointments at Skin Silhouette Aesthetics. This booking fee is held in accordance with our safety guidelines and will be fully deducted from your final treatment balance at checkout.
            </p>
          </motion.div>

          <motion.div className="legal-article" variants={staggerCardExtreme} whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
            <h2 className="legal-section-title">2. Rescheduling & Cancellations</h2>
            <p className="legal-text">
              We value your time and our practitioners' schedules. We kindly require at least <strong>48 hours' notice</strong> for any cancellations or rescheduling requests. If you fail to notify us or reschedule within this 48-hour window, your £50 booking fee will be forfeited as a late cancellation charge.
            </p>
          </motion.div>

          <motion.div className="legal-article" variants={staggerCardExtreme} whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
            <h2 className="legal-section-title">3. Late Arrivals</h2>
            <p className="legal-text">
              Our clinical safety standards mandate that each treatment is conducted with unhurried precision. We enforce a strict **15-minute late arrival policy**. If you are more than 15 minutes late for your scheduled slot, we may have to shorten, reschedule, or cancel your appointment, resulting in a lost booking deposit.
            </p>
          </motion.div>

          <motion.div className="legal-article" variants={staggerCardExtreme} whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
            <h2 className="legal-section-title">4. Clinic Rules & Safety</h2>
            <p className="legal-text">
              For security, hygiene, and clinical safety reasons, children are not permitted inside our treatment rooms. Clients are welcome to bring a single chaperone (one companion) for support, but we ask that our clinical environment remains calm, quiet, and sterile at all times.
            </p>
          </motion.div>

        </motion.div>
      </section>

      <CtaBanner />
    </div>
  );
}

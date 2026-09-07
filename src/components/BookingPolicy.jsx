import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton.jsx';
import { ArrowRightIcon } from './Icons.jsx';
import { BOOKING_URL } from '../data/content.js';
import './BookingPolicy.css';

export default function BookingPolicy() {
  return (
    <section className="booking-policy-section">
      <div className="container">
        <motion.div 
          className="booking-policy-card-extended"
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
        >
          <div className="policy-notice-content">
            <span className="policy-notice-badge">PLEASE NOTE</span>
            <h3 className="policy-notice-lead">
              By booking, you agree to our treatment terms and policies.
            </h3>
            <p className="policy-notice-body">
              Booking with Skin Silhouette Aesthetics confirms that you have read and accepted our terms relating to treatment planning, payments, cancellations, refunds, consent, photography and the handling of your personal information.
            </p>
            
            <Link to="/terms" className="policy-action-link">
              <span>Treatment, Payment, Cancellation & Consent Policy</span>
              <ArrowRightIcon size={13} color="currentColor" />
            </Link>
          </div>

          <div className="policy-action-btn-col">
            <MagneticButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secure-date"
              strength={20}
            >
              Secure Date
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

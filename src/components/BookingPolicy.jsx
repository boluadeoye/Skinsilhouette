import React from 'react';
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
          className="booking-policy-card"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 180, damping: 16 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="policy-info-col">
            <motion.div 
              className="policy-info-icon-wrap" 
              aria-hidden="true"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <svg className="policy-info-svg" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#5B84B1"></circle>
                <line x1="12" y1="16" x2="12" y2="11" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"></line>
                <line x1="12" y1="7.5" x2="12.01" y2="7.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"></line>
              </svg>
            </motion.div>

            <div className="policy-text-flow">
              <span className="policy-badge-label">PLEASE NOTE</span>
              <p className="policy-lead-sentence">
                By booking, you agree to our treatment terms and policies.
              </p>
              <p className="policy-sub-sentence">
                Booking with Skin Silhouette Aesthetics confirms that you have read and accepted our terms relating to treatment planning, payments, cancellations, refunds, consent, photography and the handling of your personal information.
              </p>
              <a href="/terms" className="policy-terms-link">
                <span>Treatment, Payment, Cancellation & Consent Policy</span>
                <ArrowRightIcon size={12} color="currentColor" />
              </a>
            </div>
          </div>

          <div className="policy-action-col">
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

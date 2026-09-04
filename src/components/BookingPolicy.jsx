import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton.jsx';
import { universalTouchSquash } from '../utils/motion.js';
import './BookingPolicy.css';

export default function BookingPolicy() {
  return (
    <section className="booking-policy-section">
      <div className="container">
        
        {/* ELASTIC SCALE & LAUNCH */}
        <motion.div 
          className="booking-policy-card"
          initial={{ opacity: 0, scale: 0.88, y: 50 }}
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

            <p className="policy-desc-single-line">
              <strong>Booking Policy</strong> &nbsp;To secure your luxury transformation, a non-refundable deposit of <strong>£50</strong> is required for all appointments. This will be deducted from your final balance.
            </p>
          </div>

          <div className="policy-action-col">
            <MagneticButton
              href="https://wa.me/2348140000000?text=Hi,%20I%20would%20like%20to%20secure%20a%20date%20for%20my%20treatment%20session."
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

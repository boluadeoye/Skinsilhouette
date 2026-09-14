import React from 'react';
import { motion } from 'framer-motion';
import { CLINIC_CONTENT, BOOKING_URL } from '../data/content.js';
import { ArrowRightIcon } from './Icons.jsx';
import { universalTouchSquash } from '../utils/motion.js';
import './CtaBanner.css';

export default function CtaBanner() {
  const banner = CLINIC_CONTENT.ctaBanner || {
    title: "Exceptional Care Begins with a Conversation.",
    desc: "A personalised consultation to understand your concerns and guide a considered treatment plan.",
    btn: "Book Consultation"
  };

  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card-light">
          <div>
            <h2 className="cta-heading">{banner.title}</h2>
            <p className="cta-subtext">{banner.desc}</p>
          </div>
          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-black"
            whileHover={{ scale: 1.04 }}
            whileTap={universalTouchSquash}
          >
            <span>{banner.btn}</span>
            <ArrowRightIcon size={12} color="currentColor" style={{ marginLeft: '0.5rem' }} />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

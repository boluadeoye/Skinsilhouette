import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="luxury-footer">
      <div className="container">
        
        <motion.div 
          className="footer-grid"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* BRAND COLUMN: OFFICIAL NAME */}
          <motion.div className="footer-brand-col" variants={staggerCardExtreme}>
            <h3 className="footer-logo">Skin Silhouette Aesthetics</h3>
            <p className="footer-brand-desc">
              Nurse-led advanced aesthetic, regenerative and wellness clinic. Delivering tailored medical excellence to enhance your natural beauty and confidence.
            </p>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div className="footer-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/services" onClick={scrollToTop}>Services</Link></li>
              <li><Link to="/works" onClick={scrollToTop}>Our Works</Link></li>
              <li><Link to="/about" onClick={scrollToTop}>About</Link></li>
            </ul>
          </motion.div>

          {/* MORE LINKS */}
          <motion.div className="footer-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">More Links</h4>
            <ul className="footer-links">
              <li><Link to="/faq" onClick={scrollToTop}>FAQs</Link></li>
              <li><Link to="/terms" onClick={scrollToTop}>Terms</Link></li>
              <li><Link to="/privacy" onClick={scrollToTop}>Privacy</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </motion.div>

          {/* CONTACT LIST */}
          <motion.div className="footer-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-links footer-contact-list">
              <motion.li className="footer-contact-item" whileHover={{ x: 6 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="0"></rect>
                  <path d="M22 4L12 12 2 4"></path>
                </svg>
                <span>info@skinsilhouette.com</span>
              </motion.li>

              <motion.li className="footer-contact-item" whileHover={{ x: 6 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <span>+234 812 582 1771</span>
              </motion.li>

              <motion.li className="footer-contact-item" whileHover={{ x: 6 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon filled-pin" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
                <span>London, United Kingdom</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="footer-bottom-bar">
          <p>&copy; 2026 Skin Silhouette Aesthetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CLINIC_CONTENT, BOOKING_URL, INSTAGRAM_URL } from '../data/content.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Footer.css';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const { email, phone, location, instagramHandle } = CLINIC_CONTENT.contactInfo;

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="luxury-footer">
      <div className="container">
        
        <motion.div 
          className="footer-grid-4col"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* COLUMN 1: MENU / QUICK LINKS */}
          <motion.div className="footer-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/about" onClick={scrollToTop}>About</Link></li>
              <li><Link to="/services" onClick={scrollToTop}>Treatments</Link></li>
              <li>
                <span className="menu-disabled-link">
                  Membership <span className="coming-soon-pill">Coming Soon</span>
                </span>
              </li>
              <li>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="highlighted-book-link">
                  Book an appointment
                </a>
              </li>
              <li><Link to="/journal" onClick={scrollToTop}>Journal</Link></li>
              <li><Link to="/contact" onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </motion.div>

          {/* COLUMN 2: INFORMATION */}
          <motion.div className="footer-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">Information</h4>
            <ul className="footer-links">
              <li><Link to="/faq" onClick={scrollToTop}>FAQs</Link></li>
              <li><Link to="/terms" onClick={scrollToTop}>Booking Policy</Link></li>
              <li><Link to="/privacy" onClick={scrollToTop}>Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={scrollToTop}>Terms & Conditions</Link></li>
              <li><Link to="/terms" onClick={scrollToTop}>Aftercare</Link></li>
            </ul>
          </motion.div>

          {/* COLUMN 3: CONTACT */}
          <motion.div className="footer-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">Contact</h4>
            <ul className="footer-links footer-contact-list">
              <motion.li className="footer-contact-item" whileHover={{ x: 5 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="0"></rect>
                  <path d="M22 4L12 12 2 4"></path>
                </svg>
                <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {email}
                </a>
              </motion.li>

              <motion.li className="footer-contact-item" whileHover={{ x: 5 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="5" y="2" width="14" height="20" rx="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <a href={`tel:${phone.replace(/\s+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {phone}
                </a>
              </motion.li>

              <motion.li className="footer-contact-item" whileHover={{ x: 5 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon filled-pin" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
                </svg>
                <span>{location}</span>
              </motion.li>

              <motion.li className="footer-contact-item" whileHover={{ x: 5 }} whileTap={universalTouchSquash}>
                <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {instagramHandle}
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* COLUMN 4: THE SILHOUETTE CLUB (NEWSLETTER) */}
          <motion.div className="footer-col footer-newsletter-col" variants={staggerCardExtreme}>
            <h4 className="footer-col-title">Join The Club</h4>
            <p className="footer-club-text">
              Sign up for our newsletter and join the silhouette club. You will receive exclusive perks, discounts, event invites, and much more.
            </p>

            {subscribed && <div className="footer-success-msg">Welcome to the Silhouette Club.</div>}

            <form onSubmit={handleSubscribe} className="footer-club-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <motion.button 
                type="submit" 
                className="footer-club-btn"
                whileTap={universalTouchSquash}
              >
                SUBSCRIBE
              </motion.button>
            </form>
          </motion.div>

        </motion.div>

        <div className="footer-bottom-bar">
          <p>&copy; 2026 Skin Silhouette Aesthetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

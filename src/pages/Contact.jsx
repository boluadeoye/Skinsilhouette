import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { CLINIC_CONTENT } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 4000); };
  const handleSubscribe = (e) => { e.preventDefault(); setSubscribed(true); setTimeout(() => setSubscribed(false), 4000); };

  return (
    <div className="contact-page-wrapper">
      <section className="contact-main-section">
        <div className="container contact-grid">
          <motion.div className="contact-form-col" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <span className="contact-badge-tag">SPEAK TO US</span>
            <KineticText text="Need Help?" className="contact-title" tag="h1" />
            {submitted && <div className="contact-success-msg">Thank you! Your message has been received.</div>}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-input-row">
                <div className="contact-field-group">
                  <label htmlFor="name">Your name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="contact-field-group">
                  <label htmlFor="email">Your email</label>
                  <input type="email" id="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="contact-input-row">
                <div className="contact-field-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={form.phone} onChange={handleChange} />
                </div>
                <div className="contact-field-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Enter subject" value={form.subject} onChange={handleChange} />
                </div>
              </div>
              <div className="contact-field-group full-width">
                <label htmlFor="message">Your message (optional)</label>
                <textarea id="message" name="message" rows="6" placeholder="Send us a message or ask your question" value={form.message} onChange={handleChange}></textarea>
              </div>

              {/* ACTION UPDATED: BOOK A CONSULTATION */}
              <motion.button type="submit" className="contact-submit-btn" whileTap={universalTouchSquash}>
                <span>BOOK A CONSULTATION</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '10px' }}>
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </motion.button>
            </form>
          </motion.div>

          <motion.div className="contact-newsletter-col" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <h2 className="newsletter-title">Subscribe to our newsletter</h2>
            <p className="newsletter-subtitle">And don't miss a drop of our new flavours, offers and events!</p>
            {subscribed && <div className="newsletter-success-msg">You're subscribed! Welcome to Skin Silhouette Aesthetics.</div>}
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-field-wrap">
                <input type="email" placeholder="Enter your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required />
              </div>
              <motion.button type="submit" className="newsletter-submit-btn" whileTap={universalTouchSquash}>SUBSCRIBE</motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';
import { universalTouchSquash } from '../utils/motion.js';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setSubmitted(true); 
    setTimeout(() => setSubmitted(false), 4000); 
  };

  return (
    <div className="contact-page-wrapper">
      <section className="contact-main-section">
        <div className="container">
          <motion.div 
            className="contact-centered-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-header-block">
              <span className="contact-badge-tag">SPEAK TO US</span>
              <KineticText text="Need Help?" className="contact-title" tag="h1" />
              {submitted && <div className="contact-success-msg">Thank you! Your enquiry has been received.</div>}
            </div>

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
                <textarea id="message" name="message" rows="6" placeholder="Send us a message or clinical enquiry" value={form.message} onChange={handleChange}></textarea>
              </div>

              <motion.button type="submit" className="contact-submit-btn" whileTap={universalTouchSquash}>
                <span>CONTACT US</span>
                <ArrowRightIcon size={12} color="currentColor" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}

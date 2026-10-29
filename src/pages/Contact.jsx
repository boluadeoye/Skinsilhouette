import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { ArrowRightIcon } from '../components/Icons.jsx';
import { submitInquiry } from '../services/api.js';
import { universalTouchSquash } from '../utils/motion.js';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', hp: '' });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    setIsSubmitting(true);
    setStatus(null);

    const result = await submitInquiry(form);
    setIsSubmitting(false);

    if (result && result.success) {
      setStatus({
        type: 'success',
        msg: 'Thank you! Your enquiry has been received. Our clinical coordinator will review your details and contact you shortly.'
      });
      setForm({ name: '', email: '', phone: '', subject: '', message: '', hp: '' });
    } else {
      setStatus({
        type: 'error',
        msg: result.message || 'Something went wrong. Please email us directly at hello@skinsilhouetteaesthetics.co.uk'
      });
    }
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
              {status && (
                <div 
                  className={status.type === 'success' ? 'contact-success-msg' : 'contact-error-msg'}
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    background: status.type === 'success' ? '#E6F4EA' : '#FCE8E6',
                    color: status.type === 'success' ? '#137333' : '#C5221F',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}
                >
                  {status.msg}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <input 
                type="text" 
                name="hp" 
                value={form.hp} 
                onChange={handleChange} 
                style={{ display: 'none' }} 
                tabIndex="-1" 
                autoComplete="off" 
              />

              <div className="contact-input-row">
                <div className="contact-field-group">
                  <label htmlFor="name">Your name *</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="contact-field-group">
                  <label htmlFor="email">Your email *</label>
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

              <motion.button 
                type="submit" 
                className="contact-submit-btn" 
                whileTap={universalTouchSquash}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'SENDING ENQUIRY...' : 'CONTACT US'}</span>
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

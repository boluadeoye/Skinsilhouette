import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './FAQ.css';

const TREATMENT_FAQS = [
  { q: "Do I need a consultation before treatment?", a: "Yes. Your safety and suitability for treatment are our priority. A consultation allows us to discuss your concerns, medical history, expectations and treatment options before creating an individualised plan for you." },
  { q: "What happens during my consultation?", a: "Your consultation is an opportunity to discuss your skin or aesthetic concerns, desired outcomes and any previous treatments. We will assess the treatment area, review relevant medical history and explain suitable options, expected results, risks and aftercare." },
  { q: "I'm not sure which treatment I need. Can you help?", a: "Absolutely. You do not need to know which treatment to book before speaking with us. We can assess your concerns and recommend the most appropriate options based on your individual needs and goals." },
  { q: "What's the difference between anti-wrinkle treatment and dermal filler?", a: "Anti-wrinkle treatment temporarily reduces targeted muscle activity to soften dynamic lines. Dermal filler is used to restore or enhance volume, shape and definition." },
  { q: "Will I look overdone?", a: "Our approach is subtle and considered. Every treatment is tailored to your individual features with the aim of enhancing, not changing, what makes you uniquely you." }
];

const BOOKING_FAQS = [
  { q: "How do I book an appointment?", a: "Appointments can be booked online through our booking system. Select your preferred treatment or consultation and choose an available appointment time." },
  { q: "Do I need to pay a booking fee?", a: "A booking fee may be required to secure your appointment. Where applicable, this will be clearly shown during the booking process and will be applied in accordance with our booking terms." },
  { q: "Can I reschedule my appointment?", a: "Yes. We understand that plans can change. We kindly ask for at least 48 hours' notice if you need to reschedule your appointment." }
];

export default function FAQ() {
  const [activeTreatmentFaq, setActiveTreatmentFaq] = useState(0);
  const [activeBookingFaq, setActiveBookingFaq] = useState(0);

  return (
    <div className="faq-page-wrapper">
      <section className="faq-hero-header">
        <div className="container faq-header-container">
          <div className="faq-pill-badge">
            <span>• ACCREDITED FAQS</span>
          </div>
          <KineticText text="Frequently Asked Questions" className="faq-main-title" tag="h1" />
          <p className="faq-main-subtitle">
            Expert clinical guidance on our treatments, booking policies, and safety standards.
          </p>
        </div>
      </section>

      {/* 3D CASCADE ACCORDION GRID */}
      <section className="faq-matrix-section">
        <div className="container faq-split-layout">
          
          <motion.div 
            className="faq-column"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="faq-column-title">Treatment FAQs</h2>
            <div className="faq-list">
              {TREATMENT_FAQS.map((faq, index) => {
                const isOpen = activeTreatmentFaq === index;
                const formattedIndex = String(index + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={`treatment-${index}`}
                    className={`faq-page-row ${isOpen ? 'open' : ''}`}
                    onClick={() => setActiveTreatmentFaq(isOpen ? -1 : index)}
                    whileTap={universalTouchSquash}
                  >
                    <div className="faq-row-header">
                      <span className="faq-row-index">{formattedIndex}</span>
                      <h4 className="faq-row-question">{faq.q}</h4>
                      <span className="faq-row-toggle">{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && (
                      <motion.div 
                        className="faq-row-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div 
            className="faq-column"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h2 className="faq-column-title">Booking & Safety FAQs</h2>
            <div className="faq-list">
              {BOOKING_FAQS.map((faq, index) => {
                const isOpen = activeBookingFaq === index;
                const formattedIndex = String(index + 1).padStart(2, '0');
                return (
                  <motion.div
                    key={`booking-${index}`}
                    className={`faq-page-row ${isOpen ? 'open' : ''}`}
                    onClick={() => setActiveBookingFaq(isOpen ? -1 : index)}
                    whileTap={universalTouchSquash}
                  >
                    <div className="faq-row-header">
                      <span className="faq-row-index">{formattedIndex}</span>
                      <h4 className="faq-row-question">{faq.q}</h4>
                      <span className="faq-row-toggle">{isOpen ? '−' : '+'}</span>
                    </div>
                    {isOpen && (
                      <motion.div 
                        className="faq-row-body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

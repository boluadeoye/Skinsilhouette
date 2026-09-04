import React, { useState } from 'react';
import './FAQSection.css';

export default function FAQSection({ items = [], title = "FAQs", subtitle = "" }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="faq-section-wrapper">
      <div className="faq-section-watermark" aria-hidden="true">FAQ</div>
      <div className="container">
        <div className="faq-section-header">
          <span className="faq-section-badge">Accredited FAQS</span>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="faq-section-list">
          {items.map((faq, index) => {
            const isOpen = activeIdx === index;
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={formattedIndex}
                className={`faq-section-row ${isOpen ? 'open' : ''}`}
                onClick={() => setActiveIdx(isOpen ? -1 : index)}
              >
                <div className="faq-section-row-header">
                  <span className="faq-section-index">{formattedIndex}</span>
                  <h4 className="faq-section-question">{faq.q}</h4>
                  <span className="faq-section-toggle-icon">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && (
                  <div className="faq-section-row-body">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

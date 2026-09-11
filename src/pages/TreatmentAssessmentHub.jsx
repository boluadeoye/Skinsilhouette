import React from 'react';
import { motion } from 'framer-motion';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './TreatmentAssessmentHub.css';

const SAFETY_ICONS = [
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="14" width="4" height="7" rx="1"></rect><rect x="10" y="8" width="4" height="13" rx="1"></rect><rect x="17" y="3" width="4" height="18" rx="1"></rect></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="8" cy="10" r="1" fill="currentColor"></circle><circle cx="12" cy="10" r="1" fill="currentColor"></circle><circle cx="16" cy="10" r="1" fill="currentColor"></circle></svg>,
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
];

const CANONICAL_SAFETY = [
  "Results vary between individuals and cannot be guaranteed.",
  "Suitability is determined following consultation and clinical assessment.",
  "Dermal fillers are not risk-free; swelling, bruising, tenderness and asymmetry can occur.",
  "Rare but serious complications are discussed during consultation and consent.",
  "More than one treatment or future maintenance may be required.",
  "Consultation does not guarantee treatment.",
  "Our aim is considered improvement, not perfection."
];

export default function TreatmentAssessmentHub({ treatment }) {
  if (!treatment) return null;

  const {
    title,
    category,
    heroSub,
    heroPillars = [],
    aboutTitle,
    aboutText,
    aboutRows = [],
    areasTitle,
    areasSub,
    areas = [],
    safety = [],
    approachTitle,
    approachSub,
    approachRows = []
  } = treatment;

  const displaySafety = safety && safety.length > 0 ? safety : CANONICAL_SAFETY;

  return (
    <div className="assessment-hub-wrapper">
      
      <section className="ah-hero">
        <div className="container ah-hero-container">
          <div className="ah-hero-left">
            <span className="ah-badge">{category}</span>
            <h1 className="ah-title">{title}</h1>
            {heroSub && <p className="ah-sub">{heroSub}</p>}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ah-btn-white">
              BOOK A CONSULTATION &rarr;
            </a>
          </div>
          <div className="ah-hero-right">
            <div className="ah-hero-art" aria-hidden="true">
              <svg viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="80" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.5"/>
                <circle cx="140" cy="60" r="50" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.5"/>
              </svg>
            </div>
            {heroPillars.length > 0 && (
              <div className="ah-pillars">
                {heroPillars.map((p, i) => <span key={i}>{p}</span>)}
              </div>
            )}
          </div>
        </div>
      </section>

      {(aboutTitle || aboutText || aboutRows.length > 0) && (
        <section className="ah-about">
          <div className="container ah-about-grid">
            <div className="ah-about-left">
              <span className="ah-section-label">ABOUT THIS SERVICE</span>
              <h2>{aboutTitle}</h2>
              <p>{aboutText}</p>
            </div>
            {aboutRows.length > 0 && (
              <div className="ah-about-right">
                {aboutRows.map((row, i) => (
                  <div className="ah-about-row" key={i}>
                    <div className="ah-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="ah-row-text">
                      <h4>{row.title}</h4>
                      <p>{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {areas.length > 0 && (
        <section className="ah-areas">
          <div className="container">
            <div className="ah-areas-head">
              <span className="ah-section-label">AREAS WE CAN ASSESS</span>
              <h2>{areasTitle}</h2>
              {areasSub && <p>{areasSub}</p>}
            </div>
            <div className="ah-areas-grid">
              {areas.map((area, i) => (
                <motion.div className="ah-area-card" key={i} whileHover={{ y: -4 }} whileTap={universalTouchSquash}>
                  <div className="ah-area-card-top">
                    <h4>{area.title}</h4>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                  <p>{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FLAT HORIZONTAL CAROUSEL STRIP: REAL VECTOR ICONS WITH VERTICAL DIVIDERS */}
      <section className="ah-safety-section">
        <div className="container">
          <div className="ah-safety-head">
            <span className="ah-section-label">IMPORTANT TREATMENT INFORMATION</span>
            <h2>Making an informed choice</h2>
            <p>Your safety, wellbeing and realistic expectations are always our priority. Please take time to read the key information below.</p>
          </div>

          <div className="ah-safety-strip-wrapper">
            <div className="ah-safety-strip">
              {displaySafety.map((text, i) => (
                <div className="ah-safety-col" key={i}>
                  <div className="ah-safety-icon-frame">
                    {SAFETY_ICONS[i % SAFETY_ICONS.length]}
                  </div>
                  <p className="ah-safety-statement">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {(approachTitle || approachRows.length > 0) && (
        <section className="ah-approach">
          <div className="container">
            <div className="ah-approach-box">
              <div className="ah-approach-left">
                <span className="ah-section-label">THE SKIN SILHOUETTE APPROACH</span>
                <h2>{approachTitle}</h2>
                {approachSub && <p>{approachSub}</p>}
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ah-btn-white">
                  BOOK YOUR CONSULTATION &rarr;
                </a>
              </div>
              {approachRows.length > 0 && (
                <div className="ah-approach-right">
                  {approachRows.map((rowText, i) => (
                    <div className="ah-approach-row" key={i}>
                      <div className="ah-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          <polyline points="9 12 11 14 15 10"></polyline>
                        </svg>
                      </div>
                      <p>{rowText}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './TreatmentCollectionHub.css';

export default function TreatmentCollectionHub({ treatment }) {
  if (!treatment) return null;

  const {
    title,
    category,
    image,
    heroSub,
    heroPillars = [],
    indications = [],
    centerImage,
    howItWorks = {},
    results = {},
    collection = [],
    combos = [],
    anchorHeadline,
    anchorSubtext,
    anchorImage
  } = treatment;

  return (
    <div className="collection-hub-wrapper">
      
      <section className="ch-hero">
        <div className="container ch-hero-container">
          <div className="ch-hero-left">
            <span className="ch-badge">{category}</span>
            <h1 className="ch-title">{title}</h1>
            {heroSub && <p className="ch-sub">{heroSub}</p>}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ch-btn-white">
              BOOK CONSULTATION &rarr;
            </a>
          </div>
        </div>

        <div className="ch-hero-media-wrapper">
          {image && (
            <div className="ch-hero-img-blend">
              <img src={image} alt={title} />
              <div className="ch-hero-gradient-overlay"></div>
            </div>
          )}

          <div className="ch-hero-circles-art" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none">
              <circle cx="85" cy="100" r="65" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.6" />
              <circle cx="125" cy="100" r="65" stroke="#C8A96A" strokeWidth="1" strokeOpacity="0.6" />
            </svg>
          </div>

          {heroPillars.length > 0 && (
            <div className="ch-pillars">
              {heroPillars.map((p, i) => <span key={i}>{p}</span>)}
            </div>
          )}
        </div>
      </section>

      {(indications.length > 0 || centerImage || howItWorks.desc) && (
        <section className="ch-indications">
          <div className="container ch-ind-grid">
            {indications.length > 0 && (
              <div className="ch-ind-left">
                <span className="ch-section-label">IS THIS FOR YOU?</span>
                <h2>Targets more than just surface change.</h2>
                <p>{heroSub}</p>
                <ul className="ch-check-list">
                  {indications.map((ind, i) => (
                    <li key={i}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary-gold)" strokeWidth="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {centerImage && (
              <div className="ch-ind-center">
                <img src={centerImage} alt={title} />
              </div>
            )}

            {(howItWorks.desc || results.desc) && (
              <div className="ch-ind-right">
                {howItWorks.desc && (
                  <div className="ch-info-card">
                    <h4>{howItWorks.title}</h4>
                    <p>{howItWorks.desc}</p>
                  </div>
                )}
                {results.desc && (
                  <div className="ch-info-card">
                    <h4>{results.title}</h4>
                    <p>{results.desc}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {collection.length > 0 && (
        <section className="ch-collection">
          <div className="container">
            <div className="ch-coll-head">
              <span className="ch-section-label">OUR COLLECTION</span>
              <h2>Advanced treatments. Real skin benefits.</h2>
            </div>
            <div className="ch-coll-grid">
              {collection.map((item, i) => (
                <motion.div className="ch-coll-card" key={i} whileHover={{ y: -4 }} whileTap={universalTouchSquash}>
                  {item.img && (
                    <div className="ch-coll-img">
                      <img src={item.img} alt={item.title} loading="lazy" />
                    </div>
                  )}
                  <div className="ch-coll-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <a href={item.link || BOOKING_URL} className="ch-learn-more">
                      LEARN MORE &rarr;
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {combos.length > 0 && (
        <section className="ch-combo">
          <div className="container">
            <div className="ch-combo-box">
              <div className="ch-combo-left">
                <span className="ch-section-label">COMBINATION THERAPY</span>
                <h2>A more complete approach.</h2>
                <p>{heroSub}</p>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ch-btn-white">
                  EXPLORE COMBINATION OPTIONS &rarr;
                </a>
              </div>
              <div className="ch-combo-right">
                {combos.map((combo, i) => (
                  <div className="ch-combo-item" key={i}>
                    <div className="ch-combo-icon" aria-hidden="true">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    </div>
                    <div className="ch-combo-text">
                      <h4>{combo.title}</h4>
                      <p>{combo.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {(anchorHeadline || anchorImage) && (
        <section className="ch-anchor">
          <div className="container ch-anchor-grid">
            <div className="ch-anchor-text">
              <h2>{anchorHeadline}</h2>
              <p>{anchorSubtext}</p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="ch-btn-black">
                BOOK CONSULTATION &rarr;
              </a>
            </div>
            {anchorImage && (
              <div className="ch-anchor-img">
                <img src={anchorImage} alt={title} loading="lazy" />
              </div>
            )}
          </div>
        </section>
      )}

    </div>
  );
}

import React from 'react';
import StatsBar from '../components/StatsBar.jsx';
import Review from '../components/Review.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { CLINIC_CONTENT } from '../data/content.js';
import { ASSETS } from '../assets.js';
import './Hydrofacial.css';

export default function Hydrofacial() {
  return (
    <>
      <div className="hydro-page-wrapper">
        
        {/* 1. EDITORIAL HERO */}
        <section className="hydro-hero-section">
          <div className="hydro-hero-bg-overlay"></div>
          <div className="container">
            <div className="hydro-hero-content">
              <span className="hydro-hero-badge">TREATMENTS</span>
              <h1 className="hydro-hero-title">
                Mrs Chris Special<br />Hydrofacial Treatment
              </h1>
              <p className="hydro-hero-desc">
                A complete facial transformation that makes our patient look radiant. We craft timeless looks tailored to your unique features.
              </p>
              <div className="hydro-hero-actions">
                <a href="https://wa.me/2348140000000" target="_blank" rel="noopener noreferrer" className="btn-hydro-gold">
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ULTRA-SLIM DARK STATS RIBBON */}
        <StatsBar variant="dark" />

        {/* 3. THE BRIEF (EDITORIAL CENTERED) */}
        <section className="hydro-brief-section">
          <div className="container">
            <div className="hydro-brief-content-wrapper">
              <span className="hydro-brief-tag">{CLINIC_CONTENT.about.badge}</span>
              <h2 className="hydro-brief-title">{CLINIC_CONTENT.about.title}</h2>
              <div className="hydro-brief-paragraphs">
                <p>{CLINIC_CONTENT.about.practitioner_statement}</p>
                <p>{CLINIC_CONTENT.about.p1}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. THE WORK (SHARP SQUARE EDGE FEATURED FRAME + 4-MOSAIC GRID) [1] */}
        <section className="hydro-work-section">
          <div className="container">
            <div className="hydro-work-head">
              <span className="hydro-work-tag">THE WORK</span>
            </div>

            {/* MAIN FEATURED PROCEDURE PHOTO (ZERO ROUNDING) */}
            <div className="hydro-featured-frame">
              <img src={ASSETS.case_study_work_main} alt="Hydrofacial Procedure Action" />
            </div>

            {/* 4-ACTION MOSAIC GRID (ZERO ROUNDING, FLUSH SQUARE EDGES) [1] */}
            <div className="hydro-mosaic-grid">
              <div className="hydro-mosaic-card">
                <img src={ASSETS.hydro_mosaic_1} alt="Steam Mist Facial Treatment" loading="lazy" />
              </div>
              <div className="hydro-mosaic-card">
                <img src={ASSETS.hydro_mosaic_2} alt="Goggles Practitioner Wand Procedure" loading="lazy" />
              </div>
              <div className="hydro-mosaic-card">
                <img src={ASSETS.hydro_mosaic_3} alt="Laser Procedure Action" loading="lazy" />
              </div>
              <div className="hydro-mosaic-card">
                <img src={ASSETS.hydro_mosaic_4} alt="Facial Cleansing Steam" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* 5. UNIFIED CLIENT REVIEW */}
        <Review />

        {/* 6. RESTORING YOUTH BREAKOUT (MOUNTED WITH BODY STOMACH ASSET) [1] */}
        <RestoringYouth customImage={ASSETS.case_study_ry_body} />

      </div>
      
      {/* 7. OVERLAPPING CTA BANNER & FOOTER */}
      <CtaBanner />
    </>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { ArrowUpRightIcon } from '../components/Icons.jsx';
import { CLINIC_CONTENT } from '../data/content.js';
import { ASSETS } from '../assets.js';
import './About.css';

export default function About() {
  const [activeTab, setActiveTab] = useState('vision');

  return (
    <div className="about-page-wrapper">
      
      {/* TIER 1: HIGH-CONTRAST MARQUEE RIBBON */}
      <div className="about-marquee-ribbon">
        <div className="about-marquee-track">
          <span className="about-marquee-item">
            TRICHOLOGY <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> COSMETOLOGY <span className="gold-star spinning-star">✦</span> SKIN <span className="gold-star spinning-star">✦</span> HAIR <span className="gold-star spinning-star">✦</span> NAILS <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span> TRICHOLOGY <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> COSMETOLOGY <span className="gold-star spinning-star">✦</span> SKIN <span className="gold-star spinning-star">✦</span> HAIR <span className="gold-star spinning-star">✦</span> NAILS <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span>
          </span>
          <span className="about-marquee-item" aria-hidden="true">
            TRICHOLOGY <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> COSMETOLOGY <span className="gold-star spinning-star">✦</span> SKIN <span className="gold-star spinning-star">✦</span> HAIR <span className="gold-star spinning-star">✦</span> NAILS <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span> TRICHOLOGY <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> COSMETOLOGY <span className="gold-star spinning-star">✦</span> SKIN <span className="gold-star spinning-star">✦</span> HAIR <span className="gold-star spinning-star">✦</span> NAILS <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span>
          </span>
        </div>
      </div>

      {/* TIER 2: COMPANY OVERVIEW NARRATIVE INSIDE WHITE CARD */}
      <section className="about-hero-section">
        <div className="container about-hero-grid">
          
          <motion.div 
            className="about-hero-card"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="about-pill-badge">
              <span>• About Skin Silhouette Aesthetics</span>
            </div>
            
            <KineticText 
              text="A Leading Clinical Aesthetic Practice" 
              className="about-hero-title"
              tag="h1"
            />

            {/* EXTRACTED NARRATIVE FROM COMPANY OVERVIEW */}
            <p className="about-hero-body">
              {CLINIC_CONTENT.about.p1}
            </p>
            <p className="about-hero-body" style={{ marginTop: '1rem' }}>
              {CLINIC_CONTENT.about.p2}
            </p>

            {/* IMMUNIZED VECTOR DOWNLOAD BUTTON */}
            <div className="about-hero-btns">
              <a 
                href="/profile.pdf" 
                download 
                className="btn-download-profile"
                aria-label="Download Clinic Profile"
              >
                <span>DOWNLOAD PROFILE</span>
                <ArrowUpRightIcon size={13} color="currentColor" />
              </a>
            </div>
          </motion.div>

          {/* BRANDED MIRROR & PRODUCT HERO ASSET */}
          <motion.div 
            className="about-hero-image-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img src={ASSETS.about_hero} alt="Skin Silhouette Aesthetics Official Branding" />
          </motion.div>

        </div>
      </section>

      {/* TIER 3: VERBATIM MISSION & VISION DARK ACCORDION */}
      <section className="about-dark-section">
        <div className="container">
          <div className="about-accordion-list">
            
            {/* OUR VISION ACCORDION */}
            <div className={`about-accordion-item ${activeTab === 'vision' ? 'active' : ''}`}>
              <div className="about-accordion-header" onClick={() => setActiveTab('vision')}>
                <h3>Our Vision</h3>
                <span className="about-accordion-icon">{activeTab === 'vision' ? '−' : '+'}</span>
              </div>
              
              <AnimatePresence initial={false}>
                {activeTab === 'vision' && (
                  <motion.div 
                    className="about-accordion-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="about-accordion-content-grid">
                      {/* VERBATIM VISION TEXT */}
                      <p className="about-accordion-desc">
                        {CLINIC_CONTENT.missionVision.vision}
                      </p>
                      <div className="about-accordion-image-wrap">
                        <img src={ASSETS.about_mission} alt="Skin Silhouette Aesthetics Vision" loading="lazy" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* OUR MISSION ACCORDION */}
            <div className={`about-accordion-item ${activeTab === 'mission' ? 'active' : ''}`}>
              <div className="about-accordion-header" onClick={() => setActiveTab('mission')}>
                <h3>Our Mission</h3>
                <span className="about-accordion-icon">{activeTab === 'mission' ? '−' : '+'}</span>
              </div>
              
              <AnimatePresence initial={false}>
                {activeTab === 'mission' && (
                  <motion.div 
                    className="about-accordion-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="about-accordion-content-grid">
                      {/* VERBATIM MISSION TEXT */}
                      <p className="about-accordion-desc">
                        {CLINIC_CONTENT.missionVision.mission}
                      </p>
                      <div className="about-accordion-image-wrap">
                        <img src={ASSETS.about_mission} alt="Skin Silhouette Aesthetics Mission" loading="lazy" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

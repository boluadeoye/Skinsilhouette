import React, { useState } from 'react';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { CLINIC_CONTENT } from '../data/content.js';
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './BlogDetail.css';

export default function BlogDetail() {
  const [swapped, setSwapped] = useState(false);

  return (
    <div className="blog-detail-page-wrapper">
      <section className="blog-detail-hero-section">
        <div className="container">
          <div className="blog-detail-hero-banner-card">
            <motion.div className="blog-detail-hero-media" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <img src={ASSETS.blog_detail_hero} alt="Aesthetic Medicine Specialist" />
            </motion.div>
            <motion.div className="blog-detail-hero-card" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <span className="blog-detail-gold-badge">INSPIRATION</span>
              <h1 className="blog-detail-hero-title">AESTHETIC MEDICINE:<br />CHOOSING THE<br />RIGHT SPECIALIST</h1>
              <p className="blog-detail-hero-desc">
                Aesthetic medicine is a fusion of the concepts of health, beauty and science. I want to emphasize, certain methods of which can be used by nursing staff.
              </p>
              <div className="blog-detail-meta-row">
                <div className="blog-detail-meta-item"><span className="meta-label">Posted by</span><span className="meta-val">Admin</span></div>
                <div className="blog-detail-meta-item"><span className="meta-label">Date</span><span className="meta-val">Aug 15, 2026</span></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="blog-detail-narrative-section">
        <div className="container">
          <div className="blog-detail-narrative-box">
            <p>{CLINIC_CONTENT.about.practitioner_statement}</p>
            <p style={{ marginTop: '1.25rem' }}>{CLINIC_CONTENT.about.p1}</p>
          </div>
        </div>
      </section>

      <section className="blog-detail-mosaic-section">
        <div className="container">
          <motion.div className="blog-detail-mosaic-grid" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <motion.div className="blog-detail-mosaic-card card-tall" whileHover={{ scale: 1.03 }} whileTap={universalTouchSquash}>
              <img src={ASSETS.blog_detail_m1} alt="Clinical LED Light Therapy" loading="lazy" />
            </motion.div>
            <motion.div className="blog-detail-mosaic-card card-tall" whileHover={{ scale: 1.03 }} whileTap={universalTouchSquash}>
              <img src={ASSETS.blog_detail_m2} alt="Infrared Light Panel Therapy" loading="lazy" />
            </motion.div>
            <motion.div className="blog-detail-mosaic-card card-short" whileHover={{ scale: 1.03 }} whileTap={universalTouchSquash}>
              <img src={ASSETS.blog_detail_m3} alt="Body Cupping Treatment" loading="lazy" />
            </motion.div>
            <motion.div className="blog-detail-mosaic-card card-short" whileHover={{ scale: 1.03 }} whileTap={universalTouchSquash}>
              <img src={ASSETS.blog_detail_m4} alt="Red Light Body Therapy" loading="lazy" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="blog-detail-specialist-section">
        <div className="container">
          <div className="blog-detail-specialist-box">
            <span className="blog-detail-gold-badge">WHAT TO LOOK AT IN A SPECIALIST</span>
            <KineticText text="SERVICES OF THE HIGHEST QUALITY" className="blog-detail-specialist-title" tag="h2" />
            <p className="blog-detail-specialist-p">{CLINIC_CONTENT.about.practitioner_statement}</p>
            <p className="blog-detail-specialist-p" style={{ marginTop: '1.25rem' }}>{CLINIC_CONTENT.about.p2}</p>
          </div>
        </div>
      </section>

      {/* RESTORING YOUTH WITH 50+ PATIENTS & BOOK CONSULTATION */}
      <section className="blog-detail-ry-section">
        <div className="container">
          <div className="blog-detail-ry-white-card">
            <div className="blog-detail-ry-flex-wrapper">
              <div className="blog-detail-ry-text-block">
                <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
                <h2 className="ry-title-dark">RESTORING YOUR<br />YOUTH IS ONE<br />CALL AWAY</h2>
                <p className="ry-desc-dark">
                  On your first visit to the clinic, you will receive a consultation with a specialist.
                </p>
                <div className="ry-metrics-row-dark">
                  <div className="ry-metric-dark"><h3>50+</h3><p>PATIENTS TREATED</p></div>
                  <div className="ry-metric-dark"><h3>5.0</h3><p>STAR REVIEWS</p></div>
                </div>
                <div className="ry-btn-wrap">
                  <a href="https://wa.me/2348140000000" target="_blank" rel="noopener noreferrer" className="btn-ry-black">
                    Book Consultation
                  </a>
                </div>
              </div>

              <div className="blog-detail-ry-media-col" onClick={() => setSwapped(!swapped)} style={{ cursor: 'pointer' }} role="button" aria-label="Click to swap before and after views">
                <div className="blog-detail-ry-image-frame">
                  <div className="blog-detail-ry-pip-bg">
                    <img src={ASSETS.blog_detail_ry} alt={swapped ? "Before Result" : "After Result"} className={`blog-detail-ry-fused-img ${swapped ? 'blog-detail-ry-img-left' : 'blog-detail-ry-img-right'}`} loading="lazy" />
                    <span className="blog-detail-ry-badge blog-detail-ry-badge-after">{swapped ? 'BEFORE' : 'AFTER'}</span>
                  </div>
                  <div className="blog-detail-ry-pip-inset">
                    <img src={ASSETS.blog_detail_ry} alt={swapped ? "After Result" : "Before Result"} className={`blog-detail-ry-fused-img ${swapped ? 'blog-detail-ry-img-right' : 'blog-detail-ry-img-left'}`} loading="lazy" />
                    <span className="blog-detail-ry-badge blog-detail-ry-badge-before">{swapped ? 'AFTER' : 'BEFORE'}</span>
                  </div>
                  <div className="blog-detail-ry-junction-badge" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                      <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-detail-outro-section">
        <div className="container">
          <div className="blog-detail-narrative-box"><p>{CLINIC_CONTENT.about.p1}</p></div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

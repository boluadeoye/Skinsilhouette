import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatsBar from '../components/StatsBar.jsx';
import Review from '../components/Review.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { fetchCaseStudyBySlug } from '../services/api.js';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './CaseStudyDetail.css';

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCaseStudyBySlug(slug).then((data) => {
      setCaseStudy(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="case-study-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading case study from clinical records...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="case-study-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <h2>Case Study Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>The requested patient case study is unavailable.</p>
        </div>
      </div>
    );
  }

  const bgImage = caseStudy.featuredImage || caseStudy.workMainImage;
  const gallery = caseStudy.gallery || [];
  const galleryCount = gallery.length;

  return (
    <div className="case-study-page-wrapper">
      
      {/* 1. DYNAMIC EDITORIAL HERO */}
      <section 
        className="cs-hero-section" 
        style={bgImage ? { 
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        } : { backgroundColor: 'var(--dark-onyx)' }}
      >
        <div className="cs-hero-bg-overlay"></div>
        <div className="container">
          <div className="cs-hero-content">
            <span className="cs-hero-badge">{caseStudy.category}</span>
            <h1 className="cs-hero-title">{caseStudy.title}</h1>
            <p className="cs-hero-desc">
              Clinical aesthetic transformation for {caseStudy.patientName}. Evidence-led treatment delivering subtle, natural-looking results.
            </p>
            <div className="cs-hero-actions">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-cs-gold">
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SLIM DARK STATS RIBBON */}
      <StatsBar variant="dark" />

      {/* 3. THE BRIEF */}
      {caseStudy.briefDescription && (
        <section className="cs-brief-section">
          <div className="container">
            <div className="cs-brief-content-wrapper">
              <span className="cs-brief-tag">• THE BRIEF</span>
              <h2 className="cs-brief-title">{caseStudy.briefTitle}</h2>
              <div className="cs-brief-paragraphs">
                <p>{caseStudy.briefDescription}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. THE WORK: RENDERS ONLY IF IMAGES ARE ACTUALLY UPLOADED IN WORDPRESS */}
      {(caseStudy.workMainImage || galleryCount > 0) && (
        <section className="cs-work-section">
          <div className="container">
            <div className="cs-work-head">
              <span className="cs-work-tag">THE WORK</span>
            </div>

            {caseStudy.workMainImage && (
              <div className="cs-featured-frame">
                <img src={caseStudy.workMainImage} alt="Clinical Treatment Result" />
              </div>
            )}

            {/* ADAPTIVE LIVE GALLERY: 0 FALLBACKS */}
            {galleryCount > 0 && (
              <div className={`cs-adaptive-mosaic-grid count-${galleryCount}`}>
                {gallery.map((imgUrl, index) => (
                  <motion.div 
                    key={index} 
                    className={`cs-mosaic-card item-${index + 1}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={universalTouchSquash}
                  >
                    <img src={imgUrl} alt={`Clinical Step ${index + 1}`} loading="lazy" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. CLIENT REVIEW */}
      <Review />

      {/* 6. DYNAMIC RESTORING YOUTH BREAKOUT */}
      {caseStudy.breakoutImage && (
        <RestoringYouth customImage={caseStudy.breakoutImage} />
      )}

      {/* 7. CTA BANNER */}
      <CtaBanner />

    </div>
  );
}

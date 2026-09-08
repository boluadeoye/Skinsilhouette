import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { fetchPostBySlug } from '../services/api.js';
import { ASSETS } from '../assets.js';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash } from '../utils/motion.js';
import './BlogDetail.css';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    fetchPostBySlug(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading article from clinical records...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-detail-page-wrapper">
        <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
          <h2>Article Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>The requested clinical journal entry is unavailable.</p>
        </div>
      </div>
    );
  }

  const gallery = post.gallery || [];
  const galleryCount = gallery.length;

  return (
    <div className="blog-detail-page-wrapper">
      
      {/* 1. ATELIER TAN HERO (SLUG HYDRATED) */}
      <section className="blog-detail-hero-section">
        <div className="container">
          <div className="blog-detail-hero-banner-card">
            
            {post.image && (
              <motion.div 
                className="blog-detail-hero-media"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <img src={post.image} alt={post.title} />
              </motion.div>
            )}

            <motion.div 
              className="blog-detail-hero-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <span className="blog-detail-gold-badge">{post.category}</span>
              <h1 className="blog-detail-hero-title">{post.title}</h1>
              {post.excerpt && <p className="blog-detail-hero-desc">{post.excerpt}</p>}
              
              <div className="blog-detail-meta-row">
                <div className="blog-detail-meta-item">
                  <span className="meta-label">Posted by</span>
                  <span className="meta-val">{post.author}</span>
                </div>
                <div className="blog-detail-meta-item">
                  <span className="meta-label">Date</span>
                  <span className="meta-val">{post.date}</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. DYNAMIC NARRATIVE CONTENT */}
      {post.content && (
        <section className="blog-detail-narrative-section">
          <div className="container">
            <div className="blog-detail-narrative-box" dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </section>
      )}

      {/* 3. ADAPTIVE GALLERY ENGINE (1, 2, 3, 4, OR 6+ IMAGES) */}
      {galleryCount > 0 && (
        <section className="blog-detail-mosaic-section">
          <div className="container">
            <div className={`blog-detail-adaptive-gallery gallery-count-${galleryCount}`}>
              {gallery.map((imgUrl, index) => (
                <motion.div 
                  key={index} 
                  className={`blog-gallery-item item-${index + 1}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={universalTouchSquash}
                >
                  <img src={imgUrl} alt={`Clinical Detail ${index + 1}`} loading="lazy" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. EDITORIAL SPECIALIST SECTION */}
      {post.specialistText && (
        <section className="blog-detail-specialist-section">
          <div className="container">
            <div className="blog-detail-specialist-box">
              <span className="blog-detail-gold-badge">WHAT TO LOOK AT IN A SPECIALIST</span>
              <KineticText text={post.specialistTitle} className="blog-detail-specialist-title" tag="h2" />
              <p className="blog-detail-specialist-p">{post.specialistText}</p>
            </div>
          </div>
        </section>
      )}

      {/* 5. RESTORING YOUTH BREAKOUT (DYNAMIC IMAGE) */}
      <section className="blog-detail-ry-section">
        <div className="container">
          <div className="blog-detail-ry-white-card">
            <div className="blog-detail-ry-flex-wrapper">
              
              <div className="blog-detail-ry-text-block">
                <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
                <h2 className="ry-title-dark">Your Treatment Begins<br />With a Consultation.</h2>
                <p className="ry-desc-dark">
                  On your first visit to the clinic, you will receive an in-depth consultation with our lead practitioner.
                </p>
                <div className="ry-metrics-row-dark">
                  <div className="ry-metric-dark"><h3>50+</h3><p>PATIENTS TREATED</p></div>
                  <div className="ry-metric-dark"><h3>5.0</h3><p>STAR REVIEWS</p></div>
                </div>
                <div className="ry-btn-wrap">
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-ry-black">
                    Book Consultation
                  </a>
                </div>
              </div>

              <div 
                className="blog-detail-ry-media-col" 
                onClick={() => setSwapped(!swapped)} 
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label="Click to swap before and after views"
              >
                <div className="blog-detail-ry-image-frame">
                  <div className="blog-detail-ry-pip-bg">
                    <img 
                      src={post.ryImage || ASSETS.blog_detail_ry} 
                      alt="Clinical Transformation" 
                      className={`blog-detail-ry-fused-img ${swapped ? 'blog-detail-ry-img-left' : 'blog-detail-ry-img-right'}`}
                      loading="lazy" 
                    />
                    <span className="blog-detail-ry-badge blog-detail-ry-badge-after">{swapped ? 'BEFORE' : 'AFTER'}</span>
                  </div>

                  <div className="blog-detail-ry-pip-inset">
                    <img 
                      src={post.ryImage || ASSETS.blog_detail_ry} 
                      alt="Clinical Transformation" 
                      className={`blog-detail-ry-fused-img ${swapped ? 'blog-detail-ry-img-right' : 'blog-detail-ry-img-left'}`}
                      loading="lazy" 
                    />
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

      <CtaBanner />
    </div>
  );
}

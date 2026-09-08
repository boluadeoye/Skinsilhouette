import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import KineticText from '../components/KineticText.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { fetchJournalPosts, fetchCategories } from '../services/api.js';
import { ASSETS } from '../assets.js';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './Blog.css';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    Promise.all([fetchJournalPosts(), fetchCategories()]).then(([postsData, catsData]) => {
      setArticles(postsData);
      setCategories(catsData);
      setLoading(false);
    });
  }, []);

  const filteredArticles = activeCategory === "All"
    ? articles
    : articles.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="blog-page-wrapper">
      <section className="blog-hero-section">
        <div className="container blog-hero-grid">
          <motion.div 
            className="blog-hero-image-wrap"
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img src={ASSETS.blog_hero} alt="Clinical Journal" />
          </motion.div>

          <motion.div 
            className="blog-hero-text-card"
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="blog-tag-badge">Clinical Journal</span>
            <KineticText text="Insights, Trends & Expert Clinical Education" className="blog-hero-heading" tag="h1" />
            <a href="#articles" className="blog-explore-btn">
              <span>Explore Journal</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* DYNAMIC CATEGORIES FETCHED FROM API */}
      <section className="blog-filter-section" id="articles">
        <div className="container">
          <div className="blog-tags-scroll-track">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                className={`blog-tag-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.08 }}
                whileTap={universalTouchSquash}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-matrix-section">
        <div className="container">
          {loading && (
            <div className="blog-empty-state">
              <p>Loading journal entries from clinic database...</p>
            </div>
          )}

          {!loading && filteredArticles.length === 0 && (
            <div className="blog-empty-state">
              <p>No journal entries available in this category.</p>
            </div>
          )}

          {!loading && filteredArticles.length > 0 && (
            <motion.div 
              className="blog-staggered-grid"
              variants={staggerGridContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredArticles.map((article) => (
                <motion.div 
                  key={article.id} 
                  className="blog-article-card"
                  variants={staggerCardExtreme}
                  whileHover={{ y: -8 }}
                >
                  <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {article.image && (
                      <div className="blog-card-media-wrap">
                        <img src={article.image} alt={article.title} loading="lazy" />
                        {article.category.toLowerCase().includes('video') && (
                          <motion.div 
                            className="blog-card-play-button" 
                            aria-label="Play Video"
                            whileHover={{ scale: 1.25 }}
                            whileTap={universalTouchSquash}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    )}

                    <div className="blog-card-content">
                      <div className="blog-card-meta">
                        <span className="blog-meta-tag">{article.category}</span>
                        <span className="blog-meta-watch">{article.ctaLabel}</span>
                      </div>

                      <h3 className="blog-card-title">{article.title}</h3>
                      <div className="blog-card-divider"></div>

                      <div className="blog-card-footer">
                        <span className="blog-card-date">{article.date}</span>
                        <motion.div 
                          className="blog-card-arrow" 
                          aria-label="Read Article"
                          whileHover={{ rotate: 45, scale: 1.15 }}
                          whileTap={universalTouchSquash}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}

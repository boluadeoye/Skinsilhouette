import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRightIcon } from './Icons.jsx';
import { universalTouchSquash, SPRINGS } from '../utils/motion.js';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [location]);

  return (
    <header className={`luxury-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        
        {/* TWO-TIER ATELIER LOGO */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
          <Link to="/" className="navbar-logo-lockup" aria-label="Skin Silhouette Aesthetics Home">
            <span className="logo-brand-main">Skin Silhouette</span>
            <span className="logo-brand-sub">AESTHETICS</span>
          </Link>
        </motion.div>

        {/* DESKTOP SERIF NAVIGATION LINKS */}
        <nav className="navbar-links">
          {['/', '/services', '/works', '/about', '/blog', '/contact'].map((path) => {
            const labels = { 
              '/': 'Home', 
              '/services': 'Services', 
              '/works': 'Our Works', 
              '/about': 'About', 
              '/blog': 'Blog', 
              '/contact': 'Contact' 
            };
            const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
            return (
              <motion.div key={path} whileHover={{ y: -2 }} whileTap={universalTouchSquash}>
                <Link to={path} className={isActive ? 'active' : ''}>
                  {labels[path]}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* ACTIONS: "BOOK CONSULTATION" */}
        <div className="navbar-actions">
          <motion.a
            href="https://wa.me/2348140000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-nav-cta"
            whileTap={universalTouchSquash}
          >
            <span className="cta-full">BOOK CONSULTATION</span>
            <span className="cta-short">CONSULT</span>
            <ArrowUpRightIcon size={10} color="#FFFFFF" />
          </motion.a>

          <button
            type="button"
            className="mobile-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span className={`burger-line ${mobileMenuOpen ? 'open top' : ''}`}></span>
            <span className={`burger-line ${mobileMenuOpen ? 'open mid' : ''}`}></span>
            <span className={`burger-line ${mobileMenuOpen ? 'open bot' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* MOBILE SERIF DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="navbar-links mobile-open"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRINGS.extremeBouncy}
          >
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/works">Our Works</Link>
            <Link to="/about">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

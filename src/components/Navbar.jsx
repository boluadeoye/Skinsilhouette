import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRightIcon } from './Icons.jsx';
import { BOOKING_URL } from '../data/content.js';
import { universalTouchSquash, SPRINGS } from '../utils/motion.js';
import './Navbar.css';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Treatments' },
  { path: '/blog', label: 'Journal' },
  { path: '/contact', label: 'Contact' }
];

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
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={universalTouchSquash}>
          <Link to="/" className="navbar-logo-lockup" aria-label="Skin Silhouette Aesthetics Home">
            <span className="logo-brand-main">Skin Silhouette</span>
            <span className="logo-brand-sub">AESTHETICS</span>
          </Link>
        </motion.div>

        <nav className="navbar-links">
          {NAV_LINKS.map(({ path, label }) => {
            const isActive = path === '/' 
              ? location.pathname === '/' 
              : (location.pathname.startsWith(path) || (path === '/services' && location.pathname.startsWith('/treatments')) || (path === '/blog' && location.pathname.startsWith('/journal')));

            return (
              <motion.div key={path} whileHover={{ y: -2 }} whileTap={universalTouchSquash}>
                <Link to={path} className={isActive ? 'active' : ''}>
                  {label}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <motion.a
            href={BOOKING_URL}
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

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav 
            className="navbar-links mobile-open"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRINGS.extremeBouncy}
          >
            {NAV_LINKS.map(({ path, label }) => (
              <Link key={path} to={path}>
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

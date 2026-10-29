import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PageTransition from './components/PageTransition.jsx';

import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import TreatmentDispatcher from './pages/TreatmentDispatcher.jsx';
import Works from './pages/Works.jsx';
import CaseStudyDetail from './pages/CaseStudyDetail.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import FAQ from './pages/FAQ.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Contact from './pages/Contact.jsx';
import Membership from './pages/Membership.jsx';
import Booking from './pages/Booking.jsx';
import PatientPortal from './pages/PatientPortal.jsx';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleInternalBookLinks = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && (href === '/book' || href.startsWith('/book?'))) {
        e.preventDefault();
        navigate(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleInternalBookLinks);
    return () => document.removeEventListener('click', handleInternalBookLinks);
  }, [navigate]);

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />

            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/treatments" element={<PageTransition><Services /></PageTransition>} />

            <Route path="/services/:slug" element={<PageTransition><TreatmentDispatcher /></PageTransition>} />
            <Route path="/treatments/:slug" element={<PageTransition><TreatmentDispatcher /></PageTransition>} />

            <Route path="/membership" element={<PageTransition><Membership /></PageTransition>} />
            <Route path="/ssa-club" element={<PageTransition><Membership /></PageTransition>} />

            <Route path="/book" element={<PageTransition><Booking /></PageTransition>} />
            <Route path="/account" element={<PageTransition><PatientPortal /></PageTransition>} />
            <Route path="/portal" element={<PageTransition><PatientPortal /></PageTransition>} />

            <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
            <Route path="/works/:slug" element={<PageTransition><CaseStudyDetail /></PageTransition>} />

            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/journal" element={<PageTransition><Blog /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
            <Route path="/journal/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />

            <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
            <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
            <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

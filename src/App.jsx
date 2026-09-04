import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PageTransition from './components/PageTransition.jsx';

import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Hydrofacial from './pages/Hydrofacial.jsx';
import LaserHairRemoval from './pages/LaserHairRemoval.jsx';
import Works from './pages/Works.jsx';
import About from './pages/About.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import FAQ from './pages/FAQ.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/services/:slug" element={<PageTransition><LaserHairRemoval /></PageTransition>} />
            <Route path="/works" element={<PageTransition><Works /></PageTransition>} />
            <Route path="/works/:slug" element={<PageTransition><Hydrofacial /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
            
            {/* OFFICIAL BLOG DETAIL ROUTE */}
            <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />
            
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

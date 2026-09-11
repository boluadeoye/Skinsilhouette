import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import MagneticButton from './MagneticButton.jsx';
import { ArrowUpRightIcon } from './Icons.jsx';
import { ASSETS } from '../assets.js';
import { universalTouchSquash, staggerGridContainer, staggerCardExtreme } from '../utils/motion.js';
import './AvailableTreatments.css';

const HERO_CARD = {
  id: 1,
  tag: "INJECTABLES",
  title: "Regenerative Injectables",
  image: ASSETS.available_1,
  slug: "regenerative-injectables"
};

const GRID_CARDS = [
  {
    id: 2,
    tag: "TREATMENTS",
    title: "Skin Remodelling",
    image: ASSETS.available_2,
    slug: "skin-remodelling"
  },
  {
    id: 3,
    tag: "TREATMENTS",
    title: "Anti-Wrinkle Treatments",
    image: ASSETS.available_3,
    slug: "anti-wrinkle-treatments"
  },
  {
    id: 4,
    tag: "INJECTABLES",
    title: "Dermal Fillers",
    image: ASSETS.available_dermal,
    slug: "dermal-fillers"
  },
  {
    id: 5,
    tag: "INJECTABLES",
    title: "Fat Dissolving",
    image: ASSETS.blog_2,
    slug: "fat-dissolving"
  }
];

export default function AvailableTreatments() {
  return (
    <section className="available-treatments-section" id="services">
      <div className="container">
        
        <div className="editorial-section-head">
          <span className="editorial-section-badge">THE TREATMENT EDIT</span>
          <KineticText text="Our Treatments" tag="h2" />
          <p>Bespoke aesthetic and regenerative procedures tailored to enhance your natural features.</p>
        </div>

        <motion.div 
          className="available-5card-asym"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div 
            className="card-large-hero"
            variants={staggerCardExtreme}
            whileHover={{ y: -6 }}
            whileTap={universalTouchSquash}
          >
            <div className="card-gradient-overlay"></div>
            <img src={HERO_CARD.image} alt={HERO_CARD.title} loading="lazy" />
            <div className="card-inner-content">
              <span className="card-tag">{HERO_CARD.tag}</span>
              <h3 className="card-title-large">{HERO_CARD.title}</h3>
              <Link to={`/services/${HERO_CARD.slug}`} className="book-link">
                <span>BOOK NOW</span>
                <ArrowUpRightIcon size={12} color="#FFFFFF" />
              </Link>
            </div>
          </motion.div>

          <div className="card-grid-2x2">
            {GRID_CARDS.map((item) => (
              <motion.div 
                key={item.id}
                className="card-small-item"
                variants={staggerCardExtreme}
                whileHover={{ y: -6 }}
                whileTap={universalTouchSquash}
              >
                <div className="card-gradient-overlay"></div>
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="card-inner-content">
                  <span className="card-tag">{item.tag}</span>
                  <h4 className="card-title-small">{item.title}</h4>
                  <Link to={`/services/${item.slug}`} className="book-link">
                    <span>BOOK NOW</span>
                    <ArrowUpRightIcon size={12} color="#FFFFFF" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="available-cta-wrap">
          <MagneticButton href="/services" className="btn-black-center" strength={25}>
            View All Services
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}

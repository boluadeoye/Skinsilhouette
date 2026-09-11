import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import MagneticButton from './MagneticButton.jsx';
import { ArrowRightIcon } from './Icons.jsx';
import { ASSETS } from '../assets.js';
import { universalTouchSquash } from '../utils/motion.js';
import './EditorialGrid.css';

export default function EditorialGrid() {
  return (
    <section className="editorial-journal-section">
      <div className="container">
        
        <div className="editorial-section-head">
          <span className="editorial-section-badge">• Journal</span>
          <KineticText text="From Our Journal" tag="h2" />
          <p>Clinical perspectives, skin health philosophy, and evidence-led aesthetic insights.</p>
        </div>

        <div className="editorial-dual-grid">
          <motion.div className="editorial-card-main" whileTap={universalTouchSquash}>
            <div className="editorial-media-frame">
              <img src={ASSETS.editorial_main} alt="Clinical Specialist Journal" loading="lazy" />
            </div>
            <div className="editorial-card-body">
              <span className="editorial-meta-date">AUGUST 2026</span>
              <h3 className="editorial-title">Aesthetic Medicine: Choosing The Right Specialist</h3>
              <p className="editorial-snippet">
                Why practitioner qualification, anatomical mastery, and ethical consultation planning dictate clinical longevity.
              </p>
              <a href="/journal" className="editorial-read-link">
                <span>READ ARTICLE</span>
                <ArrowRightIcon size={11} color="currentColor" />
              </a>
            </div>
          </motion.div>

          <div className="editorial-side-stack">
            <motion.div className="editorial-card-stacked" whileTap={universalTouchSquash}>
              <div className="editorial-stack-media">
                <img src={ASSETS.editorial_top} alt="Skin Remodelling Philosophy" loading="lazy" />
              </div>
              <div className="editorial-stack-body">
                <span className="editorial-meta-date">JULY 2026</span>
                <h4 className="editorial-stack-title">Understanding Melanin-Rich Skin in Aesthetics</h4>
                <a href="/journal" className="editorial-read-link">
                  <span>READ ARTICLE</span>
                  <ArrowRightIcon size={11} color="currentColor" />
                </a>
              </div>
            </motion.div>

            <motion.div className="editorial-card-stacked" whileTap={universalTouchSquash}>
              <div className="editorial-stack-media">
                <img src={ASSETS.editorial_bot} alt="Cellular Skin Health" loading="lazy" />
              </div>
              <div className="editorial-stack-body">
                <span className="editorial-meta-date">JUNE 2026</span>
                <h4 className="editorial-stack-title">The Role of Regenerative Bio-Stimulators</h4>
                <a href="/journal" className="editorial-read-link">
                  <span>READ ARTICLE</span>
                  <ArrowRightIcon size={11} color="currentColor" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="editorial-cta-wrap">
          <MagneticButton href="/journal" className="btn-black-center" strength={25}>
            Explore Journal
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}

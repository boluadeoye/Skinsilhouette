import React from 'react';
import { motion } from 'framer-motion';
import KineticText from './KineticText.jsx';
import { staggerGridContainer, staggerCardExtreme, universalTouchSquash } from '../utils/motion.js';
import './SilhouetteJourney.css';

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "CONSULTATION",
    description: "A focused conversation to understand your concerns, goals and treatment history."
  },
  {
    step: "02",
    title: "CLINICAL ANALYSIS",
    description: "In-depth assessment to determine suitability and guide treatment."
  },
  {
    step: "03",
    title: "TREATMENT CURATION",
    description: "A personalised treatment strategy, selected and sequenced around your individual needs."
  },
  {
    step: "04",
    title: "CONTINUITY",
    description: "Ongoing review and maintenance to support your results and long-term skin health."
  }
];

export default function SilhouetteJourney() {
  return (
    <section className="journey-section">
      <div className="container">
        <div className="journey-header">
          <span className="journey-badge-tag">• CLINICAL PATHWAY</span>
          <KineticText 
            text="THE SILHOUETTE JOURNEY" 
            className="journey-main-title" 
            tag="h2" 
          />
        </div>

        <motion.div 
          className="journey-timeline-container"
          variants={staggerGridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="journey-track-line" aria-hidden="true"></div>

          <div className="journey-steps-grid">
            {JOURNEY_STEPS.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="journey-step-node"
                variants={staggerCardExtreme}
                whileHover={{ y: -4 }}
                whileTap={universalTouchSquash}
              >
                <div className="journey-node-circle">
                  <span>{item.step}</span>
                </div>

                <div className="journey-node-content">
                  <h3 className="journey-step-title">
                    <span className="journey-step-num-inline">{item.step} — </span>
                    {item.title}
                  </h3>
                  <p className="journey-step-desc">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

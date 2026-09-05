import React from 'react';
import { ASSETS } from '../assets.js';
import './RestoringYouth.css';

export default function RestoringYouth({ customImage }) {
  // Uses customImage if passed, defaults to the new asset
  const activeSrc = customImage || ASSETS.ry_home || ASSETS.works_redhead;

  return (
    <section className="ry-boundary-section">
      <div className="container">
        <div className="ry-grid-master">
          
          {/* SLIM SHARP BLACK CARD */}
          <div className="ry-dark-card">
            <div className="ry-content-inner">
              <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
              
              <h2 className="ry-title">
                RESTORING YOUR<br />YOUTH IS ONE<br />CALL AWAY
              </h2>
              
              <p className="ry-desc">
                We make it a priority to not only listen to your story, but to also address any questions or concerns that you may have about the services offered at our clinic.
              </p>
              
              {/* METRIC: 50+ PATIENTS TREATED */}
              <div className="ry-metrics-row">
                <div className="ry-metric">
                  <h3>50+</h3>
                  <p>PATIENTS TREATED</p>
                </div>
                <div className="ry-metric">
                  <h3>5.0</h3>
                  <p>STAR REVIEWS</p>
                </div>
              </div>

              {/* ACTION: BOOK CONSULTATION */}
              <div className="ry-btn-wrap">
                <a 
                  href="https://wa.me/2348140000000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ry-white"
                >
                  Book Consultation
                </a>
              </div>
            </div>
          </div>

          {/* SINGLE CLEAN TALL IMAGE (PIP REMOVED) */}
          <div className="ry-media-col">
            <div className="ry-image-frame">
              <img 
                src={activeSrc} 
                alt="Skin Silhouette Aesthetics Clinical Result" 
                className="ry-fused-img"
                loading="lazy" 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { ASSETS } from '../assets.js';
import './RestoringYouth.css';

export default function RestoringYouth({ customImage }) {
  const [swapped, setSwapped] = useState(false);

  // Dynamic image resolution: Uses customImage if passed, defaults to ry_home
  const activeSrc = customImage || ASSETS.ry_home || ASSETS.works_redhead;

  const handleSwap = () => {
    setSwapped(!swapped);
  };

  return (
    <section className="ry-boundary-section">
      <div className="container">
        <div className="ry-grid-master">
          
          {/* THE SLIM SHARP BLACK CARD */}
          <div className="ry-dark-card">
            <div className="ry-content-inner">
              <span className="ry-gold-badge">ADVANCED AESTHETIC CLINIC</span>
              
              <h2 className="ry-title">
                RESTORING YOUR<br />YOUTH IS ONE<br />CALL AWAY
              </h2>
              
              <p className="ry-desc">
                We make it a priority to not only listen to your story, but to also address any questions or concerns that you may have about the services offered at our clinic.
              </p>
              
              <div className="ry-metrics-row">
                <div className="ry-metric">
                  <h3>200+</h3>
                  <p>PATIENTS TREATED</p>
                </div>
                <div className="ry-metric">
                  <h3>5.0</h3>
                  <p>STAR REVIEWS</p>
                </div>
              </div>

              <div className="ry-btn-wrap">
                <a 
                  href="https://wa.me/2348140000000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-ry-white"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>

          {/* PROGRAMMATIC INTERACTIVE PICTURE-IN-PICTURE LAYER */}
          <div 
            className="ry-media-col" 
            onClick={handleSwap} 
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            aria-label="Click to swap before and after views"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSwap(); }}
          >
            <div className="ry-image-frame">
              
              {/* MAIN BACKGROUND */}
              <div className="ry-pip-bg">
                <img 
                  src={activeSrc} 
                  alt={swapped ? "Before Clinical Result" : "After Clinical Result"} 
                  className={`ry-fused-img ${swapped ? 'ry-img-left' : 'ry-img-right'}`}
                  loading="lazy" 
                />
                <span className="ry-badge ry-badge-after">{swapped ? 'BEFORE' : 'AFTER'}</span>
              </div>

              {/* INSET BOX */}
              <div className="ry-pip-inset">
                <img 
                  src={activeSrc} 
                  alt={swapped ? "After Clinical Result" : "Before Clinical Result"} 
                  className={`ry-fused-img ${swapped ? 'ry-img-right' : 'ry-img-left'}`}
                  loading="lazy" 
                />
                <span className="ry-badge ry-badge-before">{swapped ? 'AFTER' : 'BEFORE'}</span>
              </div>

              {/* JUNCTION CORNER BADGE */}
              <div className="ry-junction-badge" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                  <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
                </svg>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

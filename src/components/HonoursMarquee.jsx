import React from 'react';
import { ASSETS } from '../assets.js';
import './HonoursMarquee.css';

export default function HonoursMarquee() {
  const marqueeTrack = [...ASSETS.honours, ...ASSETS.honours, ...ASSETS.honours];

  return (
    <section className="honours-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge-tag">CLINICAL STANDARDS</span>
        {/* REPLACED "Explore our honours" [1] */}
        <h2>Accreditations & Certifications</h2>
      </div>

      <div className="marquee-container">
        <div className="honours-marquee-track">
          {marqueeTrack.map((img, i) => {
            const isScaleUp = img.includes('p84hy5slcbfmjncpksbt') || img.includes('eet69hk5vaaflnhl6xqv') || img.includes('eeqd85ysl3uwo0dkoxdk');
            const isScaleDown = img.includes('j6g7uy566bqspucbprc3'); // Capsule Clinics

            let modifierClass = '';
            if (isScaleUp) modifierClass = 'brand-img-scale-up';
            if (isScaleDown) modifierClass = 'brand-img-scale-down';

            return (
              <div 
                key={i} 
                className={`brand-img-wrap ${modifierClass}`}
              >
                <img src={img} alt="" loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

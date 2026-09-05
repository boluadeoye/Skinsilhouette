import React from 'react';
import { ASSETS } from '../assets.js';
import './HonoursMarquee.css';

export default function HonoursMarquee() {
  // Triple the 4 verified logos for a seamless infinite loop
  const marqueeTrack = [...ASSETS.honours, ...ASSETS.honours, ...ASSETS.honours];

  return (
    <section className="honours-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge-tag">Fully Certified</span>
        <h2>Explore our honours</h2>
      </div>

      <div className="marquee-container">
        <div className="honours-marquee-track">
          {marqueeTrack.map((img, i) => {
            // Target ONLY Derma (eet69hk5vaaflnhl6xqv) and NMC (eeqd85ysl3uwo0dkoxdk)
            const isEnlarged = img.includes('eet69hk5vaaflnhl6xqv') || img.includes('eeqd85ysl3uwo0dkoxdk');

            return (
              <div 
                key={i} 
                className={`brand-img-wrap ${isEnlarged ? 'brand-img-enlarged' : ''}`}
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

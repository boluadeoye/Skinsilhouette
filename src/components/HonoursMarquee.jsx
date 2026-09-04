import React from 'react';
import { ASSETS } from '../assets.js';
import './HonoursMarquee.css';

export default function HonoursMarquee() {
  const doubled = [...ASSETS.honours, ...ASSETS.honours, ...ASSETS.honours];
  
  // Surgically filter out Tile 3 (index 2) and Tile 8 (index 7) from rendering
  const filteredTrack = doubled.filter((_, i) => i !== 2 && i !== 7);

  return (
    <section className="honours-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span className="badge-tag">Fully Certified</span>
        <h2>Explore our honours</h2>
      </div>

      <div className="marquee-container">
        <div className="honours-marquee-track">
          {filteredTrack.map((img, i) => (
            <div key={i} className="brand-img-wrap">
              {/* Purged explicit text fallback: alt is set empty so the browser remains silent if a network lag occurs */}
              <img src={img} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

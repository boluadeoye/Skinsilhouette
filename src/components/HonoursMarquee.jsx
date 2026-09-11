import React from 'react';
import { ASSETS } from '../assets.js';
import './HonoursMarquee.css';

export default function HonoursMarquee() {
  const logoList = ASSETS.honours || [];
  const marqueeTrack = [...logoList, ...logoList, ...logoList];

  return (
    <section className="marquee-section">
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeTrack.map((img, i) => {
            const isEnlarged = img.includes('eet69hk5vaaflnhl6xqv') || img.includes('eeqd85ysl3uwo0dkoxdk') || img.includes('p84hy5slcbfmjncpksbt');
            const isReduced = img.includes('j6g7uy566bqspucbprc3');

            let sizeClass = "";
            if (isEnlarged) sizeClass = "brand-img-enlarged";
            if (isReduced) sizeClass = "brand-img-reduced";

            return (
              <div key={i} className={`brand-img-wrap ${sizeClass}`}>
                <img src={img} alt="Accredited Clinical Partner" loading="lazy" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

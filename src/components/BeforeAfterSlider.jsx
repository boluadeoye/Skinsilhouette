import React, { useState, useRef, useCallback } from 'react';
import './BeforeAfterSlider.css';

export default function BeforeAfterSlider({ src }) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  // Desktop Mouse Events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Mobile Touch Events
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="ba-slider-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. BOTTOM LAYER (AFTER RESULT) */}
      <div className="ba-layer ba-layer-after">
        <img src={src} alt="After Clinical Transformation" className="ba-split-img ba-img-after" />
        <span className="ba-badge ba-badge-after">AFTER</span>
      </div>

      {/* 2. TOP LAYER (BEFORE RESULT, CLIPPED) */}
      <div 
        className="ba-layer ba-layer-before"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={src} alt="Before Clinical Transformation" className="ba-split-img ba-img-before" />
        <span className="ba-badge ba-badge-before">BEFORE</span>
      </div>

      {/* 3. INTERACTIVE SLIDER HANDLE */}
      <div 
        className="ba-handle"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="ba-handle-line"></div>
        <div className="ba-handle-btn" aria-label="Drag to compare before and after">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="9 18 15 12 9 6" transform="translate(6, 0)"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

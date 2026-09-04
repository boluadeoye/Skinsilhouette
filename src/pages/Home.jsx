import React from 'react';
import Hero from '../components/Hero.jsx';
import StatsBar from '../components/StatsBar.jsx';
import AboutSnippet from '../components/AboutSnippet.jsx';
import AvailableTreatments from '../components/AvailableTreatments.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import BeforeAfterGrid from '../components/BeforeAfterGrid.jsx';
import Review from '../components/Review.jsx';
import HonoursMarquee from '../components/HonoursMarquee.jsx';
import EditorialGrid from '../components/EditorialGrid.jsx';
import InstagramGrid from '../components/InstagramGrid.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page-container">
      <Hero />
      <StatsBar />
      <div className="cream-section-canvas">
        <AboutSnippet />
        <AvailableTreatments />
        <BookingPolicy />
      </div>
      <RestoringYouth />
      <BeforeAfterGrid />
      <Review />
      <HonoursMarquee />
      <EditorialGrid />
      <InstagramGrid />
      <CtaBanner />
    </div>
  );
}

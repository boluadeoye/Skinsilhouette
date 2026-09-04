import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner.jsx';
import BookingPolicy from '../components/BookingPolicy.jsx';
import RestoringYouth from '../components/RestoringYouth.jsx';
import Review from '../components/Review.jsx';
import { CLINIC_CONTENT } from '../data/content.js';
import { ASSETS } from '../assets.js';
import './Services.css';

const CATEGORIES = ["All", "Treatments", "Injectables", "Plastic Surgery", "Consultation"];

const SERVICES_DATA = [
  {
    id: 1,
    slug: "laser-hair-removal",
    category: "TREATMENTS",
    title: "Anti-Wrinkle Treatments", // Hyphenated & plural
    description: "Advanced clinical treatments designed to relax facial muscles, smoothing fine lines and restoring a youthful, refreshed appearance.",
    image: ASSETS.blog_hero
  },
  {
    id: 2,
    slug: "laser-hair-removal",
    category: "INJECTABLES",
    title: "Fat Dissolving",
    description: "A target-specific clinical injectable treatment that permanently dissolves localized fat cells, contouring and refining the silhouette.",
    image: ASSETS.blog_2
  },
  {
    id: 3,
    slug: "laser-hair-removal",
    category: "PLASTIC SURGERY",
    title: "Hair Restoration",
    description: "Medical-grade scalp therapies and regenerative techniques aimed at stimulating dormant hair follicles and restoring natural density.",
    image: ASSETS.blog_6
  },
  {
    id: 4,
    slug: "laser-hair-removal",
    category: "CONSULTATION",
    title: "Initial Assessment",
    description: "A comprehensive clinical consultation with our lead practitioner to analyze skin health, discuss goals, and craft your bespoke roadmap.",
    image: ASSETS.blog_4
  },
  {
    id: 5,
    slug: "laser-hair-removal",
    category: "INJECTABLES",
    title: "Regenerative Injectables",
    description: "Cutting-edge bio-stimulators and skin boosters that trigger natural collagen synthesis, improving elasticity and structural depth.",
    image: ASSETS.blog_3
  },
  {
    id: 6,
    slug: "laser-hair-removal",
    category: "TREATMENTS",
    title: "Skin Remodelling Treatments",
    description: "High-performance hydrofacials and clinical resurfacing treatments that refine skin texture, resolve tone, and tighten structural layers.",
    image: ASSETS.blog_1
  },
  {
    id: 7,
    slug: "laser-hair-removal",
    category: "CONSULTATION",
    title: "Wellness and Vitamin Therapy",
    description: "Intravenous and intramuscular nutrient infusions engineered to optimize cellular health, overall energy levels, and skin radiance.",
    image: ASSETS.blog_5
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFaq, setActiveFaq] = useState(0);
  const clinicalFaqs = CLINIC_CONTENT.treatmentFAQs.slice(0, 5);

  const filteredServices = activeCategory === "All"
    ? SERVICES_DATA
    : SERVICES_DATA.filter(item => item.category.toUpperCase() === activeCategory.toUpperCase());

  return (
    <div className="services-page-wrapper">
      <section className="services-hero-header">
        <div className="services-header-container">
          <div className="services-pill-badge">
            <span>• Our services</span>
          </div>
          <h1 className="services-main-title">Popular Treatments</h1>
          <p className="services-main-subtitle">
            We offer advanced, safe, personalized skin aesthetic treatments designed to restore strength, promote growth, and enhance natural beauty.
          </p>
        </div>
      </section>

      <div className="services-marquee-ribbon">
        <div className="marquee-track">
          <span className="marquee-item">
            WRINKLES <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> DARK SPOTS <span className="gold-star spinning-star">✦</span> OILY <span className="gold-star spinning-star">✦</span> ACNE <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span> WRINKLES <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> DARK SPOTS <span className="gold-star spinning-star">✦</span> OILY <span className="gold-star spinning-star">✦</span> ACNE <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span>
          </span>
          <span className="marquee-item" aria-hidden="true">
            WRINKLES <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> DARK SPOTS <span className="gold-star spinning-star">✦</span> OILY <span className="gold-star spinning-star">✦</span> ACNE <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span> WRINKLES <span className="gold-star spinning-star">✦</span> HAIR THINNING <span className="gold-star spinning-star">✦</span> LASER TREATMENT <span className="gold-star spinning-star">✦</span> ALOPECIA TREATMENT <span className="gold-star spinning-star">✦</span> DARK SPOTS <span className="gold-star spinning-star">✦</span> OILY <span className="gold-star spinning-star">✦</span> ACNE <span className="gold-star spinning-star">✦</span> FACIALS <span className="gold-star spinning-star">✦</span> PIGMENTATION <span className="gold-star spinning-star">✦</span> ANTI-AGING <span className="gold-star spinning-star">✦</span>
          </span>
        </div>
      </div>

      <section className="services-filter-bar-section">
        <div className="container">
          <div className="services-filter-bar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`services-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          <div className="services-3x3-grid">
            {filteredServices.map((item) => (
              <Link to={`/services/${item.slug}`} key={item.id} className="treatment-card" style={{ textDecoration: 'none' }}>
                <div className="treatment-card-content">
                  <span className="treatment-card-cat">{item.category}</span>
                  <h3 className="treatment-card-title">{item.title}</h3>
                  <p className="treatment-card-desc">{item.description}</p>
                </div>
                <div className="treatment-card-image-wrap">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="services-faq-section">
        <div className="container">
          <div className="faq-watermark">FAQ</div>
          <div className="faq-list-container">
            {clinicalFaqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={formattedIndex}
                  className={`faq-accordion-row ${isOpen ? 'open' : ''}`}
                  onClick={() => setActiveFaq(isOpen ? -1 : index)}
                >
                  <div className="faq-row-header">
                    <span className="faq-index">{formattedIndex}</span>
                    <h4 className="faq-question">{faq.q}</h4>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </div>
                  {isOpen && (
                    <div className="faq-row-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <BookingPolicy />
      <RestoringYouth customImage={ASSETS.ry_services} />
      <Review />
      <CtaBanner />
    </div>
  );
}

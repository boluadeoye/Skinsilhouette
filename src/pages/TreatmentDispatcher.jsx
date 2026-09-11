import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTreatmentBySlug } from '../services/api.js';
import TreatmentAssessmentHub from './TreatmentAssessmentHub.jsx';
import TreatmentCollectionHub from './TreatmentCollectionHub.jsx';

export default function TreatmentDispatcher() {
  const { slug } = useParams();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTreatmentBySlug(slug).then((data) => {
      setTreatment(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '10rem 1.5rem', textAlign: 'center', background: 'var(--bg-nude)', minHeight: '80vh' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading clinical treatment...</p>
      </div>
    );
  }

  if (!treatment) {
    return (
      <div style={{ padding: '10rem 1.5rem', textAlign: 'center', background: 'var(--bg-nude)', minHeight: '80vh' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.74rem', fontWeight: '700', letterSpacing: '0.2em', color: 'var(--primary-gold)', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
          • CLINICAL NOTIFICATION
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 2.8rem)', color: 'var(--dark-onyx)', marginBottom: '1rem' }}>
          Clinical Treatment Not Available
        </h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 2.5rem auto', lineHeight: '1.65' }}>
          The requested treatment is currently undergoing scheduling or clinical review. Please explore our active treatments or schedule a consultation with our practitioner.
        </p>
        <Link 
          to="/services" 
          style={{ 
            display: 'inline-block',
            background: 'var(--dark-onyx)', 
            color: '#FFFFFF', 
            padding: '0.85rem 2rem', 
            borderRadius: '4px',
            textDecoration: 'none',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.82rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          EXPLORE TREATMENTS
        </Link>
      </div>
    );
  }

  if (treatment.archetype === 'collection') {
    return <TreatmentCollectionHub treatment={treatment} />;
  }

  return <TreatmentAssessmentHub treatment={treatment} />;
}

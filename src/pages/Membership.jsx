import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SSA_CLUB_CONTENT } from '../data/content.js';
import { submitMembershipEnquiry, getPatientSession, getPatientProfile } from '../services/api.js';
import './Membership.css';

export default function Membership() {
  const navigate = useNavigate();
  const session = getPatientSession();
  const profile = session?.email ? getPatientProfile(session.email) : null;

  const [selectedTier, setSelectedTier] = useState(null);
  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(session?.email || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [skinGoals, setSkinGoals] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEnquireSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    await submitMembershipEnquiry({
      patientName: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      tier: `${selectedTier.name} (${selectedTier.price} ${selectedTier.period})`,
      skinGoals: skinGoals.trim()
    });
    setSubmitted(true);
  };

  return (
    <div className="ssa-club-page">
      <section className="ssa-club-hero">
        <div className="container">
          <span className="ssa-club-eyebrow">{SSA_CLUB_CONTENT.eyebrow}</span>
          <h1 className="ssa-club-title">{SSA_CLUB_CONTENT.subtitle}</h1>
          <p className="ssa-club-intro">{SSA_CLUB_CONTENT.intro}</p>
        </div>
      </section>

      <div className="container">
        <div className="ssa-tiers-grid">
          {SSA_CLUB_CONTENT.tiers.map((tier) => (
            <div key={tier.id} className={`ssa-tier-card ${tier.featured ? 'featured' : ''}`}>
              <div>
                <span className="ssa-tier-badge">SILHOUETTE MEMBERSHIP</span>
                <h2 className="ssa-tier-name">{tier.name}</h2>
                <div className="ssa-tier-price-row">
                  <span className="ssa-tier-price">{tier.price}</span>
                  <span>{tier.period}</span>
                </div>
                <p className="ssa-tier-summary">{tier.summary}</p>

                <ul className="ssa-tier-list">
                  {tier.benefits.map((b, i) => (
                    <li key={i}>
                      <span className="ssa-tier-dot">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedTier(tier);
                  setSubmitted(false);
                }}
                className="ssa-tier-btn"
              >
                {tier.ctaText}
              </button>
            </div>
          ))}
        </div>

        <div className="ssa-club-notes-grid">
          <div className="ssa-note-box">
            <h3>{SSA_CLUB_CONTENT.consultationTitle}</h3>
            <p>{SSA_CLUB_CONTENT.consultationText}</p>
            <button
              type="button"
              onClick={() => navigate('/book')}
              className="ssa-tier-btn"
              style={{ marginTop: '1rem' }}
            >
              Book Initial Skin Consultation
            </button>
          </div>

          <div className="ssa-note-box">
            <h3>{SSA_CLUB_CONTENT.rewardsTitle}</h3>
            <p>{SSA_CLUB_CONTENT.rewardsText1}</p>
            <p>{SSA_CLUB_CONTENT.rewardsText2}</p>
          </div>
        </div>
      </div>

      {selectedTier && (
        <div className="ssa-modal-backdrop" onClick={() => setSelectedTier(null)}>
          <div className="ssa-modal-card" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <span className="ssa-tier-badge">ENQUIRY RECEIVED</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', margin: '0.5rem 0 1rem' }}>
                  Welcome to {selectedTier.name}
                </h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                  Your membership enquiry has been logged. Because every membership begins with a clinical skin assessment, you may now schedule your consultation slot.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => navigate('/book')} className="ssa-tier-btn" style={{ background: 'var(--primary-gold)', color: 'var(--dark-onyx)' }}>
                    Book Consultation Slot
                  </button>
                  <button type="button" onClick={() => setSelectedTier(null)} className="ssa-tier-btn">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquireSubmit}>
                <span className="ssa-tier-badge">SSA CLUB APPLICATION</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                  {selectedTier.ctaText} ({selectedTier.price}/mo)
                </h3>
                <p style={{ fontSize: '0.85rem', opacity: 0.75, marginBottom: '1.25rem' }}>
                  Provide your details below to register your interest and arrange your initial suitability consultation.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
                  <input required value={name} onChange={e => setName(e.target.value)} placeholder="Full Name (e.g. Sarah Jenkins)" style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(200,169,106,0.35)', background: '#161012', color: '#fff' }} />
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(200,169,106,0.35)', background: '#161012', color: '#fff' }} />
                  <input required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(200,169,106,0.35)', background: '#161012', color: '#fff' }} />
                  <textarea rows={3} value={skinGoals} onChange={e => setSkinGoals(e.target.value)} placeholder="Your primary skin concerns or goals..." style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid rgba(200,169,106,0.35)', background: '#161012', color: '#fff' }} />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setSelectedTier(null)} className="ssa-tier-btn">Cancel</button>
                  <button type="submit" className="ssa-tier-btn" style={{ background: 'var(--primary-gold)', color: 'var(--dark-onyx)', borderColor: 'var(--primary-gold)' }}>Submit Enquiry</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

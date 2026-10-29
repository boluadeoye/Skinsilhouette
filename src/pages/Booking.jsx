import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DEFAULT_CLINICAL_SERVICES,
  CLINICAL_TIME_SLOTS,
  fetchTreatments,
  getTakenClinicalSlots,
  saveClinicalBooking,
  syncClinicalBookings,
  getPatientSession,
  getPatientProfile,
  formatGBP
} from '../services/api.js';
import { CLINIC_CONTENT } from '../data/content.js';
import './Booking.css';

export default function Booking() {
  const navigate = useNavigate();
  const session = getPatientSession();
  const profile = session?.email ? getPatientProfile(session.email) : null;

  const [services, setServices] = useState(DEFAULT_CLINICAL_SERVICES);
  const [catTab, setCatTab] = useState('All');
  const [selectedServiceId, setSelectedServiceId] = useState(DEFAULT_CLINICAL_SERVICES[1].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fullName, setFullName] = useState(profile?.name || session?.name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [email, setEmail] = useState(session?.email || '');
  const [notes, setNotes] = useState('');
  const [consentChecked, setConsentChecked] = useState(true);
  const [payMode, setPayMode] = useState('deposit');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    fetchTreatments().then((wpList) => {
      if (Array.isArray(wpList) && wpList.length > 0) {
        const mapped = wpList.map((item) => ({
          id: item.slug || `tr-${item.id}`,
          category: item.category || 'Clinical Treatments',
          title: item.title,
          price: 160,
          duration: '1hr 00min'
        }));
        setServices([...DEFAULT_CLINICAL_SERVICES, ...mapped]);
      }
    });
    syncClinicalBookings();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(['All', ...services.map((s) => s.category)]);
    return Array.from(set);
  }, [services]);

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId) || services[0],
    [services, selectedServiceId]
  );

  const calendarDays = useMemo(() => {
    const arr = [];
    const base = new Date();
    for (let i = 1; i <= 12; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      arr.push({
        iso: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
        dayNum: d.getDate(),
        monthShort: d.toLocaleDateString('en-GB', { month: 'short' })
      });
    }
    return arr;
  }, []);

  const takenSlots = useMemo(
    () => (selectedDate ? getTakenClinicalSlots(selectedDate) : []),
    [selectedDate]
  );

  const totalAmount = selectedService ? selectedService.price : 160;
  const depositAmount = 50;
  const amountDueNow = payMode === 'full' ? totalAmount : payMode === 'deposit' ? depositAmount : 0;

  const handleConfirmBooking = async () => {
    setErrorMsg('');
    if (!selectedService) return setErrorMsg('Please select a treatment in Step 1.');
    if (!selectedDate || !selectedTime) return setErrorMsg('Please select an available date and time in Step 2.');
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      return setErrorMsg('Please complete your Name, Phone Number, and Email Address in Step 3.');
    }
    if (!consentChecked) return setErrorMsg('Please accept the clinical booking terms to proceed.');

    setSubmitting(true);
    const isClinicPay = payMode === 'clinic';
    const paidNow = isClinicPay ? 0 : amountDueNow;
    const balanceRemaining = isClinicPay ? totalAmount : Math.max(0, totalAmount - amountDueNow);
    const cleanPayLabel = isClinicPay ? 'Pay at Clinic' : payMode === 'full' ? 'Paid in Full' : 'Deposit Paid';

    const saved = await saveClinicalBooking({
      patientName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      treatmentId: selectedService.id,
      treatmentTitle: selectedService.title,
      date: selectedDate,
      time: selectedTime,
      notes: notes.trim(),
      totalAmount,
      depositPaid: paidNow,
      balanceDue: balanceRemaining,
      paymentStatus: cleanPayLabel,
      paymentRef: isClinicPay ? 'CLINIC-PAY-TEST' : `SSA-STRIPE-${Math.floor(100000 + Math.random() * 900000)}`,
      bookingStatus: 'Confirmed'
    });

    await syncClinicalBookings(email.trim().toLowerCase());
    setSubmitting(false);
    setConfirmed(saved);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmed) {
    return (
      <div className="dollz-booking-page" style={{ paddingTop: '3.5rem' }}>
        <div className="dollz-booking-stack">
          <div className="dollz-receipt-card">
            <div className="dollz-receipt-badge">✓</div>
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: 700 }}>
              CLINICAL APPOINTMENT CONFIRMED
            </span>
            <h2 className="dollz-receipt-title">
              We look forward to welcoming you, <span style={{ fontStyle: 'italic', color: 'var(--primary-gold)' }}>{confirmed.patientName}</span>
            </h2>

            <div className="dollz-receipt-table">
              <div className="dollz-receipt-row">
                <span className="dollz-receipt-label">Reference</span>
                <span className="dollz-receipt-val" style={{ color: 'var(--primary-gold)' }}>{confirmed.ref}</span>
              </div>
              <div className="dollz-receipt-row">
                <span className="dollz-receipt-label">Treatment</span>
                <span className="dollz-receipt-val">{confirmed.treatmentTitle}</span>
              </div>
              <div className="dollz-receipt-row">
                <span className="dollz-receipt-label">Date &amp; Time</span>
                <span className="dollz-receipt-val">{confirmed.date} · {confirmed.time}</span>
              </div>
              <div className="dollz-receipt-row">
                <span className="dollz-receipt-label">Total Fee</span>
                <span className="dollz-receipt-val">{formatGBP(confirmed.totalAmount)}</span>
              </div>
              <div className="dollz-receipt-row">
                <span className="dollz-receipt-label">Paid Online</span>
                <span className="dollz-receipt-val" style={{ color: 'var(--primary-gold)' }}>
                  {formatGBP(confirmed.depositPaid)} ({confirmed.paymentStatus})
                </span>
              </div>
              <div className="dollz-receipt-row">
                <span className="dollz-receipt-label">Clinic Balance</span>
                <span className="dollz-receipt-val">{formatGBP(confirmed.balanceDue)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button onClick={() => navigate('/account')} style={{ width: '100%', padding: '1.1rem', borderRadius: '999px', background: 'var(--primary-gold)', color: 'var(--dark-onyx)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                Open Patient Portal →
              </button>
              <button onClick={() => navigate('/')} style={{ width: '100%', padding: '1rem', borderRadius: '999px', background: 'transparent', color: 'var(--bg-sand)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', border: '1px solid rgba(244,243,238,0.25)', cursor: 'pointer' }}>
                Return to Atelier
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dollz-booking-page">
      <section className="dollz-booking-hero">
        <div className="container" style={{ maxWidth: '880px' }}>
          <button type="button" onClick={() => navigate('/')} className="dollz-back-btn">
            ← Back to home
          </button>
          <div className="dollz-hero-eyebrow">BOOK YOUR VISIT</div>
          <h1 className="dollz-hero-title">
            Reserve Your <span>Clinical Appointment</span>
          </h1>
          <p className="dollz-hero-sub">
            Pick your treatment, choose an available date and time slot, and we’ll take care of the rest. It only takes a minute.
          </p>
        </div>
      </section>

      <div className="dollz-booking-stack">
        <div className="dollz-step-card">
          <div className="dollz-step-header">
            <div className="dollz-step-num">1</div>
            <div>
              <h2 className="dollz-step-title">Choose your service</h2>
              <p className="dollz-step-sub">Select the clinical treatment or consultation you’d like to book</p>
            </div>
          </div>

          <div className="dollz-cat-pills">
            {categories.map((cat) => (
              <button key={cat} type="button" onClick={() => setCatTab(cat)} className={`dollz-cat-pill ${catTab === cat ? 'active' : ''}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="dollz-srv-grid">
            {services.filter((s) => catTab === 'All' || s.category === catTab).map((srv) => {
              const isSelected = selectedServiceId === srv.id;
              return (
                <div key={srv.id} onClick={() => setSelectedServiceId(srv.id)} className={`dollz-srv-item ${isSelected ? 'selected' : ''}`}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{srv.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                      {formatGBP(srv.price)} · {srv.duration}
                    </div>
                  </div>
                  <div className="dollz-radio">
                    {isSelected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-gold)' }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="dollz-step-card">
          <div className="dollz-step-header">
            <div className="dollz-step-num">2</div>
            <div>
              <h2 className="dollz-step-title">Pick a date &amp; time</h2>
              <p className="dollz-step-sub">Select an available clinical date and consultation slot</p>
            </div>
          </div>

          <div className="dollz-cal-layout">
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Select Date</div>
              <div className="dollz-date-grid">
                {calendarDays.map((d) => (
                  <button key={d.iso} type="button" onClick={() => { setSelectedDate(d.iso); setSelectedTime(''); }} className={`dollz-date-btn ${selectedDate === d.iso ? 'active' : ''}`}>
                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', opacity: 0.7 }}>{d.dayName}</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, margin: '2px 0' }}>{d.dayNum}</div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.75 }}>{d.monthShort}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Select Time Slot</div>
              {!selectedDate ? (
                <div style={{ height: '165px', border: '1px dashed rgba(12,6,8,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--text-muted)', background: 'rgb(255,255,255)' }}>
                  Choose a date to see available times
                </div>
              ) : (
                <div className="dollz-slot-grid">
                  {CLINICAL_TIME_SLOTS.map((slot) => {
                    const isTaken = takenSlots.includes(slot);
                    const isPicked = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={isTaken}
                        onClick={() => setSelectedTime(slot)}
                        style={{
                          padding: '0.8rem',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          cursor: isTaken ? 'not-allowed' : 'pointer',
                          textDecoration: isTaken ? 'line-through' : 'none',
                          opacity: isTaken ? 0.4 : 1,
                          background: isPicked ? 'var(--dark-onyx)' : 'rgb(255,255,255)',
                          color: isPicked ? 'var(--primary-gold)' : 'var(--dark-onyx)',
                          border: isPicked ? '1px solid var(--dark-onyx)' : '1px solid rgba(12,6,8,0.12)'
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="dollz-step-card">
          <div className="dollz-step-header">
            <div className="dollz-step-num">3</div>
            <div>
              <h2 className="dollz-step-title">Your details</h2>
              <p className="dollz-step-sub">So we can confirm and reach you</p>
            </div>
          </div>

          {session?.email && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(200,169,106,0.18)', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 600 }}>
              Signed in as {fullName || session.email} · Details auto-filled from your Patient Profile
            </div>
          )}

          <div className="dollz-input-grid">
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="e.g. Sarah Jenkins" className="dollz-input" />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Phone Number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +44 7400 000000" className="dollz-input" />
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="dollz-input" />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, display: 'block', marginBottom: '0.35rem' }}>Message / Skin Concerns (optional)</label>
            <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, skin concerns, or aesthetic goals..." className="dollz-input" />
          </div>

          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', borderRadius: '14px', background: 'rgb(255,255,255)', border: '1px solid rgba(12,6,8,0.1)', cursor: 'pointer', fontSize: '0.8rem' }}>
            <input type="checkbox" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--dark-onyx)' }} />
            <div>
              <strong>Clinical Booking &amp; £50 Deposit Policy</strong>
              <div style={{ color: 'var(--text-muted)', marginTop: '2px' }}>I confirm that a £50 booking fee secures my appointment and is deducted from my final treatment balance.</div>
            </div>
          </label>
        </div>

        <div className="dollz-summary-card">
          <div className="dollz-summary-head">
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>
              BOOKING SUMMARY
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 400 }}>Your appointment</h3>
          </div>

          <div style={{ padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span style={{ color: 'var(--text-muted)' }}>Treatment</span><strong style={{ textAlign: 'right' }}>{selectedService?.title || 'Not selected'}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span style={{ color: 'var(--text-muted)' }}>Date &amp; Time</span><strong style={{ textAlign: 'right' }}>{selectedDate ? `${selectedDate} · ${selectedTime || ''}` : 'Not selected'}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}><span style={{ color: 'var(--text-muted)' }}>Total Treatment Fee</span><strong style={{ textAlign: 'right' }}>{formatGBP(totalAmount)}</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(12,6,8,0.08)', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button type="button" onClick={() => setPayMode('deposit')} className={`dollz-cat-pill ${payMode === 'deposit' ? 'active' : ''}`}>£50 Deposit</button>
                <button type="button" onClick={() => setPayMode('full')} className={`dollz-cat-pill ${payMode === 'full' ? 'active' : ''}`}>Full ({formatGBP(totalAmount)})</button>
                <button type="button" onClick={() => setPayMode('clinic')} className={`dollz-cat-pill ${payMode === 'clinic' ? 'active' : ''}`}>Pay at Clinic (£0)</button>
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                Due Now: {formatGBP(amountDueNow)}
              </div>
            </div>

            {errorMsg && <div style={{ padding: '0.75rem', borderRadius: '10px', background: 'rgba(220,38,38,0.1)', color: 'rgb(185,28,28)', fontSize: '0.8rem', fontWeight: 600 }}>{errorMsg}</div>}

            <button
              type="button"
              disabled={submitting}
              onClick={handleConfirmBooking}
              style={{ width: '100%', padding: '1.15rem', borderRadius: '999px', background: 'var(--dark-onyx)', color: 'var(--primary-gold)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', marginTop: '0.5rem', opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? 'Connecting to Clinic Server...' : `Confirm Booking · ${formatGBP(amountDueNow)} →`}
            </button>
          </div>
        </div>

        <div className="dollz-step-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.75rem', fontSize: '0.85rem' }}>
          <div>
            <strong>{CLINIC_CONTENT.contactInfo.location}</strong>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>Monday — Saturday · Nurse-Led Aesthetic Atelier</div>
          </div>
          <div style={{ fontWeight: 700 }}>9:00 AM — 7:00 PM</div>
        </div>
      </div>
    </div>
  );
}

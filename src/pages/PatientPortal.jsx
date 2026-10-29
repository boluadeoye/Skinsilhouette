import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getPatientSession,
  savePatientSession,
  clearPatientSession,
  getPatientProfile,
  savePatientProfile,
  registerPatientAccount,
  loginPatientAccount,
  resetPatientPassword,
  getStoredClinicalBookings,
  syncClinicalBookings,
  updateClinicalBooking,
  CLINICAL_TIME_SLOTS,
  formatGBP
} from '../services/api.js';
import './PatientPortal.css';

export default function PatientPortal() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => getPatientSession());
  const [authMode, setAuthMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const [tab, setTab] = useState('overview');
  const [bookings, setBookings] = useState(() => getStoredClinicalBookings());
  const [profile, setProfile] = useState(() => getPatientProfile(session?.email || ''));
  const [rescheduleItem, setRescheduleItem] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    if (session?.email) {
      setProfile(getPatientProfile(session.email));
      syncClinicalBookings(session.email).then((list) => {
        if (list) setBookings(list);
      });
    }
  }, [session]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setResetSuccess('');
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || password.length < 6) {
      return setAuthError('Please enter a valid email and password (min 6 characters).');
    }

    if (authMode === 'register') {
      if (!fullName.trim()) return setAuthError('Please enter your full name.');
      const res = await registerPatientAccount(fullName.trim(), cleanEmail, phone.trim(), password);
      if (res.success) {
        setSession(savePatientSession({ email: cleanEmail, name: fullName.trim() }));
      } else {
        setAuthError(res.message);
      }
    } else if (authMode === 'login') {
      const res = await loginPatientAccount(cleanEmail, password);
      if (res.success) {
        setSession(savePatientSession({ email: cleanEmail, name: res.user.name }));
      } else {
        setAuthError(res.message);
      }
    } else if (authMode === 'reset') {
      const res = await resetPatientPassword(cleanEmail, password);
      if (res.success) {
        setResetSuccess('Password reset successfully. You may now sign in.');
        setAuthMode('login');
      } else {
        setAuthError(res.message);
      }
    }
  };

  if (!session) {
    return (
      <div className="ssa-portal-page">
        <div className="container">
          <div className="ssa-auth-box">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--primary-gold)', fontWeight: 700 }}>
                SKIN SILHOUETTE ATELIER
              </span>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginTop: '0.35rem', color: '#fff' }}>
                {authMode === 'login' ? 'Patient Portal Sign In' : authMode === 'register' ? 'Create Patient Account' : 'Reset Account Password'}
              </h1>
            </div>

            {authMode !== 'reset' && (
              <div className="ssa-auth-tabs">
                <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); setResetSuccess(''); }} className={`ssa-auth-tab ${authMode === 'login' ? 'active' : ''}`}>Sign In</button>
                <button type="button" onClick={() => { setAuthMode('register'); setAuthError(''); setResetSuccess(''); }} className={`ssa-auth-tab ${authMode === 'register' ? 'active' : ''}`}>Register</button>
              </div>
            )}

            {resetSuccess && (
              <div style={{ color: 'var(--primary-gold)', fontSize: '0.82rem', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
                {resetSuccess}
              </div>
            )}

            <form onSubmit={handleAuth}>
              {authMode === 'register' && (
                <>
                  <input required value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name (e.g. Sarah Jenkins)" className="ssa-auth-input" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="ssa-auth-input" />
                </>
              )}
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="ssa-auth-input" />
              
              <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={authMode === 'reset' ? 'Enter New Password (min. 6 characters)' : 'Password (min. 6 characters)'}
                  className="ssa-auth-input"
                  style={{ paddingRight: '2.75rem', marginBottom: 0 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--primary-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0.2rem' }}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>

              {authMode === 'login' && (
                <div style={{ textAlign: 'right', marginTop: '-0.4rem', marginBottom: '1rem' }}>
                  <button type="button" onClick={() => { setAuthMode('reset'); setAuthError(''); setResetSuccess(''); }} style={{ background: 'none', border: 'none', color: 'var(--primary-gold)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}>
                    Forgot Password?
                  </button>
                </div>
              )}

              {authError && <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '1rem' }}>{authError}</div>}
              
              <button type="submit" style={{ width: '100%', padding: '1rem', borderRadius: '999px', background: 'var(--primary-gold)', color: 'var(--dark-onyx)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
                {authMode === 'login' ? 'Enter Patient Portal →' : authMode === 'register' ? 'Create Account →' : 'Save New Password →'}
              </button>

              {authMode === 'reset' && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button type="button" onClick={() => { setAuthMode('login'); setAuthError(''); }} style={{ background: 'none', border: 'none', color: 'rgba(244, 243, 238, 0.6)', fontSize: '0.75rem', cursor: 'pointer' }}>
                    ← Back to Sign In
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  const myBookings = bookings.filter((b) => (b.email || '').toLowerCase() === session.email.toLowerCase());
  const upcoming = myBookings.filter((b) => b.bookingStatus !== 'Cancelled' && b.bookingStatus !== 'Completed');
  const totalPaid = myBookings.filter((b) => b.bookingStatus !== 'Cancelled').reduce((s, b) => s + Number(b.depositPaid || 0), 0);
  const totalBalance = upcoming.reduce((s, b) => s + Number(b.balanceDue || 0), 0);

  const handleSaveReschedule = () => {
    if (!rescheduleItem || !newDate || !newTime) return;
    const next = updateClinicalBooking(rescheduleItem.id, { date: newDate, time: newTime, bookingStatus: 'Rescheduled' });
    setBookings(next);
    setRescheduleItem(null);
  };

  return (
    <div className="ssa-portal-page">
      <div className="container">
        <div className="ssa-portal-header">
          <div>
            <span style={{ fontSize: '0.7rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
              PATIENT PORTAL · SKIN SILHOUETTE
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem' }}>
              Welcome back, <span style={{ fontStyle: 'italic' }}>{profile.name || session.name}</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={() => navigate('/book')} style={{ padding: '0.75rem 1.4rem', borderRadius: '999px', background: 'var(--dark-onyx)', color: 'var(--primary-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              + Book Consultation
            </button>
            <button onClick={() => { clearPatientSession(); setSession(null); }} style={{ padding: '0.75rem 1.2rem', borderRadius: '999px', background: 'transparent', border: '1px solid rgba(12,6,8,0.2)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
              Sign Out
            </button>
          </div>
        </div>

        <div className="ssa-portal-grid">
          <aside className="ssa-portal-nav">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'appointments', label: 'My Appointments' },
              { id: 'payments', label: 'Payment Ledger' },
              { id: 'profile', label: 'Skin Profile' }
            ].map((item) => (
              <button key={item.id} onClick={() => setTab(item.id)} className={`ssa-portal-nav-btn ${tab === item.id ? 'active' : ''}`}>
                {item.label}
              </button>
            ))}
          </aside>

          <div>
            {tab === 'overview' && (
              <div className="ssa-kpi-grid">
                <div className="ssa-kpi-card"><div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700 }}>Upcoming</div><div className="ssa-kpi-val">{upcoming.length}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Sessions</div></div>
                <div className="ssa-kpi-card"><div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700 }}>Total Visits</div><div className="ssa-kpi-val">{myBookings.length}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Clinical History</div></div>
                <div className="ssa-kpi-card"><div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700 }}>Deposits Paid</div><div className="ssa-kpi-val">{formatGBP(totalPaid)}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online Payments</div></div>
                <div className="ssa-kpi-card"><div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--text-muted)', fontWeight: 700 }}>Clinic Balance</div><div className="ssa-kpi-val">{formatGBP(totalBalance)}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Due at Clinic</div></div>
              </div>
            )}

            {(tab === 'overview' || tab === 'appointments') && (
              <div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1rem' }}>Clinical Appointments</h2>
                {myBookings.length === 0 ? (
                  <div className="ssa-bk-card">
                    <span>You have no clinical appointments scheduled yet.</span>
                    <button onClick={() => navigate('/book')} style={{ padding: '0.65rem 1.25rem', borderRadius: '999px', background: 'var(--dark-onyx)', color: 'var(--primary-gold)', fontSize: '0.75rem', fontWeight: 700, border: 'none', cursor: 'pointer' }}>Book Consultation</button>
                  </div>
                ) : (
                  myBookings.map((bk) => (
                    <div key={bk.id} className="ssa-bk-card">
                      <div>
                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-gold)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{bk.ref} · {bk.bookingStatus}</div>
                        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: '0.2rem 0' }}>{bk.treatmentTitle}</div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                          {bk.date} at {bk.time} · Paid: <strong>{formatGBP(bk.depositPaid)}</strong> · Balance: <strong>{formatGBP(bk.balanceDue)}</strong>
                        </div>
                      </div>
                      {bk.bookingStatus !== 'Cancelled' && (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => { setRescheduleItem(bk); setNewDate(bk.date); setNewTime(bk.time); }} style={{ padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid var(--dark-onyx)', background: 'transparent', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Reschedule</button>
                          <button onClick={() => setBookings(updateClinicalBooking(bk.id, { bookingStatus: 'Cancelled' }))} style={{ padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid rgba(220,38,38,0.4)', color: 'rgb(185,28,28)', background: 'transparent', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === 'payments' && (
              <div className="ssa-bk-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Deposit &amp; Payment Ledger</h2>
                {myBookings.map((bk) => (
                  <div key={bk.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0', borderBottom: '1px solid rgba(12,6,8,0.08)', fontSize: '0.85rem', fontVariantNumeric: 'tabular-nums' }}>
                    <div><strong>{bk.treatmentTitle}</strong><div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Ref: {bk.ref} · Gateway: {bk.paymentRef}</div></div>
                    <div style={{ textAlign: 'right' }}><strong>{formatGBP(bk.depositPaid)} ({bk.paymentStatus})</strong><div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Balance: {formatGBP(bk.balanceDue)}</div></div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'profile' && (
              <form onSubmit={(e) => { e.preventDefault(); savePatientProfile(session.email, profile); setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2500); }} className="ssa-bk-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem' }}>Patient Skin Profile</h2>
                <input value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Full Name" className="dollz-input" />
                <input value={profile.phone || ''} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="Phone Number" className="dollz-input" />
                <textarea rows={3} value={profile.skinNotes || ''} onChange={(e) => setProfile({ ...profile, skinNotes: e.target.value })} placeholder="Skin type, allergies, and treatment goals..." className="dollz-input" />
                {savedMsg && <div style={{ color: 'rgb(5,150,105)', fontSize: '0.82rem', fontWeight: 600 }}>Profile updated successfully.</div>}
                <button type="submit" style={{ padding: '0.9rem 1.75rem', borderRadius: '999px', background: 'var(--dark-onyx)', color: 'var(--primary-gold)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}>Save Profile</button>
              </form>
            )}
          </div>
        </div>

        {rescheduleItem && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(12,6,8,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999, padding: '1rem' }} onClick={() => setRescheduleItem(null)}>
            <div style={{ background: 'var(--bg-sand)', padding: '2rem', borderRadius: '24px', maxWidth: '420px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1rem' }}>Reschedule {rescheduleItem.ref}</h3>
              <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="dollz-input" style={{ marginBottom: '0.85rem' }} />
              <select value={newTime} onChange={(e) => setNewTime(e.target.value)} className="dollz-input" style={{ marginBottom: '1.25rem' }}>
                {CLINICAL_TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" onClick={() => setRescheduleItem(null)} style={{ flex: 1, padding: '0.8rem', borderRadius: '999px', border: '1px solid var(--dark-onyx)', background: 'transparent', fontWeight: 700, cursor: 'pointer' }}>Cancel</button>
                <button type="button" onClick={handleSaveReschedule} style={{ flex: 1, padding: '0.8rem', borderRadius: '999px', border: 'none', background: 'var(--dark-onyx)', color: 'var(--primary-gold)', fontWeight: 700, cursor: 'pointer' }}>Confirm</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

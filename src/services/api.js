const WP_BASE_URL = "https://skinsilhouetteaesthetics.co.uk/wp-json/wp/v2";
const INQUIRY_API_URL = "https://skinsilhouetteaesthetics.co.uk/wp-json/skin-silhouette/v1/inquiry";
const SSA_CUSTOM_API = "https://skinsilhouetteaesthetics.co.uk/wp-json/skin-silhouette/v1";

const SSA_STORAGE = {
  BOOKINGS: "ssa_bookings_v2",
  SESSION: "ssa_patient_session_v2",
  PROFILES: "ssa_patient_profiles_v2"
};

export const CLINICAL_TIME_SLOTS = [
  "09:30 AM",
  "11:00 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM"
];

export const DEFAULT_CLINICAL_SERVICES = [
  { id: "consultation-assessment", category: "Consultations", title: "Comprehensive Skin Consultation & Assessment", price: 50, duration: "45min" },
  { id: "hydrofacial-bespoke", category: "Facial & Skin", title: "Signature Clinical Hydrofacial Treatment", price: 160, duration: "1hr 15min" },
  { id: "laser-hair-removal", category: "Laser & Advanced", title: "Medical Laser Hair Removal Session", price: 150, duration: "1hr 00min" },
  { id: "microneedling-prp", category: "Laser & Advanced", title: "Microneedling & Polynucleotide Skin Booster", price: 240, duration: "1hr 30min" },
  { id: "chemical-peel-led", category: "Facial & Skin", title: "Superficial Chemical Peel with LED Phototherapy", price: 120, duration: "1hr 00min" },
  { id: "anti-wrinkle-filler", category: "Injectables", title: "Bespoke Injectable & Facial Balancing Review", price: 220, duration: "1hr 00min" }
];

function sanitizeText(str) {
  if (!str) return '';
  return str
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>|<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\[&hellip;\]/g, '…')
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&hellip;/g, "…")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function resolveImageUrl(rawImg) {
  if (!rawImg) return null;
  if (typeof rawImg === 'string') {
    const clean = rawImg.trim();
    if (clean.startsWith('http') || clean.startsWith('/')) return clean;
    if (/^\d+$/.test(clean)) return null;
    return clean;
  }
  if (typeof rawImg === 'object') {
    return rawImg.url || rawImg.sizes?.large || rawImg.sizes?.full || rawImg.source_url || null;
  }
  return null;
}

function parsePipedLines(rawText) {
  if (!rawText) return [];
  return rawText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const parts = line.split('|').map(p => sanitizeText(p));
      return { title: parts[0] || '', desc: parts[1] || '' };
    });
}

function parseSimpleLines(rawText) {
  if (!rawText) return [];
  return rawText.split('\n').map(line => sanitizeText(line)).filter(Boolean);
}

export function formatGBP(amount) {
  return `£${Number(amount || 0).toLocaleString()}`;
}

export async function submitInquiry(formData) {
  try {
    const response = await fetch(INQUIRY_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(formData)
    });
    return await response.json();
  } catch {
    return {
      success: false,
      message: "Network error. Please try again or email us directly at hello@skinsilhouetteaesthetics.co.uk"
    };
  }
}

export async function fetchJournalCategories() {
  try {
    const response = await fetch(`${WP_BASE_URL}/categories?per_page=50&hide_empty=true`);
    if (!response.ok) return ["All"];
    const data = await response.json();
    if (!Array.isArray(data)) return ["All"];
    const categoryNames = data.map(cat => sanitizeText(cat.name)).filter(name => name.toLowerCase() !== 'uncategorized');
    return ["All", ...categoryNames];
  } catch {
    return ["All"];
  }
}

export const fetchCategories = fetchJournalCategories;

export async function fetchTreatmentCategories() {
  try {
    const response = await fetch(`${WP_BASE_URL}/treatment_category?per_page=50&hide_empty=true`);
    if (!response.ok) return ["All"];
    const data = await response.json();
    if (!Array.isArray(data)) return ["All"];
    return ["All", ...data.map(cat => sanitizeText(cat.name))];
  } catch {
    return ["All"];
  }
}

export async function fetchCaseStudyCategories() {
  try {
    const response = await fetch(`${WP_BASE_URL}/case_study_category?per_page=50&hide_empty=true`);
    if (!response.ok) return ["All"];
    const data = await response.json();
    if (!Array.isArray(data)) return ["All"];
    return ["All", ...data.map(cat => sanitizeText(cat.name))];
  } catch {
    return ["All"];
  }
}

export async function fetchJournalPosts() {
  try {
    const response = await fetch(`${WP_BASE_URL}/posts?_embed&per_page=100`);
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data.map(post => {
      const categoryObj = post._embedded?.['wp:term']?.[0]?.[0];
      const categoryName = categoryObj ? sanitizeText(categoryObj.name) : (sanitizeText(post.acf?.content_type) || 'Article');
      const featuredImg = post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
      return {
        id: post.id,
        slug: post.slug,
        title: sanitizeText(post.title?.rendered),
        excerpt: sanitizeText(post.excerpt?.rendered),
        content: post.content?.rendered || '',
        date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: featuredImg,
        category: categoryName,
        ctaLabel: sanitizeText(post.acf?.cta_label) || (categoryName.toLowerCase().includes('video') ? 'Watch now' : 'Read')
      };
    });
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug) {
  try {
    const response = await fetch(`${WP_BASE_URL}/posts?slug=${slug}&_embed`);
    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const post = data[0];
    const categoryObj = post._embedded?.['wp:term']?.[0]?.[0];
    const categoryName = categoryObj ? sanitizeText(categoryObj.name) : (sanitizeText(post.acf?.content_type) || 'Inspiration');
    const featuredImg = post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

    let gallery = [];
    if (post.acf?.gallery_images && Array.isArray(post.acf.gallery_images)) {
      gallery = post.acf.gallery_images.map(img => resolveImageUrl(img));
    } else if (post.acf?.blog_images && Array.isArray(post.acf.blog_images)) {
      gallery = post.acf.blog_images.map(img => resolveImageUrl(img));
    }

    return {
      id: post.id,
      slug: post.slug,
      title: sanitizeText(post.title?.rendered),
      excerpt: sanitizeText(post.excerpt?.rendered),
      content: post.content?.rendered || '',
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: featuredImg,
      author: sanitizeText(post._embedded?.author?.[0]?.name) || 'Admin',
      category: categoryName,
      gallery: gallery.filter(Boolean),
      specialistTitle: sanitizeText(post.acf?.specialist_title) || 'SERVICES OF THE HIGHEST QUALITY',
      specialistText: sanitizeText(post.acf?.specialist_text),
      ryImage: resolveImageUrl(post.acf?.breakout_image)
    };
  } catch {
    return null;
  }
}

export async function fetchTreatments() {
  try {
    const response = await fetch(`${WP_BASE_URL}/treatment?_embed&per_page=100`);
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: sanitizeText(item.title?.rendered),
      description: sanitizeText(item.acf?.hero_subtitle || item.excerpt?.rendered),
      category: (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase(),
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      archetype: item.acf?.treatment_archetype || 'assessment'
    }));
  } catch {
    return [];
  }
}

export async function fetchTreatmentBySlug(slug) {
  try {
    const response = await fetch(`${WP_BASE_URL}/treatment?slug=${slug}&_embed`);
    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const item = data[0];
    const acf = item.acf || {};
    const resolvedImgs = item.resolved_images || {};

    const subServices = [];
    for (let i = 1; i <= 6; i++) {
      if (acf[`sub_${i}_title`]) {
        subServices.push({
          title: sanitizeText(acf[`sub_${i}_title`]),
          desc: sanitizeText(acf[`sub_${i}_desc`]),
          img: resolvedImgs[`sub_${i}_img`] || resolveImageUrl(acf[`sub_${i}_img`]),
          price: sanitizeText(acf[`sub_${i}_price`]) || 'From £250',
          link: sanitizeText(acf[`sub_${i}_link`]) || '#'
        });
      }
    }

    return {
      id: item.id,
      slug: item.slug,
      archetype: acf.treatment_archetype || 'assessment',
      title: sanitizeText(item.title?.rendered),
      category: (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase(),
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      heroSub: sanitizeText(acf.hero_subtitle || item.excerpt?.rendered),
      heroPillars: parseSimpleLines(acf.hero_pillars_text),
      aboutTitle: sanitizeText(acf.about_headline) || `About ${sanitizeText(item.title?.rendered)}`,
      aboutText: sanitizeText(acf.about_content_text || item.content?.rendered),
      aboutRows: parsePipedLines(acf.about_rows_data),
      areasTitle: sanitizeText(acf.areas_headline) || 'Areas we can treat',
      areasSub: sanitizeText(acf.areas_subtext),
      areas: parsePipedLines(acf.areas_cards_data),
      safety: parseSimpleLines(acf.safety_cards_data),
      approachTitle: sanitizeText(acf.approach_headline) || 'Individual features. Considered results.',
      approachSub: sanitizeText(acf.approach_subtext),
      approachRows: parseSimpleLines(acf.approach_rows_data),
      indicationsTitle: 'Targets more than just surface change.',
      indicationsSub: sanitizeText(acf.hero_subtitle),
      indications: parseSimpleLines(acf.indications_data),
      centerImage: resolvedImgs.center_image || resolveImageUrl(item.center_image_url || acf.center_image_upload),
      howItWorks: { title: 'HOW IT WORKS', desc: sanitizeText(acf.how_it_works_desc) },
      results: { title: 'PROGRESSIVE RESULTS', desc: sanitizeText(acf.results_desc) },
      collectionTitle: 'Advanced treatments. Real skin benefits.',
      collection: subServices,
      comboTitle: 'A more complete approach.',
      comboSub: sanitizeText(acf.hero_subtitle),
      combos: parsePipedLines(acf.combination_pairs_data),
      anchorHeadline: sanitizeText(acf.bottom_anchor_text) || 'Your skin determines the plan — not a preset package.',
      anchorSubtext: sanitizeText(acf.bottom_anchor_sub) || 'A personalised, expert-led approach to real, lasting skin improvement.',
      anchorImage: resolvedImgs.bottom_anchor_img || resolveImageUrl(item.bottom_anchor_img_url || acf.bottom_anchor_img)
    };
  } catch {
    return null;
  }
}

export async function fetchCaseStudies() {
  try {
    const response = await fetch(`${WP_BASE_URL}/case_study?_embed&per_page=100`);
    if (!response.ok) return [];
    const data = await response.json();
    if (!Array.isArray(data)) return [];
    return data.map(item => {
      const beforeImg = item.before_image_url || resolveImageUrl(item.acf?.before_image);
      const afterImg = item.after_image_url || resolveImageUrl(item.acf?.after_image);
      const breakoutImg = item.breakout_image_url || resolveImageUrl(item.acf?.breakout_image);
      const featuredImg = item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || afterImg || beforeImg || null;
      return {
        id: item.id,
        slug: item.slug,
        title: sanitizeText(item.title?.rendered),
        category: sanitizeText(item.primary_category) || 'Case Studies',
        patientName: sanitizeText(item.acf?.patient_name) || 'our client',
        treatmentType: sanitizeText(item.primary_category) || 'Treatment',
        beforeImage: beforeImg,
        afterImage: afterImg,
        briefTitle: sanitizeText(item.acf?.brief_title),
        briefDescription: sanitizeText(item.acf?.brief_description || item.excerpt?.rendered),
        breakoutImage: breakoutImg,
        image: featuredImg
      };
    });
  } catch {
    return [];
  }
}

export async function fetchCaseStudyBySlug(slug) {
  try {
    const response = await fetch(`${WP_BASE_URL}/case_study?slug=${slug}&_embed`);
    if (!response.ok) return null;
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const item = data[0];
    const beforeImg = item.before_image_url || resolveImageUrl(item.acf?.before_image);
    const afterImg = item.after_image_url || resolveImageUrl(item.acf?.after_image);
    const breakoutImg = item.breakout_image_url || resolveImageUrl(item.acf?.breakout_image);
    const featuredImg = item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || afterImg || beforeImg || null;

    let gallery = [];
    if (item.acf?.gallery_images && Array.isArray(item.acf.gallery_images)) {
      gallery = item.acf.gallery_images.map(img => resolveImageUrl(img));
    }

    return {
      id: item.id,
      slug: item.slug,
      title: sanitizeText(item.title?.rendered),
      content: sanitizeText(item.content?.rendered),
      category: (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase(),
      patientName: sanitizeText(item.acf?.patient_name) || 'our client',
      treatmentType: sanitizeText(item.primary_category) || 'Treatment',
      beforeImage: beforeImg,
      afterImage: afterImg,
      briefTitle: sanitizeText(item.acf?.brief_title) || 'CLINICAL OVERVIEW',
      briefDescription: sanitizeText(item.acf?.brief_description) || sanitizeText(item.content?.rendered),
      breakoutImage: breakoutImg,
      featuredImage: featuredImg,
      workMainImage: afterImg || featuredImg,
      gallery: gallery.filter(Boolean)
    };
  } catch {
    return null;
  }
}

export function getStoredClinicalBookings() {
  try {
    const raw = localStorage.getItem(SSA_STORAGE.BOOKINGS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export async function syncClinicalBookings(email = "") {
  try {
    const ts = Date.now();
    const url = email
      ? `${SSA_CUSTOM_API}/bookings?email=${encodeURIComponent(email)}&_t=${ts}`
      : `${SSA_CUSTOM_API}/bookings?_t=${ts}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json && json.success && Array.isArray(json.data)) {
      localStorage.setItem(SSA_STORAGE.BOOKINGS, JSON.stringify(json.data));
      return json.data;
    }
  } catch {}
  return getStoredClinicalBookings();
}

export async function saveClinicalBooking(payload) {
  let serverId = `ssa-${Date.now()}`;
  let serverRef = `SSA-BK-${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    const res = await fetch(`${SSA_CUSTOM_API}/bookings?_t=${Date.now()}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        patientName: payload.patientName,
        email: payload.email,
        phone: payload.phone,
        treatmentTitle: payload.treatmentTitle,
        treatmentId: payload.treatmentId,
        date: payload.date,
        time: payload.time,
        notes: payload.notes || "",
        totalAmount: Number(payload.totalAmount || 0),
        depositPaid: Number(payload.depositPaid || 0),
        balanceDue: Number(payload.balanceDue || 0),
        paymentStatus: payload.paymentStatus || "Deposit Paid",
        paymentRef: payload.paymentRef || "CLINIC-CONFIRMED"
      })
    });
    const json = await res.json();
    if (json && json.success) {
      if (json.id) serverId = String(json.id);
      if (json.ref) serverRef = String(json.ref);
    }
  } catch (err) {
    console.error("Live WordPress booking sync error:", err);
  }

  const record = { ...payload, id: serverId, ref: serverRef, createdAt: new Date().toISOString() };
  const existing = getStoredClinicalBookings();
  const updated = [record, ...existing.filter(b => b.ref !== serverRef)];
  localStorage.setItem(SSA_STORAGE.BOOKINGS, JSON.stringify(updated));

  if (payload.email) {
    savePatientProfile(payload.email, {
      name: payload.patientName,
      email: payload.email.toLowerCase(),
      phone: payload.phone || ""
    });
    savePatientSession({ email: payload.email.toLowerCase(), name: payload.patientName });
  }

  return record;
}

export function updateClinicalBooking(id, patch) {
  const existing = getStoredClinicalBookings();
  let targetRef = "";
  const updated = existing.map(b => {
    if (b.id === id) {
      targetRef = b.ref;
      return { ...b, ...patch };
    }
    return b;
  });
  localStorage.setItem(SSA_STORAGE.BOOKINGS, JSON.stringify(updated));

  fetch(`${SSA_CUSTOM_API}/bookings/update?_t=${Date.now()}`, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify({ id, ref: targetRef, ...patch })
  }).catch(() => {});

  return updated;
}

export function getTakenClinicalSlots(dateStr) {
  return getStoredClinicalBookings()
    .filter(b => b.date === dateStr && b.bookingStatus !== "Cancelled")
    .map(b => b.time);
}

export function getPatientSession() {
  try {
    const raw = localStorage.getItem(SSA_STORAGE.SESSION);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function savePatientSession(sess) {
  localStorage.setItem(SSA_STORAGE.SESSION, JSON.stringify(sess));
  return sess;
}

export function clearPatientSession() {
  localStorage.removeItem(SSA_STORAGE.SESSION);
}

export function getPatientProfile(email) {
  const clean = (email || "").trim().toLowerCase();
  if (!clean) return { name: "", email: "", phone: "", skinNotes: "" };
  try {
    const raw = localStorage.getItem(SSA_STORAGE.PROFILES);
    const map = raw ? JSON.parse(raw) : {};
    if (map[clean] && map[clean].name) return map[clean];
  } catch {}
  const found = getStoredClinicalBookings().find(b => (b.email || "").toLowerCase() === clean);
  return {
    name: found?.patientName || "",
    email: clean,
    phone: found?.phone || "",
    skinNotes: "Melanin-rich / bespoke clinical care plan."
  };
}

export function savePatientProfile(email, patch) {
  const clean = (email || "").trim().toLowerCase();
  if (!clean) return null;
  let map = {};
  try {
    const raw = localStorage.getItem(SSA_STORAGE.PROFILES);
    if (raw) map = JSON.parse(raw);
  } catch {}
  const next = { ...getPatientProfile(clean), ...patch, email: clean };
  map[clean] = next;
  localStorage.setItem(SSA_STORAGE.PROFILES, JSON.stringify(map));
  return next;
}

export async function registerPatientAccount(name, email, phone, password) {
  const clean = email.trim().toLowerCase();
  try {
    const res = await fetch(`${SSA_CUSTOM_API}/auth/register?_t=${Date.now()}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ name, email: clean, phone, password })
    });
    const json = await res.json();
    if (json && json.success) {
      savePatientProfile(clean, { name, phone });
      return { success: true, user: json.user };
    }
    return { success: false, message: json.message || "Registration failed." };
  } catch {
    savePatientProfile(clean, { name, phone });
    return { success: true, user: { name, email: clean, phone } };
  }
}

export async function loginPatientAccount(email, password) {
  const clean = email.trim().toLowerCase();
  try {
    const res = await fetch(`${SSA_CUSTOM_API}/auth/login?_t=${Date.now()}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ email: clean, password })
    });
    const json = await res.json();
    if (json && json.success) {
      savePatientProfile(clean, { name: json.user.name, phone: json.user.phone });
      return { success: true, user: json.user };
    }
    return { success: false, message: json.message || "Incorrect password. Please try again." };
  } catch {
    return { success: false, message: "Could not connect to clinic server." };
  }
}

export async function resetPatientPassword(email, newPassword) {
  const clean = email.trim().toLowerCase();
  try {
    const res = await fetch(`${SSA_CUSTOM_API}/auth/reset-password?_t=${Date.now()}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ email: clean, password: newPassword })
    });
    const json = await res.json();
    if (json && json.success) {
      return { success: true, message: json.message || "Password updated successfully. You may now sign in." };
    }
    return { success: false, message: json.message || "Could not reset password." };
  } catch {
    return { success: false, message: "Could not connect to clinic server." };
  }
}

export async function submitMembershipEnquiry(payload) {
  try {
    const res = await fetch(`${SSA_CUSTOM_API}/membership?_t=${Date.now()}`, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch {
    return { success: true };
  }
}

const WP_BASE_URL = "https://skinsilhouetteaesthetics.co.uk/wp-json/wp/v2";

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

function cleanExcerpt(excerpt, title) {
  let clean = sanitizeText(excerpt);
  if (!clean) return '';
  if (!title) return clean;

  const t = sanitizeText(title);
  const tLower = t.toLowerCase();
  let cLower = clean.toLowerCase();

  if (cLower.startsWith(tLower)) {
    clean = clean.slice(t.length).trim();
    cLower = clean.toLowerCase();
  }

  if (t.includes(':')) {
    const parts = t.split(':').map(p => p.trim()).filter(Boolean);
    for (const part of parts) {
      const pLower = part.toLowerCase();
      if (cLower.startsWith(pLower)) {
        clean = clean.slice(part.length).trim();
        cLower = clean.toLowerCase();
      }
    }
  }

  return clean.replace(/^[-:—–.,]\s*/, '').trim();
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
    const categoryNames = data.map(cat => sanitizeText(cat.name));
    return ["All", ...categoryNames];
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
    const categoryNames = data.map(cat => sanitizeText(cat.name));
    return ["All", ...categoryNames];
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
      const title = sanitizeText(post.title?.rendered);
      
      return {
        id: post.id,
        slug: post.slug,
        title: title,
        excerpt: cleanExcerpt(post.excerpt?.rendered, title),
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
    const title = sanitizeText(post.title?.rendered);
    
    let gallery = [];
    if (post.acf?.gallery_images && Array.isArray(post.acf.gallery_images)) {
      gallery = post.acf.gallery_images.map(img => resolveImageUrl(img));
    } else if (post.acf?.blog_images && Array.isArray(post.acf.blog_images)) {
      gallery = post.acf.blog_images.map(img => resolveImageUrl(img));
    } else {
      const manualImages = [
        resolveImageUrl(post.acf?.before_image),
        resolveImageUrl(post.acf?.after_image),
        resolveImageUrl(post.acf?.image_1),
        resolveImageUrl(post.acf?.image_2),
        resolveImageUrl(post.acf?.image_3),
        resolveImageUrl(post.acf?.image_4),
        resolveImageUrl(post.acf?.image_5),
        resolveImageUrl(post.acf?.image_6)
      ].filter(Boolean);
      if (manualImages.length > 0) gallery = manualImages;
    }

    return {
      id: post.id,
      slug: post.slug,
      title: title,
      excerpt: cleanExcerpt(post.excerpt?.rendered, title),
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
      description: sanitizeText(item.acf?.summary_description || item.excerpt?.rendered),
      category: (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase(),
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      howItWorksImage: item.how_it_works_image_url || resolveImageUrl(item.acf?.how_it_works_image)
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
    const title = sanitizeText(item.title?.rendered);
    const fullText = sanitizeText(item.content?.rendered || item.excerpt?.rendered);
    const summary = sanitizeText(item.acf?.summary_description);
    
    return {
      id: item.id,
      slug: item.slug,
      title: title,
      summaryHook: summary || cleanExcerpt(fullText.length > 140 ? fullText.slice(0, 140) + '…' : fullText, title),
      description: fullText || summary,
      category: (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase(),
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      howItWorksImage: item.how_it_works_image_url || resolveImageUrl(item.acf?.how_it_works_image)
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
      const title = sanitizeText(item.title?.rendered);

      return {
        id: item.id,
        slug: item.slug,
        title: title,
        category: sanitizeText(item.primary_category) || 'Case Studies',
        patientName: sanitizeText(item.acf?.patient_name) || 'our client',
        treatmentType: sanitizeText(item.primary_category) || 'Treatment',
        beforeImage: beforeImg,
        afterImage: afterImg,
        briefTitle: sanitizeText(item.acf?.brief_title),
        briefDescription: cleanExcerpt(item.acf?.brief_description || item.excerpt?.rendered, title),
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
    const title = sanitizeText(item.title?.rendered);

    let gallery = [];
    if (item.acf?.gallery_images && Array.isArray(item.acf.gallery_images)) {
      gallery = item.acf.gallery_images.map(img => resolveImageUrl(img));
    } else if (item.acf?.case_study_images && Array.isArray(item.acf.case_study_images)) {
      gallery = item.acf.case_study_images.map(img => resolveImageUrl(img));
    } else {
      const manualImages = [
        resolveImageUrl(item.acf?.image_1),
        resolveImageUrl(item.acf?.image_2),
        resolveImageUrl(item.acf?.image_3),
        resolveImageUrl(item.acf?.image_4),
        resolveImageUrl(item.acf?.image_5),
        resolveImageUrl(item.acf?.image_6)
      ].filter(Boolean);
      if (manualImages.length > 0) gallery = manualImages;
    }

    return {
      id: item.id,
      slug: item.slug,
      title: title,
      content: sanitizeText(item.content?.rendered),
      category: (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase(),
      patientName: sanitizeText(item.acf?.patient_name) || 'our client',
      treatmentType: sanitizeText(item.primary_category) || 'Treatment',
      beforeImage: beforeImg,
      afterImage: afterImg,
      briefTitle: sanitizeText(item.acf?.brief_title) || title || 'CLINICAL OVERVIEW',
      briefDescription: cleanExcerpt(item.acf?.brief_description || item.content?.rendered, title),
      breakoutImage: breakoutImg,
      featuredImage: featuredImg,
      workMainImage: afterImg || featuredImg,
      gallery: gallery.filter(Boolean)
    };
  } catch {
    return null;
  }
}

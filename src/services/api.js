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
      return {
        title: parts[0] || '',
        desc: parts[1] || ''
      };
    });
}

function parseSimpleLines(rawText) {
  if (!rawText) return [];
  return rawText
    .split('\n')
    .map(line => sanitizeText(line))
    .filter(Boolean);
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
    const title = sanitizeText(item.title?.rendered);
    const category = (sanitizeText(item.primary_category) || 'TREATMENTS').toUpperCase();
    const featuredImg = item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    const archetype = acf.treatment_archetype || 'assessment';

    const subServices = [];
    for (let i = 1; i <= 6; i++) {
      if (acf[`sub_${i}_title`]) {
        const imgUrl = resolvedImgs[`sub_${i}_img`] || resolveImageUrl(acf[`sub_${i}_img`]);
        subServices.push({
          title: sanitizeText(acf[`sub_${i}_title`]),
          desc: sanitizeText(acf[`sub_${i}_desc`]),
          img: imgUrl,
          link: sanitizeText(acf[`sub_${i}_link`]) || '#'
        });
      }
    }

    return {
      id: item.id,
      slug: item.slug,
      archetype: archetype,
      title: title,
      category: category,
      image: featuredImg,
      heroSub: sanitizeText(acf.hero_subtitle || item.excerpt?.rendered),
      heroPillars: parseSimpleLines(acf.hero_pillars_text),
      aboutTitle: sanitizeText(acf.about_headline) || `About ${title}`,
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
      centerImage: resolvedImgs.center_image || resolveImageUrl(item.center_image_url || acf.center_image_upload) || featuredImg,
      howItWorks: {
        title: 'HOW IT WORKS',
        desc: sanitizeText(acf.how_it_works_desc)
      },
      results: {
        title: 'PROGRESSIVE RESULTS',
        desc: sanitizeText(acf.results_desc)
      },
      collectionTitle: 'Advanced treatments. Real skin benefits.',
      collection: subServices,
      comboTitle: 'A more complete approach.',
      comboSub: sanitizeText(acf.hero_subtitle),
      combos: parsePipedLines(acf.combination_pairs_data),
      anchorHeadline: sanitizeText(acf.bottom_anchor_text) || 'Your skin determines the plan — not a preset package.',
      anchorSubtext: sanitizeText(acf.bottom_anchor_sub) || 'A personalised, expert-led approach to real, lasting skin improvement.',
      anchorImage: resolvedImgs.bottom_anchor_img || resolveImageUrl(item.bottom_anchor_img_url || acf.bottom_anchor_img) || featuredImg
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

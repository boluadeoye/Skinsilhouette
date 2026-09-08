const WP_BASE_URL = "https://skinsilhouetteaesthetics.co.uk/wp-json/wp/v2";

export async function fetchCategories() {
  try {
    const response = await fetch(`${WP_BASE_URL}/categories?per_page=50&hide_empty=true`);
    if (!response.ok) return ["All"];
    const data = await response.json();
    if (!Array.isArray(data)) return ["All"];
    const categoryNames = data.map(cat => cat.name).filter(name => name.toLowerCase() !== 'uncategorized');
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
      const categoryName = categoryObj ? categoryObj.name : (post.acf?.content_type || 'Article');
      const featuredImg = post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
      
      return {
        id: post.id,
        slug: post.slug,
        title: post.title?.rendered || '',
        excerpt: (post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
        content: post.content?.rendered || '',
        date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: featuredImg,
        category: categoryName,
        ctaLabel: post.acf?.cta_label || (categoryName.toLowerCase().includes('video') ? 'Watch now' : 'Read')
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
    const categoryName = categoryObj ? categoryObj.name : (post.acf?.content_type || 'Inspiration');
    const featuredImg = post.featured_image_url || post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
    
    let gallery = [];
    if (post.acf?.gallery_images && Array.isArray(post.acf.gallery_images)) {
      gallery = post.acf.gallery_images.map(img => typeof img === 'string' ? img : (img.url || img.sizes?.large || ''));
    } else if (post.acf?.blog_images && Array.isArray(post.acf.blog_images)) {
      gallery = post.acf.blog_images.map(img => typeof img === 'string' ? img : (img.url || ''));
    } else {
      const manualImages = [
        post.acf?.before_image,
        post.acf?.after_image,
        post.acf?.image_1,
        post.acf?.image_2,
        post.acf?.image_3,
        post.acf?.image_4,
        post.acf?.image_5,
        post.acf?.image_6
      ].filter(Boolean);
      if (manualImages.length > 0) gallery = manualImages;
    }

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || '',
      excerpt: (post.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
      content: post.content?.rendered || '',
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: featuredImg,
      author: post._embedded?.author?.[0]?.name || 'Admin',
      category: categoryName,
      gallery: gallery.filter(Boolean),
      specialistTitle: post.acf?.specialist_title || 'SERVICES OF THE HIGHEST QUALITY',
      specialistText: post.acf?.specialist_text || '',
      ryImage: post.acf?.breakout_image || null
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
      title: item.title?.rendered || '',
      description: item.acf?.summary_description || (item.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
      category: (item.acf?.category_badge || 'Treatments').toUpperCase(),
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      howItWorksImage: item.acf?.how_it_works_image || null
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
    return {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || '',
      description: item.acf?.summary_description || (item.excerpt?.rendered || '').replace(/<[^>]+>/g, '').trim(),
      content: (item.content?.rendered || '').replace(/<[^>]+>/g, '').trim(),
      category: (item.acf?.category_badge || 'Treatments').toUpperCase(),
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      howItWorksImage: item.acf?.how_it_works_image || null
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
    return data.map(item => ({
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || '',
      category: item.acf?.treatment_type || 'Treatments',
      patientName: item.acf?.patient_name || 'our client',
      treatmentType: item.acf?.treatment_type || 'Treatment',
      beforeImage: item.acf?.before_image || null,
      afterImage: item.acf?.after_image || null,
      briefTitle: item.acf?.brief_title || '',
      briefDescription: item.acf?.brief_description || '',
      breakoutImage: item.acf?.breakout_image || null,
      image: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || item.acf?.after_image || item.acf?.before_image || null
    }));
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
    
    let gallery = [];
    if (item.acf?.gallery_images && Array.isArray(item.acf.gallery_images)) {
      gallery = item.acf.gallery_images.map(img => typeof img === 'string' ? img : (img.url || img.sizes?.large || ''));
    } else if (item.acf?.case_study_images && Array.isArray(item.acf.case_study_images)) {
      gallery = item.acf.case_study_images.map(img => typeof img === 'string' ? img : (img.url || ''));
    } else {
      const manualImages = [
        item.acf?.image_1,
        item.acf?.image_2,
        item.acf?.image_3,
        item.acf?.image_4,
        item.acf?.image_5,
        item.acf?.image_6
      ].filter(Boolean);
      if (manualImages.length > 0) gallery = manualImages;
    }

    return {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || '',
      content: (item.content?.rendered || '').replace(/<[^>]+>/g, '').trim(),
      category: (item.acf?.treatment_type || 'Treatments').toUpperCase(),
      patientName: item.acf?.patient_name || 'our client',
      treatmentType: item.acf?.treatment_type || 'Treatment',
      beforeImage: item.acf?.before_image || null,
      afterImage: item.acf?.after_image || null,
      briefTitle: item.acf?.brief_title || item.title?.rendered || 'CLINICAL OVERVIEW',
      briefDescription: item.acf?.brief_description || (item.content?.rendered || '').replace(/<[^>]+>/g, '').trim(),
      breakoutImage: item.acf?.breakout_image || null,
      featuredImage: item.featured_image_url || item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      workMainImage: item.acf?.after_image || item.featured_image_url || null,
      gallery: gallery.filter(Boolean)
    };
  } catch {
    return null;
  }
}

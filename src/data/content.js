export { ASSETS } from '../assets.js';

export const BOOKING_URL = "/book";

export const SSA_CLUB_CONTENT = {
  eyebrow: "SSA CLUB",
  subtitle: "Insider · Privé",
  intro: "The Silhouette membership for ongoing skin care, advanced treatments and exclusive member benefits.",
  tiers: [
    {
      id: "insider",
      name: "INSIDER",
      price: "£79",
      period: "/ month",
      summary: "For regular facial care, gentle exfoliation and ongoing support to maintain your skin.",
      ctaText: "Enquire about Insider",
      benefits: [
        "Monthly facial: one superficial peel facial with LED, subject to suitability.",
        "Personalised skin support: treatment plan, home skincare routine and brief check-ins every two weeks.",
        "Member savings: 10% off skincare products and eligible additional advanced treatments and non-prescription injectables.",
        "Birthday reward: one additional complimentary mini facial annually.",
        "Referral thank-you: £50 treatment credit after your referred client completes a qualifying paid treatment.",
        "Six-month loyalty reward: £25 credit towards an eligible additional skin treatment.",
        "Member care: personal welcome note, skincare routine card, digital membership card and dedicated aftercare contact during clinic hours.",
        "Member access: priority booking and invitations to SSA events."
      ]
    },
    {
      id: "prive",
      name: "PRIVÉ",
      price: "£159",
      period: "/ month",
      featured: true,
      summary: "For a personalised advanced treatment programme targeting concerns such as acne scarring, uneven pigmentation, fine lines or reduced firmness.",
      ctaText: "Enquire about Privé",
      benefits: [
        "Advanced treatment programme: advanced facials, chemical peels, microneedling, PRP, skin boosters and polynucleotides, selected following consultation and provided within agreed treatment allowances.",
        "Additional mini facials: included within your agreed programme.",
        "Personalised skin support: treatment plan, home skincare routine, brief check-ins every two weeks, quarterly progress photographs and seasonal routine reviews.",
        "Member savings: 10% off skincare products and 20% off eligible additional advanced treatments and non-prescription injectables.",
        "Birthday reward: one additional complimentary mini facial with LED and a mask upgrade annually.",
        "Referral thank-you: one complimentary superficial peel facial with mask and LED after your referred client completes a qualifying paid treatment.",
        "Six-month loyalty reward: £50 credit towards an eligible additional skin treatment.",
        "Member care: welcome note and selected skincare samples, skincare routine card, digital membership card and dedicated aftercare contact during clinic hours.",
        "Member access: priority booking, invitations to SSA events, early access to new treatments and one annual guest skin consultation."
      ]
    }
  ],
  consultationTitle: "Your membership begins with a consultation",
  consultationText: "We assess your skin and discuss your goals before agreeing your treatment programme. Treatment suitability, quantities and timing are confirmed before you join. Privé includes a defined treatment allowance, rather than every listed treatment each month.",
  rewardsTitle: "Rewards and savings",
  rewardsText1: "Referral rewards apply after the referred client completes their first qualifying full-price paid treatment. Loyalty credits are awarded after six consecutive paid months.",
  rewardsText2: "Discounts and credits cannot be combined with other offers or exchanged for cash. Prescription-only treatments are excluded from promotional discounts."
};

export const CLINIC_CONTENT = {
  about: {
    badge: "• About",
    tagline: "Personalised Care. Clinically Led.",
    title: "Clinical Aesthetics, Tailored to You.",
    conciseStatement: "Skin Silhouette Aesthetics is a nurse-led clinic delivering evidence-based aesthetic, regenerative and skin treatments through individual assessment and considered treatment planning. Our approach is ethical, inclusive and centred on long-term skin health, with particular understanding of melanin-rich and diverse skin tones.",
    p1: "Skin Silhouette Aesthetics is a nurse-led aesthetics and skin clinic providing personalised, evidence-based care with a strong focus on clinical excellence and individuality. The clinic offers a considered range of advanced skin, regenerative and injectable treatments, tailored to individual skin needs, concerns and aesthetic goals. With a particular understanding of melanin-rich skin and diverse skin tones, Skin Silhouette Aesthetics provides inclusive care across all complexions and skin types.",
    p2: "Our approach is consultation-led, combining clinical knowledge with ethical treatment planning, transparency, client education and continuity of care. Rather than following trends or adopting a one-size-fits-all approach, we prioritise appropriate intervention, long-term skin health and individualised outcomes. We provide a professional, discreet and highly personalised standard of care, with your safety, individuality and best interests at the centre of every decision.",
    practitioner_statement: "We provide a professional, discreet and highly personalised standard of care, with your safety, individuality and best interests at the centre of every decision."
  },
  missionVision: {
    mission: "To provide safe, personalised and evidence-based aesthetic care that supports long-term skin health while enhancing individuality. Underpinned by clinical excellence, ethical practice and transparency, we empower clients through education, informed decision-making and advocacy, always placing their best interests at the centre of care.",
    vision: "To shape the future of aesthetics and skin health by advancing standards in clinical excellence, innovation, inclusivity and ethical practice, creating better and more individualised outcomes for every client."
  },
  contactInfo: {
    email: "hello@skinsilhouetteaesthetics.co.uk",
    phone: "+44 7474 578572",
    location: "Birmingham, United Kingdom",
    instagramUrl: "https://www.instagram.com/skinsilhouetteaesthetics?stkn=aThtY2w1dTE4cXBo&utm_source=qr"
  },
  stats: [
    { number: "6yrs+", label: "Clinical experience" },
    { number: "NMC", label: "Registered" },
    { number: "Nurse-Led", label: "Bespoke Care" },
    { number: "Dedicated", label: "After care" }
  ],
  reviews: [
    {
      initials: "KI",
      name: "k.I",
      role: "Verified Client",
      date: "August 2026",
      stars: 5,
      quote: "The consultation booking was swift and effortless. I was able to secure an appointment quickly, with clear communication throughout the process. Everything felt smooth, efficient, and well organised and can't wait for my upcoming appointment!"
    },
    {
      initials: "JM",
      name: "J.M",
      role: "Verified Client",
      date: "July 2026",
      stars: 5,
      quote: "I recently visited Skin Silhouette Aesthetics for a Vitamin B12 injection, and I couldn't be happier with the experience! Nurse Christianah was incredibly professional, welcoming, and made me feel completely at ease from the moment I walked in."
    }
  ],
  ctaBanner: {
    title: "Exceptional Care Begins with a Conversation.",
    desc: "A personalised consultation to understand your concerns and guide a considered treatment plan.",
    btn: "Book Consultation"
  },
  treatmentFAQs: [
    {
      q: "Do I need a consultation before treatment?",
      a: "Yes. Your safety and suitability for treatment are our priority. A consultation allows us to discuss your concerns, medical history, expectations and treatment options before creating an individualised plan for you."
    },
    {
      q: "What happens during my consultation?",
      a: "Your consultation is an opportunity to discuss your skin or aesthetic concerns, desired outcomes and any previous treatments. We will assess the treatment area, review relevant medical history and explain suitable options, expected results, risks and aftercare."
    },
    {
      q: "I'm not sure which treatment I need. Can you help?",
      a: "Absolutely. You do not need to know which treatment to book before speaking with us. We can assess your concerns and recommend the most appropriate options based on your individual needs and goals."
    },
    {
      q: "What's the difference between anti-wrinkle treatments and dermal fillers?",
      a: "Anti-wrinkle treatments temporarily reduce targeted muscle activity to soften dynamic lines. Dermal fillers are used to restore or enhance volume, shape and structural definition."
    },
    {
      q: "Will I look overdone?",
      a: "Our approach is subtle and considered. Every treatment is tailored to your individual features with the aim of enhancing, not changing, what makes you uniquely you."
    }
  ],
  bookingFAQs: [
    {
      q: "How do I book a consultation?",
      a: "Consultations can be booked directly online through our Atelier Booking Page. Select your preferred treatment and choose an available date and time slot."
    },
    {
      q: "Do I need to pay a booking fee?",
      a: "A non-refundable booking fee of £50 is required to secure your consultation. This fee is fully deducted from your final treatment balance at checkout."
    },
    {
      q: "Can I reschedule my appointment?",
      a: "Yes. We understand that plans can change. We kindly ask for at least 48 hours' notice if you need to reschedule without forfeiting your deposit."
    }
  ]
};

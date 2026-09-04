/* ==========================================================================
   MASTER HIGH-AMPLITUDE MOTION ENGINE: HIGH-FASHION ATELIER CURVES
   ========================================================================== */

// 1. VIOLENT HIGH-ENERGY SPRING PRESETS
export const SPRINGS = {
  extremeBouncy: { type: "spring", stiffness: 450, damping: 12, mass: 0.6 },
  elasticSnap: { type: "spring", stiffness: 500, damping: 14, mass: 0.5 },
  heavyGlider: { type: "spring", stiffness: 140, damping: 18, mass: 1.1 },
  liquidDecel: { ease: [0.16, 1, 0.3, 1], duration: 0.85 }
};

// 2. 3D KINETIC TYPOGRAPHY VARIANTS
export const wordRevealContainer = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: custom * 0.07
    }
  })
};

export const wordRevealItem = {
  hidden: {
    opacity: 0,
    y: 70,
    rotateX: -80,
    scale: 0.82,
    transformPerspective: 1200
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 14
    }
  }
};

// 3. HIGH-AMPLITUDE STAGGERED 3D GRID CASCADES
export const staggerGridContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

export const staggerCardExtreme = {
  hidden: {
    opacity: 0,
    y: 110,
    scale: 0.82,
    rotateZ: 2.5
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateZ: 0,
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 15,
      mass: 0.85
    }
  }
};

// 4. UNIVERSAL TOUCH SQUASH & HOVER POP
export const universalTouchSquash = {
  scale: 0.88,
  rotate: -2,
  transition: { type: "spring", stiffness: 600, damping: 20 }
};

export const universalHoverPop = {
  scale: 1.05,
  y: -8,
  transition: { type: "spring", stiffness: 350, damping: 14 }
};

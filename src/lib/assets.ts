// Centralized media assets configuration.
// Update paths here to swap images/videos across the site without touching component code.

export const ASSETS = {
  logo: "/assets/Xude_Final_Logo.svg",
  footerLogo: "/assets/media__1781978310756.png",

  hero: {
    slides: [
      {
        mobile: "/assets/pimg1.png",
        desktop: "/assets/img1.png",
        alt: "Xude Energy reimagined",
      },
      {
        mobile: "/assets/pimg3.png",
        desktop: "/assets/img3.png",
        alt: "Built for every energy",
      },
      {
        mobile: "/assets/img4.png",
        desktop: "/assets/img4.png",
        alt: "Adventure with Xude",
      },
    ],
  },

  difference: {
    stories: [
      {
        image: "/gallery_1_new.jpg",
        alt: "Corporate energy",
      },
      {
        image: "/gallery_2_new.jpg",
        alt: "Fruit inspiration",
      },
      {
        image: "/gallery_3_new.jpg",
        alt: "Crafted energy",
      },
    ],
  },

  inside: {
    videoMobile: "/assets/IngredLand.mp4", // Ensure this is the correct mobile video name
    videoDesktop: "/assets/Xudehor.mp4", // Ensure this is the correct desktop video name
  },


  joinUs: {
    teamVideo: "/assets/Distribute.mp4",
    partnerVideo: "/assets/Cash.mp4",
  },
} as const;

export type Assets = typeof ASSETS;

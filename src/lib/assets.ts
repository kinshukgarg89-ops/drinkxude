// Centralized media assets configuration.
// Update paths here to swap images/videos across the site without touching component code.

export const ASSETS = {
  logo: "/assets/Xude_Final_Logo.svg",
  footerLogo: "/assets/media__1781978310756.png",

  hero: {
    slides: [
      {
        mobile: "/assets/hero_slide_1_traffic_1781979518558.png",
        desktop: "/assets/hero_slide_1_traffic_1781979518558.png",
        alt: "Xude Energy in the city",
      },
      {
        mobile: "/assets/hero_slide_2_fruit_1781979531812.png",
        desktop: "/assets/hero_slide_2_fruit_1781979531812.png",
        alt: "Fruit-forward energy",
      },
      {
        mobile: "/assets/hero_slide_3_bigfoot_1781979543557.png",
        desktop: "/assets/hero_slide_3_bigfoot_1781979543557.png",
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
    video: "/assets/xude_ingred.mp4",
  },

  shop: {
    products: [
      {
        id: "lemon-mint",
        image: "/assets/lemon-mint-can.png",
        alt: "Lemon Mint 12-Pack",
      },
      {
        id: "mango-passion",
        image: "/assets/mango-passion-can.png",
        alt: "Mango Passion 12-Pack",
      },
    ],
  },

  joinUs: {
    teamVideo: "/assets/team-video.mp4",
    partnerVideo: "/assets/partner-video.mp4",
  },
} as const;

export type Assets = typeof ASSETS;

import {
  oak,
  eme,
  e1flyer,
  e11,
  e12,
  e13,
  e14,
  e1main,
  e2main,
  e2flyer,
  e21,
  e22,
  e23,
  e24,
  o1main,
  o11,
  o12,
  o13,
  o14,
  o2main,
  o21,
  o22,
  o23,
  o24,
  o3main,
  o31,
  o32,
  o33,
  o34,
} from "../assets";

export const featured = [
  {
    img: eme,
    title: "EMERALD SPRINGS APARTMENT",
    desc: "Flexible payment of up to 30 months",
    location: "Westland, Nairobi",
  },
  {
    img: oak,
    title: "OAK WEST RESIDENCY",
    desc: "Flexible payment of up to 30 months",
    location: "Westland, Nairobi",
  },
];

export const emeraldOneBed = [
  {
    id: "emerald-1-bedroom",
    title: "1 BEDROOM APARTMENT",
    mainImg: e1main,
    flyer: e1flyer,
    photos: [e11, e12, e13, e14],
    desc: "A thoughtfully designed space combining comfort, privacy, and style ideal for individuals or couples seeking modern living in a serene environment.",
    location: "Westland, Nairobi, kenya",
    avgPrice: "9.28M KSH ($72,000)",
    highlights: [
      "Flexible payment plans",
      "Prime locations",
      "Modern Interiors",
      "Secure Environment",
      "Family-friendly amenities",
      "12% annual ROI",
      "24/7 security",
      "25 floors of modern living",
    ],
  },
];

export const emeraldTwoBed = [
  {
    id: "emerald-2-bedroom",
    title: "2 BEDROOM APARTMENT",
    mainImg: e2main,
    flyer: e2flyer,
    photos: [e21, e22, e23, e24],
    desc: "Spacious and elegantly designed, this two-bedroom apartment offers the perfect balance of privacy and shared living, ideal for small families, young professionals, or savvy investors.",
    location: "Westland, Nairobi, kenya",
    avgPrice: "15.2M KSH ($120,000)",
    highlights: [
      "Flexible payment plans",
      "Prime locations",
      "Modern Interiors",
      "Secure Environment",
      "Family-friendly amenities",
      "12% annual ROI",
      "24/7 security",
      "25 floors of modern living",
    ],
  },
];

export const oakOneBed = [
  {
    id: "oak-1-bedroom",
    title: "1 BEDROOM APARTMENT",
    mainImg: o1main,
    photos: [o11, o12, o13, o14],
    desc: "A thoughtfully designed space combining comfort, privacy, and style ideal for individuals or couples seeking modern living in a serene environment.",
    location: "Westland, Nairobi, kenya",
    avgPrice: "1 bedroom (58 SQM) - 8.1M KSH",
    highlights: [
      "Flexible payment plans",
      "Prime locations",
      "Modern Interiors",
      "Secure Environment",
      "Family-friendly amenities",
      "12% annual ROI",
      "24/7 security",
      "25 floors of modern living",
    ],
    pricingPlan: [
      {
        title: "1 BEDROOM APARTMENT",
        price: "8.1M KSH",
        installmentPlan: [
          "30% - 2,640,000 (deposit)",
          "12.5% - 1,100,000 (6 months)",
          "12.5% - 1,100,000 (12 months)",
          "20% - 1,760,000 (upon completion November 2027)",
        ],
      },
      {
        title: "1 BEDROOM APARTMENT PLUS STUDY",
        price: "8.8M KSH",
        installmentPlan: [
          "30% - 2,640,000 (deposit)",
          "12.5% - 1,100,000 (6 months)",
          "12.5% - 1,100,000 (12 months)",
          "20% - 1,760,000 (upon completion November 2027)",
        ],
      },
    ],
  },
];

export const oakTwoBed = [
  {
    id: "oak-2-bedroom",
    title: "2 BEDROOM APARTMENT",
    mainImg: o2main,
    photos: [o21, o22, o23, o24],
    desc: "A thoughtfully designed space combining comfort, privacy, and style ideal for individuals or couples seeking modern living in a serene environment.",
    location: "Westland, Nairobi, kenya",
    avgPrice: "KSH 12.7M ($100,000)",
    highlights: [
      "Flexible payment plans",
      "Prime locations",
      "Modern Interiors",
      "Secure Environment",
      "Family-friendly amenities",
      "12% annual ROI",
      "24/7 security",
      "25 floors of modern living",
    ],
    pricingPlan: [
      {
        title: "2 BEDROOM FLOOR 12 TO 19",
        price: "14.7M KSH",
        installmentPlan: [
          "20% - 2,940,000 (deposit)",
          "15% - 2,205,000 (6 months)",
          "15% - 2,205,000 (12 months)",
          "20% - 2,940,000 (upon completion November 2027)",
        ],
      },
      {
        title: "2 BEDROOM FLOOR 12 TO 19",
        price: "14.7M KSH",
        installmentPlan: [
          "20% - 2,940,000 (deposit)",
          "15% - 2,205,000 (6 months)",
          "15% - 2,205,000 (12 months)",
          "20% - 2,940,000 (upon completion November 2027)",
        ],
      },
    ],
  },
];

export const oakThreeBed = [
  {
    id: "oak-3-bedroom",
    title: "3 BEDROOM APARTMENT",
    mainImg: o3main,
    photos: [o31, o32, o33, o34],
    desc: "A thoughtfully designed space combining comfort, privacy, and style ideal for individuals or couples seeking modern living in a serene environment.",
    location: "Westland, Nairobi, kenya",
    avgPrice: "KSH 20.2M ($160,000)",
    highlights: [
      "Flexible payment plans",
      "Prime locations",
      "Modern Interiors",
      "Secure Environment",
      "Family-friendly amenities",
      "12% annual ROI",
      "24/7 security",
      "25 floors of modern living",
    ],
    pricingPlan: [
      {
        title: "3 BEDROOM FLOOR 12 TO 19",
        price: "20.2M KSH",
        installmentPlan: [
          "20% - 4,040,000 (deposit)",
          "15% - 3,030,000 (6 months)",
          "15% - 3,030,000 (12 months)",
          "20% - 4,040,000 (upon completion November 2027)",
        ],
      },
      {
        title: "3 BEDROOM FLOOR 12 TO 19",
        price: "20.2M KSH",
        installmentPlan: [
          "20% - 4,040,000 (deposit)",
          "15% - 3,030,000 (6 months)",
          "15% - 3,030,000 (12 months)",
          "20% - 4,040,000 (upon completion November 2027)",
        ],
      },
    ],
  },
];

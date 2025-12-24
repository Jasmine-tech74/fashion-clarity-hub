// Static mockup images for MVP validation mode
import mockup01 from "@/assets/mockups/mockup_01_male_native_senator_ankara.png";
import mockup02 from "@/assets/mockups/mockup_02_male_native_senator_plain.png";
import mockup03 from "@/assets/mockups/mockup_03_female_native_gown_ankara.png";
import mockup04 from "@/assets/mockups/mockup_04_female_native_lace_aso_oke.png";
import mockup05 from "@/assets/mockups/mockup_05_male_english_suit.png";
import mockup06 from "@/assets/mockups/mockup_06_female_english_dress.png";
import mockup07 from "@/assets/mockups/mockup_07_unisex_casual_two_piece.png";
import mockup08 from "@/assets/mockups/mockup_08_male_wedding_native_agbada.png";
import mockup09 from "@/assets/mockups/mockup_09_female_wedding_bridal_native.png";
import mockup10 from "@/assets/mockups/mockup_10_top_only_design.png";

export interface MockupInput {
  gender: string;
  outfitType: string;
  fabricType: string;
  fitStyle: string;
  description: string;
}

interface MockupRule {
  id: string;
  image: string;
  name: string;
  priority: number; // Higher = more specific
  match: (input: MockupInput) => boolean;
}

const normalizeText = (text: string): string => text.toLowerCase().trim();

const containsKeyword = (text: string, keywords: string[]): boolean => {
  const normalized = normalizeText(text);
  return keywords.some(keyword => normalized.includes(keyword.toLowerCase()));
};

// Mockup rules ordered by specificity (evaluated in order)
const mockupRules: MockupRule[] = [
  // MOCKUP 10 — Top only (check first as it's specific)
  {
    id: "mockup_10",
    image: mockup10,
    name: "Top Only Design",
    priority: 100,
    match: (input) => containsKeyword(input.description, ["top only", "blouse", "shirt only", "just top", "top design"]),
  },
  
  // MOCKUP 08 — Male Wedding Agbada
  {
    id: "mockup_08",
    image: mockup08,
    name: "Male Wedding Agbada",
    priority: 95,
    match: (input) => 
      normalizeText(input.gender) === "men" && 
      normalizeText(input.outfitType) === "wedding" ||
      (normalizeText(input.gender) === "men" && containsKeyword(input.description, ["agbada", "groom", "traditional wedding"])),
  },
  
  // MOCKUP 09 — Female Wedding Bridal
  {
    id: "mockup_09",
    image: mockup09,
    name: "Female Wedding Bridal",
    priority: 95,
    match: (input) => 
      normalizeText(input.gender) === "women" && 
      normalizeText(input.outfitType) === "wedding" ||
      (normalizeText(input.gender) === "women" && containsKeyword(input.description, ["bridal", "bride", "traditional wedding"])),
  },
  
  // MOCKUP 04 — Female Native Lace/Aso-Oke
  {
    id: "mockup_04",
    image: mockup04,
    name: "Female Native Lace/Aso-Oke",
    priority: 90,
    match: (input) => 
      normalizeText(input.gender) === "women" && 
      (normalizeText(input.outfitType) === "native-wear" || normalizeText(input.outfitType) === "wedding") &&
      (normalizeText(input.fabricType) === "lace" || normalizeText(input.fabricType) === "aso-oke") ||
      (normalizeText(input.gender) === "women" && containsKeyword(input.description, ["traditional wedding", "engagement", "aso oke", "aso-oke"])),
  },
  
  // MOCKUP 01 — Male Native Ankara
  {
    id: "mockup_01",
    image: mockup01,
    name: "Male Native Senator Ankara",
    priority: 85,
    match: (input) => 
      normalizeText(input.gender) === "men" && 
      normalizeText(input.outfitType) === "native-wear" &&
      normalizeText(input.fabricType) === "ankara" ||
      (normalizeText(input.gender) === "men" && containsKeyword(input.description, ["senator", "native", "traditional", "ankara"])),
  },
  
  // MOCKUP 02 — Male Native Plain
  {
    id: "mockup_02",
    image: mockup02,
    name: "Male Native Senator Plain",
    priority: 80,
    match: (input) => 
      normalizeText(input.gender) === "men" && 
      normalizeText(input.outfitType) === "native-wear" &&
      (normalizeText(input.fabricType) === "cotton" || normalizeText(input.fabricType) === "senator") ||
      (normalizeText(input.gender) === "men" && containsKeyword(input.description, ["simple", "clean", "classic", "plain", "white"])),
  },
  
  // MOCKUP 03 — Female Native Ankara Gown
  {
    id: "mockup_03",
    image: mockup03,
    name: "Female Native Ankara Gown",
    priority: 85,
    match: (input) => 
      normalizeText(input.gender) === "women" && 
      (normalizeText(input.outfitType) === "native-wear" || normalizeText(input.outfitType) === "gown") &&
      normalizeText(input.fabricType) === "ankara" ||
      (normalizeText(input.gender) === "women" && containsKeyword(input.description, ["gown", "ankara", "long", "native"])),
  },
  
  // MOCKUP 05 — Male English Suit
  {
    id: "mockup_05",
    image: mockup05,
    name: "Male English Suit",
    priority: 85,
    match: (input) => 
      normalizeText(input.gender) === "men" && 
      normalizeText(input.outfitType) === "shirt-trousers" ||
      (normalizeText(input.gender) === "men" && containsKeyword(input.description, ["suit", "formal", "corporate", "english", "office"])),
  },
  
  // MOCKUP 06 — Female English Dress
  {
    id: "mockup_06",
    image: mockup06,
    name: "Female English Dress",
    priority: 80,
    match: (input) => 
      normalizeText(input.gender) === "women" && 
      (normalizeText(input.outfitType) === "shirt-trousers" || normalizeText(input.outfitType) === "casual") ||
      (normalizeText(input.gender) === "women" && containsKeyword(input.description, ["dress", "office", "corporate", "simple", "english"])),
  },
  
  // MOCKUP 07 — Casual Two-Piece (unisex)
  {
    id: "mockup_07",
    image: mockup07,
    name: "Unisex Casual Two-Piece",
    priority: 70,
    match: (input) => 
      normalizeText(input.outfitType) === "casual" ||
      containsKeyword(input.description, ["two-piece", "two piece", "casual", "everyday", "ready-to-wear"]),
  },
];

// Fallback rules based on gender only
const genderFallbacks: Record<string, string> = {
  men: mockup02, // Male native plain as default
  women: mockup03, // Female native ankara gown as default
  kids: mockup07, // Casual two-piece for kids
};

export const findMatchingMockup = (input: MockupInput): { image: string; name: string; isExactMatch: boolean } => {
  // Sort rules by priority (highest first)
  const sortedRules = [...mockupRules].sort((a, b) => b.priority - a.priority);
  
  // Find the first matching rule
  for (const rule of sortedRules) {
    if (rule.match(input)) {
      return {
        image: rule.image,
        name: rule.name,
        isExactMatch: true,
      };
    }
  }
  
  // Fallback based on gender
  const genderKey = normalizeText(input.gender);
  const fallbackImage = genderFallbacks[genderKey] || mockup07;
  
  return {
    image: fallbackImage,
    name: "Suggested Style",
    isExactMatch: false,
  };
};

// Check if description is too complex for MVP
export const isDescriptionTooComplex = (description: string): boolean => {
  const complexKeywords = [
    "3d", "hologram", "metallic chains", "led lights", "animated", 
    "transparent", "see-through mesh", "cyberpunk", "futuristic armor",
    "sci-fi", "robotic", "mechanical"
  ];
  
  return containsKeyword(description, complexKeywords);
};

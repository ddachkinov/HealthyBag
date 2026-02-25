import type { EbagProduct, NutrientRole, GrocerySuggestion } from "@/lib/ebag/types";
import type { TDEEResult } from "@/lib/nutrition/tdee";
import type { DietType } from "@/lib/store/onboarding";
import { MOCK_EBAG_PRODUCTS } from "@/lib/ebag/mock-data";

// Categories excluded per diet type
const DIET_EXCLUSIONS: Record<DietType, string[]> = {
  omnivore: [],
  pescatarian: ["meat", "poultry"],
  vegetarian: ["meat", "poultry", "fish"],
  vegan: ["meat", "poultry", "fish", "eggs", "dairy"],
};

// Map allergy labels to product categories/names to exclude
const ALLERGY_KEYWORDS: Record<string, string[]> = {
  gluten: ["bread", "pasta", "oats"],
  dairy: ["cheese", "yogurt", "butter", "milk", "извара", "сирене", "мляко", "масло"],
  nuts: ["almonds", "бадеми", "walnut", "cashew"],
  eggs: ["eggs", "яйца"],
  fish: ["salmon", "tuna", "сьомга", "тон"],
  soy: ["soy", "соя"],
};

function classifyNutrientRole(product: EbagProduct): NutrientRole {
  const n = product.nutrition;
  if (!n) return "mixed";

  const total = n.proteinPer100g + n.carbsPer100g + n.fatPer100g;
  if (total === 0) return "mixed";

  const proteinRatio = n.proteinPer100g / total;
  const carbRatio = n.carbsPer100g / total;
  const fatRatio = n.fatPer100g / total;

  if (n.fiberPer100g && n.fiberPer100g > 5) return "fiber";
  if (proteinRatio > 0.5) return "protein";
  if (carbRatio > 0.6) return "carbs";
  if (fatRatio > 0.6) return "fat";
  return "mixed";
}

function matchesAllergyKeyword(product: EbagProduct, keywords: string[]): boolean {
  const searchable = `${product.name} ${product.nameBg} ${product.category}`.toLowerCase();
  return keywords.some((kw) => searchable.includes(kw.toLowerCase()));
}

function defaultServingGrams(product: EbagProduct): number {
  switch (product.category) {
    case "oils":
      return 15; // 1 tbsp
    case "nuts_seeds":
      return 30;
    case "grains":
    case "legumes":
      return 80; // dry weight
    case "bread":
      return 60; // ~2 slices
    case "dairy":
      return product.name.toLowerCase().includes("cheese") ? 50 : 150;
    case "eggs":
      return 120; // ~2 eggs
    default:
      return 150;
  }
}

export interface SuggestionFilters {
  dietType: DietType;
  allergies: string[];
  tdee: TDEEResult;
  weeklyBudgetBgn: number | null;
}

export function getSuggestedGroceries(filters: SuggestionFilters): GrocerySuggestion[] {
  const { dietType, allergies, tdee } = filters;
  const excluded = DIET_EXCLUSIONS[dietType];

  let products = MOCK_EBAG_PRODUCTS.filter((p) => {
    // Must be in stock
    if (!p.inStock) return false;

    // Diet exclusion
    if (excluded.includes(p.category)) return false;

    // Allergy exclusion
    for (const allergy of allergies) {
      const keywords = ALLERGY_KEYWORDS[allergy.toLowerCase()];
      if (keywords && matchesAllergyKeyword(p, keywords)) return false;
    }

    // Must have nutrition data
    if (!p.nutrition) return false;

    return true;
  });

  // Score and rank products
  const scored = products.map((product) => {
    const n = product.nutrition!;
    const role = classifyNutrientRole(product);
    const servingG = defaultServingGrams(product);
    const factor = servingG / 100;

    const servingCalories = Math.round(n.caloriesPer100g * factor);
    const servingProtein = Math.round(n.proteinPer100g * factor * 10) / 10;
    const servingCarbs = Math.round(n.carbsPer100g * factor * 10) / 10;
    const servingFat = Math.round(n.fatPer100g * factor * 10) / 10;

    const savingsAmount = product.originalPrice
      ? Math.round((product.originalPrice - product.price) * 100) / 100
      : undefined;

    // Scoring: discount weight + nutritional density
    let score = 0;

    // Discount bonus (0-30 points)
    score += (product.discountPct ?? 0);

    // Protein density bonus for protein-focused goals
    if (
      tdee.targetProtein > 100 &&
      n.proteinPer100g > 15
    ) {
      score += 15;
    }

    // Low calorie density bonus for fat loss
    if (tdee.targetCalories < tdee.tdee && n.caloriesPer100g < 100) {
      score += 10;
    }

    // Fiber bonus
    if (n.fiberPer100g && n.fiberPer100g > 3) {
      score += 5;
    }

    const reason = buildReason(product, role, savingsAmount);

    return {
      product,
      reason,
      nutrientRole: role,
      servingSizeGrams: servingG,
      servingCalories,
      servingProtein,
      servingCarbs,
      servingFat,
      savingsAmount,
      _score: score,
    };
  });

  // Sort by score descending
  scored.sort((a, b) => b._score - a._score);

  // Return balanced selection: ensure variety across nutrient roles
  const result: GrocerySuggestion[] = [];
  const roleCounts: Record<string, number> = {};
  const maxPerRole = 6;

  for (const item of scored) {
    const count = roleCounts[item.nutrientRole] ?? 0;
    if (count < maxPerRole) {
      const { _score, ...suggestion } = item;
      result.push(suggestion);
      roleCounts[item.nutrientRole] = count + 1;
    }
  }

  return result;
}

function buildReason(
  product: EbagProduct,
  role: NutrientRole,
  savings?: number
): string {
  const parts: string[] = [];

  if (savings && savings > 0) {
    parts.push(`Save ${savings.toFixed(2)} лв`);
  }

  const roleLabels: Record<NutrientRole, string> = {
    protein: "High protein",
    carbs: "Quality carbs",
    fat: "Healthy fats",
    fiber: "Rich in fiber",
    mixed: "Balanced nutrition",
  };
  parts.push(roleLabels[role]);

  if (product.discountPct && product.discountPct >= 25) {
    parts.push("Great deal!");
  }

  return parts.join(" · ");
}

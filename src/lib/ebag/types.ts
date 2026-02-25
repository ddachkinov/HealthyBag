export interface EbagProduct {
  ebagId: string;
  name: string;
  nameBg: string;
  category: EbagCategory;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discountPct?: number;
  unit: string;
  weightGrams?: number;
  imageUrl?: string;
  ebagUrl: string;
  inStock: boolean;
  nutrition?: NutritionInfo;
}

export interface NutritionInfo {
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g?: number;
}

export type EbagCategory =
  | "fruits"
  | "vegetables"
  | "meat"
  | "poultry"
  | "fish"
  | "eggs"
  | "dairy"
  | "bread"
  | "grains"
  | "legumes"
  | "nuts_seeds"
  | "oils"
  | "frozen"
  | "other";

export type NutrientRole = "protein" | "carbs" | "fat" | "fiber" | "mixed";

export interface GrocerySuggestion {
  product: EbagProduct;
  reason: string;
  nutrientRole: NutrientRole;
  servingSizeGrams: number;
  servingCalories: number;
  servingProtein: number;
  servingCarbs: number;
  servingFat: number;
  savingsAmount?: number;
}

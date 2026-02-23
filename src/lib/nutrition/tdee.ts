/**
 * Research-backed TDEE (Total Daily Energy Expenditure) calculator.
 *
 * Based on:
 * - Mifflin-St Jeor equation (general population)
 * - Katch-McArdle equation (when body fat % is known)
 *
 * References:
 * - Mifflin MD et al. Am J Clin Nutr. 1990;51(2):241-247
 * - McArdle WD et al. Exercise Physiology. 2010
 * - Hall KD et al. Lancet. 2011;378(9793):826-837 (NIH Body Weight Planner)
 */

export type Sex = "male" | "female";

export type ActivityLevel =
  | "sedentary"
  | "lightly_active"
  | "moderately_active"
  | "very_active"
  | "athlete";

export type Goal =
  | "lose_fat"
  | "lose_fat_aggressive"
  | "maintain"
  | "lean_gain"
  | "muscle_gain";

export interface UserMetrics {
  age: number;
  sex: Sex;
  heightCm: number;
  weightKg: number;
  bodyFatPct?: number;
  activityLevel: ActivityLevel;
  goal: Goal;
}

export interface TDEEResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  targetProtein: number; // grams
  targetCarbs: number; // grams
  targetFat: number; // grams
  formula: "mifflin_st_jeor" | "katch_mcardle";
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  athlete: 1.9,
};

const GOAL_ADJUSTMENTS: Record<Goal, (tdee: number) => number> = {
  lose_fat: (tdee) => tdee * 0.8,
  lose_fat_aggressive: (tdee) => tdee * 0.75,
  maintain: (tdee) => tdee,
  lean_gain: (tdee) => tdee + 200,
  muscle_gain: (tdee) => tdee + 400,
};

// Protein g/kg based on goal
const PROTEIN_RANGES: Record<Goal, { min: number; max: number }> = {
  lose_fat: { min: 1.6, max: 2.2 },
  lose_fat_aggressive: { min: 1.8, max: 2.4 },
  maintain: { min: 1.2, max: 1.6 },
  lean_gain: { min: 1.8, max: 2.2 },
  muscle_gain: { min: 1.8, max: 2.4 },
};

/**
 * Calculate BMR using the Mifflin-St Jeor equation.
 * Most validated formula for the general population.
 */
export function calculateBMRMifflinStJeor(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: Sex
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

/**
 * Calculate BMR using the Katch-McArdle equation.
 * More accurate when body fat percentage is known.
 */
export function calculateBMRKatchMcArdle(
  weightKg: number,
  bodyFatPct: number
): number {
  const leanBodyMass = weightKg * (1 - bodyFatPct / 100);
  return 370 + 21.6 * leanBodyMass;
}

/**
 * Calculate the full TDEE breakdown including macro targets.
 */
export function calculateTDEE(metrics: UserMetrics): TDEEResult {
  // Choose BMR formula based on available data
  let bmr: number;
  let formula: TDEEResult["formula"];

  if (metrics.bodyFatPct !== undefined && metrics.bodyFatPct > 0) {
    bmr = calculateBMRKatchMcArdle(metrics.weightKg, metrics.bodyFatPct);
    formula = "katch_mcardle";
  } else {
    bmr = calculateBMRMifflinStJeor(
      metrics.weightKg,
      metrics.heightCm,
      metrics.age,
      metrics.sex
    );
    formula = "mifflin_st_jeor";
  }

  // Apply activity multiplier
  const activityMultiplier = ACTIVITY_MULTIPLIERS[metrics.activityLevel];
  const tdee = bmr * activityMultiplier;

  // Apply goal adjustment
  const targetCalories = GOAL_ADJUSTMENTS[metrics.goal](tdee);

  // Calculate macros
  const proteinRange = PROTEIN_RANGES[metrics.goal];
  const proteinGPerKg = (proteinRange.min + proteinRange.max) / 2;
  const targetProtein = metrics.weightKg * proteinGPerKg;

  // Fat: 30% of total calories (ensure minimum 0.8g/kg)
  const fatFromPct = (targetCalories * 0.3) / 9; // 9 cal per gram of fat
  const fatMinimum = metrics.weightKg * 0.8;
  const targetFat = Math.max(fatFromPct, fatMinimum);

  // Carbs: remaining calories
  const proteinCalories = targetProtein * 4;
  const fatCalories = targetFat * 9;
  const carbCalories = targetCalories - proteinCalories - fatCalories;
  const targetCarbs = Math.max(0, carbCalories / 4); // 4 cal per gram of carbs

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    targetProtein: Math.round(targetProtein),
    targetCarbs: Math.round(targetCarbs),
    targetFat: Math.round(targetFat),
    formula,
  };
}

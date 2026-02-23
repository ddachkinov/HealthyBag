import { describe, it, expect } from "vitest";
import {
  calculateBMRMifflinStJeor,
  calculateBMRKatchMcArdle,
  calculateTDEE,
  type UserMetrics,
} from "./tdee";

describe("calculateBMRMifflinStJeor", () => {
  it("calculates BMR for a male", () => {
    // 30-year-old male, 80kg, 180cm
    // Expected: 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
    const bmr = calculateBMRMifflinStJeor(80, 180, 30, "male");
    expect(bmr).toBe(1780);
  });

  it("calculates BMR for a female", () => {
    // 25-year-old female, 60kg, 165cm
    // Expected: 10*60 + 6.25*165 - 5*25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25
    const bmr = calculateBMRMifflinStJeor(60, 165, 25, "female");
    expect(bmr).toBe(1345.25);
  });

  it("returns higher BMR for heavier individuals", () => {
    const lighter = calculateBMRMifflinStJeor(60, 175, 30, "male");
    const heavier = calculateBMRMifflinStJeor(90, 175, 30, "male");
    expect(heavier).toBeGreaterThan(lighter);
  });

  it("returns lower BMR for older individuals", () => {
    const younger = calculateBMRMifflinStJeor(75, 175, 25, "male");
    const older = calculateBMRMifflinStJeor(75, 175, 55, "male");
    expect(older).toBeLessThan(younger);
  });

  it("returns higher BMR for taller individuals", () => {
    const shorter = calculateBMRMifflinStJeor(70, 160, 30, "female");
    const taller = calculateBMRMifflinStJeor(70, 180, 30, "female");
    expect(taller).toBeGreaterThan(shorter);
  });
});

describe("calculateBMRKatchMcArdle", () => {
  it("calculates BMR from lean body mass", () => {
    // 80kg, 15% body fat → LBM = 80 * 0.85 = 68kg
    // Expected: 370 + 21.6 * 68 = 370 + 1468.8 = 1838.8
    const bmr = calculateBMRKatchMcArdle(80, 15);
    expect(bmr).toBeCloseTo(1838.8, 1);
  });

  it("returns higher BMR for lower body fat at same weight", () => {
    const higherBF = calculateBMRKatchMcArdle(80, 25);
    const lowerBF = calculateBMRKatchMcArdle(80, 12);
    expect(lowerBF).toBeGreaterThan(higherBF);
  });

  it("handles very low body fat", () => {
    const bmr = calculateBMRKatchMcArdle(70, 5);
    // LBM = 70 * 0.95 = 66.5 → 370 + 21.6 * 66.5 = 1806.4
    expect(bmr).toBeCloseTo(1806.4, 1);
  });
});

describe("calculateTDEE", () => {
  const baseMetrics: UserMetrics = {
    age: 30,
    sex: "male",
    heightCm: 180,
    weightKg: 80,
    activityLevel: "moderately_active",
    goal: "maintain",
  };

  it("uses Mifflin-St Jeor when body fat is not provided", () => {
    const result = calculateTDEE(baseMetrics);
    expect(result.formula).toBe("mifflin_st_jeor");
  });

  it("uses Katch-McArdle when body fat is provided", () => {
    const result = calculateTDEE({ ...baseMetrics, bodyFatPct: 15 });
    expect(result.formula).toBe("katch_mcardle");
  });

  it("applies activity multiplier correctly", () => {
    const sedentary = calculateTDEE({
      ...baseMetrics,
      activityLevel: "sedentary",
    });
    const active = calculateTDEE({
      ...baseMetrics,
      activityLevel: "very_active",
    });
    expect(active.tdee).toBeGreaterThan(sedentary.tdee);
  });

  it("applies fat loss deficit", () => {
    const maintain = calculateTDEE({ ...baseMetrics, goal: "maintain" });
    const loseFat = calculateTDEE({ ...baseMetrics, goal: "lose_fat" });
    expect(loseFat.targetCalories).toBeLessThan(maintain.targetCalories);
    // 20% deficit
    expect(loseFat.targetCalories).toBeCloseTo(maintain.tdee * 0.8, -1);
  });

  it("applies muscle gain surplus", () => {
    const maintain = calculateTDEE({ ...baseMetrics, goal: "maintain" });
    const gain = calculateTDEE({ ...baseMetrics, goal: "muscle_gain" });
    expect(gain.targetCalories).toBeGreaterThan(maintain.targetCalories);
    expect(gain.targetCalories).toBeCloseTo(maintain.tdee + 400, -1);
  });

  it("sets higher protein for fat loss goals", () => {
    const maintain = calculateTDEE({ ...baseMetrics, goal: "maintain" });
    const loseFat = calculateTDEE({ ...baseMetrics, goal: "lose_fat" });
    expect(loseFat.targetProtein).toBeGreaterThan(maintain.targetProtein);
  });

  it("ensures macros approximately sum to target calories", () => {
    const result = calculateTDEE(baseMetrics);
    const macroCalories =
      result.targetProtein * 4 +
      result.targetCarbs * 4 +
      result.targetFat * 9;
    // Allow some rounding tolerance
    expect(macroCalories).toBeCloseTo(result.targetCalories, -2);
  });

  it("ensures fat never goes below 0.8g/kg minimum", () => {
    const result = calculateTDEE(baseMetrics);
    expect(result.targetFat).toBeGreaterThanOrEqual(
      baseMetrics.weightKg * 0.8
    );
  });

  it("ensures carbs are non-negative", () => {
    // Even with extreme scenarios, carbs should not go negative
    const extreme: UserMetrics = {
      age: 25,
      sex: "male",
      heightCm: 170,
      weightKg: 120,
      activityLevel: "sedentary",
      goal: "lose_fat_aggressive",
    };
    const result = calculateTDEE(extreme);
    expect(result.targetCarbs).toBeGreaterThanOrEqual(0);
  });

  it("returns reasonable values for a typical female user", () => {
    const metrics: UserMetrics = {
      age: 28,
      sex: "female",
      heightCm: 165,
      weightKg: 62,
      activityLevel: "lightly_active",
      goal: "lose_fat",
    };
    const result = calculateTDEE(metrics);

    // BMR should be ~1300-1400 for this profile
    expect(result.bmr).toBeGreaterThan(1200);
    expect(result.bmr).toBeLessThan(1500);

    // TDEE with light activity should be ~1800-2000
    expect(result.tdee).toBeGreaterThan(1700);
    expect(result.tdee).toBeLessThan(2100);

    // With 20% deficit, target should be ~1450-1650
    expect(result.targetCalories).toBeGreaterThan(1350);
    expect(result.targetCalories).toBeLessThan(1700);

    // Protein should be reasonable (1.6-2.2 g/kg for fat loss)
    expect(result.targetProtein).toBeGreaterThanOrEqual(62 * 1.6);
    expect(result.targetProtein).toBeLessThanOrEqual(62 * 2.2);
  });

  it("returns integer values for all results", () => {
    const result = calculateTDEE(baseMetrics);
    expect(Number.isInteger(result.bmr)).toBe(true);
    expect(Number.isInteger(result.tdee)).toBe(true);
    expect(Number.isInteger(result.targetCalories)).toBe(true);
    expect(Number.isInteger(result.targetProtein)).toBe(true);
    expect(Number.isInteger(result.targetCarbs)).toBe(true);
    expect(Number.isInteger(result.targetFat)).toBe(true);
  });
});

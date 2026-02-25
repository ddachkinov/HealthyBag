"use client";

import { create } from "zustand";
import type {
  Sex,
  ActivityLevel,
  Goal,
  UserMetrics,
  TDEEResult,
} from "@/lib/nutrition/tdee";
import { calculateTDEE } from "@/lib/nutrition/tdee";

export type DietType = "omnivore" | "vegetarian" | "vegan" | "pescatarian";
export type CookingSkill = "beginner" | "intermediate" | "advanced";

export interface OnboardingData {
  // Step 1: Body metrics
  age: number | null;
  sex: Sex | null;
  heightCm: number | null;
  weightKg: number | null;
  bodyFatPct: number | null;

  // Step 2: Goal
  goal: Goal | null;

  // Step 3: Activity level
  activityLevel: ActivityLevel | null;

  // Step 4: Dietary preferences
  dietType: DietType;
  allergies: string[];
  excludedFoods: string[];

  // Step 5: Cooking preferences
  cookingSkill: CookingSkill;
  maxPrepTimeMin: number;
  mealsPerDay: number;
  householdSize: number;
  weeklyBudgetBgn: number | null;
}

interface OnboardingStore extends OnboardingData {
  currentStep: number;
  totalSteps: number;
  tdeeResult: TDEEResult | null;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof OnboardingData>(
    key: K,
    value: OnboardingData[K]
  ) => void;
  toggleAllergy: (allergy: string) => void;
  computeTDEE: () => TDEEResult | null;
  reset: () => void;
}

const initialData: OnboardingData = {
  age: null,
  sex: null,
  heightCm: null,
  weightKg: null,
  bodyFatPct: null,
  goal: null,
  activityLevel: null,
  dietType: "omnivore",
  allergies: [],
  excludedFoods: [],
  cookingSkill: "intermediate",
  maxPrepTimeMin: 45,
  mealsPerDay: 3,
  householdSize: 1,
  weeklyBudgetBgn: null,
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  ...initialData,
  currentStep: 1,
  totalSteps: 5,
  tdeeResult: null,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () =>
    set((s) => ({ currentStep: Math.min(s.currentStep + 1, s.totalSteps) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

  updateField: (key, value) => set({ [key]: value }),

  toggleAllergy: (allergy) =>
    set((s) => ({
      allergies: s.allergies.includes(allergy)
        ? s.allergies.filter((a) => a !== allergy)
        : [...s.allergies, allergy],
    })),

  computeTDEE: () => {
    const s = get();
    if (!s.age || !s.sex || !s.heightCm || !s.weightKg || !s.activityLevel || !s.goal)
      return null;

    const metrics: UserMetrics = {
      age: s.age,
      sex: s.sex,
      heightCm: s.heightCm,
      weightKg: s.weightKg,
      bodyFatPct: s.bodyFatPct ?? undefined,
      activityLevel: s.activityLevel,
      goal: s.goal,
    };

    const result = calculateTDEE(metrics);
    set({ tdeeResult: result });
    return result;
  },

  reset: () => set({ ...initialData, currentStep: 1, tdeeResult: null }),
}));

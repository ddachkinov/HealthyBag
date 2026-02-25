"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";
import { cn } from "@/lib/utils";
import type { ActivityLevel } from "@/lib/nutrition/tdee";

const LEVELS: {
  value: ActivityLevel;
  icon: string;
  label: string;
  labelBg: string;
  desc: string;
}[] = [
  {
    value: "sedentary",
    icon: "🪑",
    label: "Sedentary",
    labelBg: "Заседнал",
    desc: "Desk job, little to no exercise",
  },
  {
    value: "lightly_active",
    icon: "🚶",
    label: "Lightly Active",
    labelBg: "Леко активен",
    desc: "Light exercise 1-3 days/week",
  },
  {
    value: "moderately_active",
    icon: "🏃",
    label: "Moderately Active",
    labelBg: "Умерено активен",
    desc: "Moderate exercise 3-5 days/week",
  },
  {
    value: "very_active",
    icon: "🏋️",
    label: "Very Active",
    labelBg: "Много активен",
    desc: "Hard exercise 6-7 days/week",
  },
  {
    value: "athlete",
    icon: "🏆",
    label: "Athlete",
    labelBg: "Атлет",
    desc: "Professional / competitive training",
  },
];

export default function StepActivity() {
  const { activityLevel, updateField } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-gray-800">
          Колко си активен?
        </h2>
        <p className="text-gray-500 mt-1">
          This determines your calorie multiplier
        </p>
      </div>

      <div className="space-y-3">
        {LEVELS.map((l) => (
          <button
            key={l.value}
            onClick={() => updateField("activityLevel", l.value)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200",
              activityLevel === l.value
                ? "border-primary-500 bg-primary-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{l.icon}</span>
              <div>
                <div className="font-heading font-bold text-gray-800">
                  {l.labelBg}
                  <span className="text-gray-400 font-normal text-sm ml-2">
                    {l.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{l.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

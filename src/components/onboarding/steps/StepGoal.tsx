"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";
import { cn } from "@/lib/utils";
import type { Goal } from "@/lib/nutrition/tdee";

const GOALS: { value: Goal; icon: string; label: string; labelBg: string; desc: string }[] = [
  {
    value: "lose_fat",
    icon: "🔥",
    label: "Lose Fat",
    labelBg: "Отслабване",
    desc: "20% calorie deficit — steady, sustainable fat loss",
  },
  {
    value: "lose_fat_aggressive",
    icon: "⚡",
    label: "Aggressive Fat Loss",
    labelBg: "Бързо отслабване",
    desc: "25% deficit — faster results, requires discipline",
  },
  {
    value: "maintain",
    icon: "⚖️",
    label: "Maintain Weight",
    labelBg: "Поддържане",
    desc: "Eat at maintenance — stay where you are",
  },
  {
    value: "lean_gain",
    icon: "💪",
    label: "Lean Gain",
    labelBg: "Чисто покачване",
    desc: "+200 kcal surplus — build muscle with minimal fat",
  },
  {
    value: "muscle_gain",
    icon: "🏋️",
    label: "Muscle Gain",
    labelBg: "Мускулна маса",
    desc: "+400 kcal surplus — maximize muscle growth",
  },
];

export default function StepGoal() {
  const { goal, updateField } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-gray-800">
          Каква е целта ти?
        </h2>
        <p className="text-gray-500 mt-1">What&apos;s your primary goal?</p>
      </div>

      <div className="space-y-3">
        {GOALS.map((g) => (
          <button
            key={g.value}
            onClick={() => updateField("goal", g.value)}
            className={cn(
              "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200",
              goal === g.value
                ? "border-primary-500 bg-primary-50 shadow-md"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{g.icon}</span>
              <div>
                <div className="font-heading font-bold text-gray-800">
                  {g.labelBg}
                  <span className="text-gray-400 font-normal text-sm ml-2">
                    {g.label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{g.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

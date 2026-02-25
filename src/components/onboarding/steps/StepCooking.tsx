"use client";

import { useOnboardingStore, type CookingSkill } from "@/lib/store/onboarding";
import { cn } from "@/lib/utils";

const SKILLS: { value: CookingSkill; icon: string; label: string; labelBg: string }[] = [
  { value: "beginner", icon: "🍳", label: "Beginner", labelBg: "Начинаещ" },
  { value: "intermediate", icon: "👨‍🍳", label: "Intermediate", labelBg: "Средно ниво" },
  { value: "advanced", icon: "⭐", label: "Advanced", labelBg: "Напреднал" },
];

export default function StepCooking() {
  const {
    cookingSkill,
    maxPrepTimeMin,
    mealsPerDay,
    householdSize,
    weeklyBudgetBgn,
    updateField,
  } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-gray-800">
          Как готвиш?
        </h2>
        <p className="text-gray-500 mt-1">Cooking style &amp; household</p>
      </div>

      {/* Cooking Skill */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Кулинарно ниво / Cooking Skill
        </label>
        <div className="grid grid-cols-3 gap-3">
          {SKILLS.map((s) => (
            <button
              key={s.value}
              onClick={() => updateField("cookingSkill", s.value)}
              className={cn(
                "py-3 px-3 rounded-xl border-2 text-center transition-all duration-200",
                cookingSkill === s.value
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xs font-medium">{s.labelBg}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Max prep time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Макс. време за готвене / Max Prep Time:{" "}
          <span className="text-primary-600 font-bold">{maxPrepTimeMin} мин</span>
        </label>
        <input
          type="range"
          min={10}
          max={90}
          step={5}
          value={maxPrepTimeMin}
          onChange={(e) => updateField("maxPrepTimeMin", Number(e.target.value))}
          className="w-full accent-primary-500"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>10 мин</span>
          <span>90 мин</span>
        </div>
      </div>

      {/* Meals per day */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Хранения на ден / Meals per day
        </label>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => updateField("mealsPerDay", n)}
              className={cn(
                "w-12 h-12 rounded-xl border-2 font-bold transition-all duration-200",
                mealsPerDay === n
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Household size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Хора в домакинството / Household size
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => updateField("householdSize", n)}
              className={cn(
                "w-12 h-12 rounded-xl border-2 font-bold transition-all duration-200",
                householdSize === n
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Седмичен бюджет / Weekly Budget (лв, optional)
        </label>
        <input
          type="number"
          min={20}
          max={500}
          value={weeklyBudgetBgn ?? ""}
          onChange={(e) =>
            updateField(
              "weeklyBudgetBgn",
              e.target.value ? Number(e.target.value) : null
            )
          }
          placeholder="e.g. 80"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg transition-colors"
        />
      </div>
    </div>
  );
}

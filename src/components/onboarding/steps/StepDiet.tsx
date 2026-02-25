"use client";

import { useOnboardingStore, type DietType } from "@/lib/store/onboarding";
import { cn } from "@/lib/utils";

const DIET_TYPES: { value: DietType; icon: string; label: string; labelBg: string }[] = [
  { value: "omnivore", icon: "🥩", label: "Omnivore", labelBg: "Всеядно" },
  { value: "pescatarian", icon: "🐟", label: "Pescatarian", labelBg: "Пескатарианство" },
  { value: "vegetarian", icon: "🥚", label: "Vegetarian", labelBg: "Вегетарианство" },
  { value: "vegan", icon: "🌱", label: "Vegan", labelBg: "Веганство" },
];

const COMMON_ALLERGIES = [
  "Gluten / Глутен",
  "Lactose / Лактоза",
  "Nuts / Ядки",
  "Eggs / Яйца",
  "Soy / Соя",
  "Shellfish / Морски дарове",
  "Fish / Риба",
];

export default function StepDiet() {
  const { dietType, allergies, updateField, toggleAllergy } =
    useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-gray-800">
          Хранителни предпочитания
        </h2>
        <p className="text-gray-500 mt-1">Dietary preferences &amp; allergies</p>
      </div>

      {/* Diet type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Тип диета / Diet type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {DIET_TYPES.map((d) => (
            <button
              key={d.value}
              onClick={() => updateField("dietType", d.value)}
              className={cn(
                "py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 text-left",
                dietType === d.value
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              <span className="text-xl mr-2">{d.icon}</span>
              <span className="text-sm">{d.labelBg}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Алергии / Allergies
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_ALLERGIES.map((a) => (
            <button
              key={a}
              onClick={() => toggleAllergy(a)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                allergies.includes(a)
                  ? "bg-red-100 border-red-300 text-red-700"
                  : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200"
              )}
            >
              {allergies.includes(a) ? "✕ " : ""}{a}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Select any that apply — these ingredients will be excluded from your plans
        </p>
      </div>
    </div>
  );
}

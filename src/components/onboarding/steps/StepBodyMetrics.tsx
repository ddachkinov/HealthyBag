"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";
import { cn } from "@/lib/utils";
import type { Sex } from "@/lib/nutrition/tdee";

export default function StepBodyMetrics() {
  const { age, sex, heightCm, weightKg, bodyFatPct, updateField } =
    useOnboardingStore();

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold text-gray-800">
          Разкажи ни за себе си
        </h2>
        <p className="text-gray-500 mt-1">
          Tell us about your body to calculate your needs
        </p>
      </div>

      {/* Sex selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Пол / Sex
        </label>
        <div className="grid grid-cols-2 gap-3">
          {(["male", "female"] as Sex[]).map((s) => (
            <button
              key={s}
              onClick={() => updateField("sex", s)}
              className={cn(
                "py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200",
                sex === s
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
              )}
            >
              {s === "male" ? "👨 Мъж / Male" : "👩 Жена / Female"}
            </button>
          ))}
        </div>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Възраст / Age
        </label>
        <input
          type="number"
          min={14}
          max={100}
          value={age ?? ""}
          onChange={(e) =>
            updateField("age", e.target.value ? Number(e.target.value) : null)
          }
          placeholder="e.g. 30"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg transition-colors"
        />
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Височина / Height (cm)
        </label>
        <input
          type="number"
          min={100}
          max={250}
          value={heightCm ?? ""}
          onChange={(e) =>
            updateField(
              "heightCm",
              e.target.value ? Number(e.target.value) : null
            )
          }
          placeholder="e.g. 175"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg transition-colors"
        />
      </div>

      {/* Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Тегло / Weight (kg)
        </label>
        <input
          type="number"
          min={30}
          max={300}
          value={weightKg ?? ""}
          onChange={(e) =>
            updateField(
              "weightKg",
              e.target.value ? Number(e.target.value) : null
            )
          }
          placeholder="e.g. 75"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg transition-colors"
        />
      </div>

      {/* Body Fat (optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Телесна мазнина / Body Fat % (optional)
        </label>
        <input
          type="number"
          min={3}
          max={60}
          value={bodyFatPct ?? ""}
          onChange={(e) =>
            updateField(
              "bodyFatPct",
              e.target.value ? Number(e.target.value) : null
            )
          }
          placeholder="e.g. 18"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-lg transition-colors"
        />
        <p className="text-xs text-gray-400 mt-1">
          Improves accuracy using the Katch-McArdle formula
        </p>
      </div>
    </div>
  );
}

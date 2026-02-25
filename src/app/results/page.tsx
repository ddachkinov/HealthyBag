"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/store/onboarding";
import { getSuggestedGroceries } from "@/lib/grocery/suggestions";
import type { GrocerySuggestion, NutrientRole } from "@/lib/ebag/types";
import { cn } from "@/lib/utils";

const ROLE_CONFIG: Record<
  NutrientRole,
  { label: string; labelBg: string; icon: string; color: string }
> = {
  protein: {
    label: "Protein",
    labelBg: "Протеини",
    icon: "🥩",
    color: "text-red-600",
  },
  carbs: {
    label: "Carbs",
    labelBg: "Въглехидрати",
    icon: "🌾",
    color: "text-amber-600",
  },
  fat: {
    label: "Healthy Fats",
    labelBg: "Здравословни мазнини",
    icon: "🥑",
    color: "text-green-600",
  },
  fiber: {
    label: "Fiber",
    labelBg: "Фибри",
    icon: "🥦",
    color: "text-emerald-600",
  },
  mixed: {
    label: "Balanced",
    labelBg: "Балансирани",
    icon: "🍎",
    color: "text-blue-600",
  },
};

const ROLE_ORDER: NutrientRole[] = ["protein", "carbs", "fat", "fiber", "mixed"];

export default function ResultsPage() {
  const router = useRouter();
  const { tdeeResult, dietType, allergies, weeklyBudgetBgn } =
    useOnboardingStore();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!tdeeResult) {
      router.replace("/onboarding");
    }
  }, [tdeeResult, router]);

  const suggestions = useMemo(() => {
    if (!tdeeResult) return [];
    return getSuggestedGroceries({
      dietType,
      allergies,
      tdee: tdeeResult,
      weeklyBudgetBgn,
    });
  }, [tdeeResult, dietType, allergies, weeklyBudgetBgn]);

  const grouped = useMemo(() => {
    const map = new Map<NutrientRole, GrocerySuggestion[]>();
    for (const s of suggestions) {
      const list = map.get(s.nutrientRole) ?? [];
      list.push(s);
      map.set(s.nutrientRole, list);
    }
    return map;
  }, [suggestions]);

  const totalSavings = useMemo(
    () =>
      suggestions.reduce((sum, s) => sum + (s.savingsAmount ?? 0), 0),
    [suggestions]
  );

  const checkedTotal = useMemo(() => {
    let cost = 0;
    let savings = 0;
    for (const s of suggestions) {
      if (checkedItems.has(s.product.ebagId)) {
        cost += s.product.price;
        savings += s.savingsAmount ?? 0;
      }
    }
    return { cost: Math.round(cost * 100) / 100, savings: Math.round(savings * 100) / 100 };
  }, [suggestions, checkedItems]);

  function toggleItem(ebagId: string) {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(ebagId)) next.delete(ebagId);
      else next.add(ebagId);
      return next;
    });
  }

  if (!tdeeResult) return null;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="pt-6 pb-4 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="font-heading text-2xl font-extrabold">
            <span className="text-primary-500">Healthy</span>
            <span className="text-secondary-500">Bag</span>
          </h1>
          <button
            onClick={() => router.push("/onboarding")}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Change preferences
          </button>
        </div>
      </header>

      {/* TDEE Summary */}
      <section className="px-6 pb-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-heading font-bold text-gray-800 mb-3">
            Твоят дневен план
            <span className="text-gray-400 font-normal text-sm ml-2">
              Your daily targets
            </span>
          </h2>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-2xl font-heading font-extrabold text-primary-600">
                {tdeeResult.targetCalories}
              </div>
              <div className="text-xs text-gray-500">kcal</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-extrabold text-red-500">
                {tdeeResult.targetProtein}g
              </div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-extrabold text-amber-500">
                {tdeeResult.targetCarbs}g
              </div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-extrabold text-green-500">
                {tdeeResult.targetFat}g
              </div>
              <div className="text-xs text-gray-500">Fat</div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings banner */}
      {totalSavings > 0 && (
        <section className="px-6 pb-4">
          <div className="max-w-2xl mx-auto bg-secondary-50 border border-secondary-200 rounded-xl px-5 py-3 flex items-center justify-between">
            <div>
              <span className="font-heading font-bold text-secondary-700">
                Up to {totalSavings.toFixed(2)} лв savings
              </span>
              <span className="text-secondary-500 text-sm ml-2">
                on discounted items below
              </span>
            </div>
            <span className="text-2xl">💰</span>
          </div>
        </section>
      )}

      {/* Grocery list */}
      <main className="flex-1 px-6 pb-32">
        <div className="max-w-2xl mx-auto space-y-6">
          {ROLE_ORDER.filter((role) => grouped.has(role)).map((role) => {
            const config = ROLE_CONFIG[role];
            const items = grouped.get(role)!;

            return (
              <section key={role}>
                <h3 className="font-heading font-bold text-lg mb-3 flex items-center gap-2">
                  <span>{config.icon}</span>
                  <span className={config.color}>{config.labelBg}</span>
                  <span className="text-gray-400 font-normal text-sm">
                    {config.label}
                  </span>
                </h3>

                <div className="space-y-2">
                  {items.map((s) => (
                    <GroceryCard
                      key={s.product.ebagId}
                      suggestion={s}
                      checked={checkedItems.has(s.product.ebagId)}
                      onToggle={() => toggleItem(s.product.ebagId)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>

      {/* Sticky bottom bar */}
      {checkedItems.size > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div>
              <span className="font-heading font-bold text-gray-800">
                {checkedItems.size} items
              </span>
              <span className="text-gray-500 ml-2">
                {checkedTotal.cost.toFixed(2)} лв
              </span>
              {checkedTotal.savings > 0 && (
                <span className="text-secondary-600 font-bold ml-2">
                  (save {checkedTotal.savings.toFixed(2)} лв)
                </span>
              )}
            </div>
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-heading font-bold px-6 py-2.5 rounded-xl transition-colors">
              Shopping list
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GroceryCard({
  suggestion,
  checked,
  onToggle,
}: {
  suggestion: GrocerySuggestion;
  checked: boolean;
  onToggle: () => void;
}) {
  const { product } = suggestion;

  return (
    <button
      onClick={onToggle}
      className={cn(
        "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-3",
        checked
          ? "border-primary-500 bg-primary-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      )}
    >
      {/* Checkbox */}
      <div
        className={cn(
          "w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-colors",
          checked
            ? "bg-primary-500 border-primary-500"
            : "border-gray-300"
        )}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {/* Product info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-gray-800 truncate">
            {product.nameBg}
          </span>
          {product.discountPct && product.discountPct > 0 && (
            <span className="bg-secondary-100 text-secondary-700 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
              -{product.discountPct}%
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 truncate">{product.name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{suggestion.reason}</div>
      </div>

      {/* Price + nutrition */}
      <div className="text-right flex-shrink-0">
        <div className="font-heading font-bold text-primary-600">
          {product.price.toFixed(2)} лв
        </div>
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="text-xs text-gray-400 line-through">
            {product.originalPrice.toFixed(2)} лв
          </div>
        )}
        <div className="text-xs text-gray-400 mt-0.5">
          {suggestion.servingCalories} kcal / serving
        </div>
      </div>
    </button>
  );
}

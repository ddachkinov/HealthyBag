"use client";

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ["Тяло", "Цел", "Активност", "Диета", "Готвене"];

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;
        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                isActive && "bg-primary-500 text-white scale-110 shadow-md",
                isCompleted && "bg-primary-300 text-white",
                !isActive && !isCompleted && "bg-gray-200 text-gray-400"
              )}
            >
              {isCompleted ? "✓" : step}
            </div>
            {step < totalSteps && (
              <div
                className={cn(
                  "w-8 h-0.5 transition-colors duration-300",
                  isCompleted ? "bg-primary-300" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

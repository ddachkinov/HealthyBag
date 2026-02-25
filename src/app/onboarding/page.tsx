"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/store/onboarding";
import StepIndicator from "@/components/onboarding/StepIndicator";
import StepBody from "@/components/onboarding/StepBody";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentStep, totalSteps, nextStep, prevStep, computeTDEE } =
    useOnboardingStore();

  const canProceed = useCanProceed();

  function handleNext() {
    if (currentStep === totalSteps) {
      const result = computeTDEE();
      if (result) {
        router.push("/results");
      }
    } else {
      nextStep();
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="pt-8 pb-4 px-6 text-center">
        <h1 className="font-heading text-2xl font-extrabold">
          <span className="text-primary-500">Healthy</span>
          <span className="text-secondary-500">Bag</span>
        </h1>
      </header>

      {/* Progress */}
      <div className="px-6">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      {/* Step content */}
      <main className="flex-1 px-6 pb-6 max-w-lg mx-auto w-full overflow-y-auto">
        <StepBody />
      </main>

      {/* Navigation buttons */}
      <div className="sticky bottom-0 bg-cream border-t border-gray-200 px-6 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-600 font-heading font-bold hover:bg-gray-100 transition-colors"
            >
              ← Назад
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-heading font-bold hover:bg-primary-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {currentStep === totalSteps ? "Покажи ми плана! 🎉" : "Напред →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function useCanProceed(): boolean {
  const { currentStep, age, sex, heightCm, weightKg, goal, activityLevel } =
    useOnboardingStore();

  switch (currentStep) {
    case 1:
      return age !== null && sex !== null && heightCm !== null && weightKg !== null;
    case 2:
      return goal !== null;
    case 3:
      return activityLevel !== null;
    case 4:
      return true; // diet preferences have defaults
    case 5:
      return true; // cooking preferences have defaults
    default:
      return false;
  }
}

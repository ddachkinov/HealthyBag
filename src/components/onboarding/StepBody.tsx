"use client";

import { useOnboardingStore } from "@/lib/store/onboarding";
import StepBodyMetrics from "./steps/StepBodyMetrics";
import StepGoal from "./steps/StepGoal";
import StepActivity from "./steps/StepActivity";
import StepDiet from "./steps/StepDiet";
import StepCooking from "./steps/StepCooking";

export default function StepBody() {
  const currentStep = useOnboardingStore((s) => s.currentStep);

  switch (currentStep) {
    case 1:
      return <StepBodyMetrics />;
    case 2:
      return <StepGoal />;
    case 3:
      return <StepActivity />;
    case 4:
      return <StepDiet />;
    case 5:
      return <StepCooking />;
    default:
      return null;
  }
}

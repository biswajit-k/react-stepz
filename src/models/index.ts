import React from 'react';

export interface ProgressStep {
  label: string;
  validator?: (payload?: any) => boolean;
}

export interface StepProgressContextProps {
  steps?: ProgressStep[];
  currentStep: number;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface UseStepProgressOptions {
  steps: ProgressStep[];
  startingStep?: number;
}

export interface UseStepProgressReturn {
  stepForward(): void;
  stepBackwards(): void;
  setStep(step: number): void;
  currentIndex: number;
  getProps: StepProgressProps;
}

export interface StepProgressProps {
  steps: ProgressStep[];
  currentStep: number;
  isError: boolean;
}

export interface StepProgressBarProps {
  className?: string;
  progressClass?: string;
  stepClass?: string;
  steps: ProgressStep[];
}

export interface StepProps {
  step: number;
}

export interface ReducerAction {
  type: string;
  payload: { index: number; state: StepStates; steps?: ProgressStep[] };
}

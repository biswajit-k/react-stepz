import React, { createContext, useEffect, useState } from 'react';
import { StepProgressContextProps, UseStepProgressOptions } from '../models';

export const StepProgressContext: React.Context<StepProgressContextProps> = createContext<
  StepProgressContextProps
>({} as StepProgressContextProps);

export const StepProgress: React.FC = ({ children }): React.ReactElement => {
  const [isError, setIsError] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <StepProgressContext.Provider
      value={{
        isError,
        setIsError,
        currentStep,
        setCurrentStep
      }}
    >
      {children}
    </StepProgressContext.Provider>
  );
};

export const withStepProgress = (Component: React.FC) => (): React.ReactElement => (
  <StepProgress>
    <Component />
  </StepProgress>
);

export const useStepProgress = ({ steps, startingStep }: UseStepProgressOptions) => {
  const context = React.useContext(StepProgressContext);
  if (context === undefined) {
    throw new Error('useStepProgress must be used within a StepProgress');
  }

  const { setCurrentStep, currentStep, setIsError } = context;

  useEffect(() => {
    setCurrentStep(startingStep || 0);
  }, [startingStep]);

  const stepForward = () => {
    if (currentStep === steps.length - 1) return;

    const stepValidator = steps[currentStep].validator;

    if (stepValidator && !stepValidator()) {
      setIsError(true);
    } else {
      setCurrentStep((old) => old + 1);
      setIsError(false);
    }
  };

  const stepBackwards = () => {
    if (currentStep === 0) return;
    setCurrentStep((old) => old - 1);
    setIsError(false);
  };
  //
  const setStep = (step: number) => {
    setCurrentStep(step);
  };

  return {
    stepForward,
    stepBackwards,
    currentStep,
    setStep
  };
};

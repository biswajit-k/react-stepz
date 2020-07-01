export enum StepStates {
  NOT_STARTED = 'not_started',
  CURRENT = 'current',
  ERROR = 'error',
  COMPLETED = 'completed'
}

export interface ProgressStep {
  label: string;
  name: string;
  state?: StepStates;
  content: React.ReactNode;
  validator?: (payload?: any) => boolean;
}

export interface StepProgressProps {
  steps: ProgressStep[];
  startingStep: number;
  wrapperClass?: string;
  progressClass?: string;
  stepClass?: string;
  contentClass?: string;
}

export interface StepProgressReturn {
  stepForward(): void;
  stepBackwards(): void;
  getBarProps: StepProgressBarProps;
}

export interface StepProgressBarProps {
  state: ProgressStep[];
  currentIndex: number;
  wrapperClass?: string;
  progressClass?: string;
  stepClass?: string;
  contentClass?: string;
}

export interface ReducerAction {
  type: string;
  payload: { index: number; state: StepStates };
}

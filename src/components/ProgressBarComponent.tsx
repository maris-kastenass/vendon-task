import React from 'react';

interface ProgressBarProps {
  progress: number;
  min: number;
  max: number;
}

/**
 * Calculates progress percentage based on current progress and max.
 */
const calculateProgressPercentage = (progress: number, max: number): number => {
  if (max === 0) return 0;
  return (progress / max) * 100;
};

const ProgressBarComponent: React.FC<ProgressBarProps> = ({ progress, min, max }) => {
  const progressProc = calculateProgressPercentage(progress, max);

  return (
    <div className="progress mt-3 m-auto">
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{ width: `${progressProc}%` }}
        aria-valuenow={progress}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        {progress}/{max}
      </div>
    </div>
  );
};

export default ProgressBarComponent;

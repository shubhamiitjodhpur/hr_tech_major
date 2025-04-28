import React from 'react';

interface MatchPercentageIndicatorProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const MatchPercentageIndicator: React.FC<MatchPercentageIndicatorProps> = ({
  percentage,
  size = 'md',
  showLabel = true
}) => {
  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Determine size class
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'text-sm';
      case 'lg': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <div className="flex items-center">
      <span className={`font-semibold ${getColor()} ${getSizeClass()}`}>
        {percentage}%
      </span>
      {showLabel && (
        <span className="ml-2 text-gray-500 text-sm">match</span>
      )}
    </div>
  );
};
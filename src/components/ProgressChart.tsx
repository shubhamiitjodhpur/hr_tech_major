import React from 'react';

interface ProgressChartProps {
  value: number;
  total: number;
  label: string;
  color?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  value,
  total,
  label,
  color = 'blue'
}) => {
  const percentage = Math.round((value / total) * 100) || 0;
  
  const colorMap: Record<string, string> = {
    blue: 'text-blue-500 bg-blue-100',
    green: 'text-green-500 bg-green-100',
    yellow: 'text-yellow-500 bg-yellow-100',
    red: 'text-red-500 bg-red-100',
    purple: 'text-purple-500 bg-purple-100',
    teal: 'text-teal-500 bg-teal-100',
  };
  
  const bgColorClass = colorMap[color] || colorMap.blue;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24 mb-2">
        <svg className="h-24 w-24" viewBox="0 0 36 36">
          <path
            className="stroke-current text-gray-200"
            fill="none"
            strokeWidth="3"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`stroke-current ${bgColorClass.split(' ')[0]}`}
            fill="none"
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeLinecap="round"
          />
          <text
            x="18"
            y="20.5"
            className="fill-current text-gray-700 font-semibold text-[6px]"
            textAnchor="middle"
          >
            {percentage}%
          </text>
        </svg>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-gray-900">{value} / {total}</div>
        <div className="text-xs text-gray-500">{label}</div>
      </div>
    </div>
  );
};
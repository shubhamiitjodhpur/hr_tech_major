import React from 'react';
import { SkillGap } from '../types';

interface SkillGapIndicatorProps {
  skillGap: SkillGap;
}

export const SkillGapIndicator: React.FC<SkillGapIndicatorProps> = ({ skillGap }) => {
  const { skillName, currentLevel, requiredLevel } = skillGap;
  const maxLevel = 5;
  
  const renderSkillLevel = (level: number, isRequired: boolean = false) => {
    return Array.from({ length: maxLevel }).map((_, index) => (
      <div 
        key={`${isRequired ? 'req' : 'curr'}-${index}`}
        className={`h-2 w-4 rounded-sm mr-1 ${
          index < level 
            ? (isRequired ? 'bg-blue-500' : 'bg-green-500') 
            : 'bg-gray-200'
        }`}
      />
    ));
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{skillName}</span>
        <span className="text-xs text-gray-500">
          Current: {currentLevel} / Required: {requiredLevel}
        </span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex">
          {renderSkillLevel(currentLevel)}
        </div>
        <div className="flex">
          {renderSkillLevel(requiredLevel, true)}
        </div>
      </div>
    </div>
  );
};
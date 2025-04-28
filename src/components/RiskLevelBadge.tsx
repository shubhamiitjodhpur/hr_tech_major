import React from 'react';
import { Badge } from './ui/Badge';

interface RiskLevelBadgeProps {
  riskLevel: number;
  size?: 'sm' | 'md' | 'lg';
}

export const RiskLevelBadge: React.FC<RiskLevelBadgeProps> = ({ 
  riskLevel, 
  size = 'md' 
}) => {
  let variant: 'success' | 'warning' | 'danger';
  let label: string;
  
  if (riskLevel < 40) {
    variant = 'success';
    label = 'Low Risk';
  } else if (riskLevel < 70) {
    variant = 'warning';
    label = 'Medium Risk';
  } else {
    variant = 'danger';
    label = 'High Risk';
  }
  
  return (
    <Badge variant={variant} size={size}>
      {label}
    </Badge>
  );
};
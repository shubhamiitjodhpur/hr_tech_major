import React from 'react';
import { Card, CardBody } from './ui/Card';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = ''
}) => {
  return (
    <Card className={className}>
      <CardBody>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">{title}</p>
            <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {trend.isPositive ? '↑' : '↓'} {trend.value}%
                </span>
                <span className="text-xs text-gray-500 ml-1">{trend.label}</span>
              </div>
            )}
          </div>
          
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            {icon}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
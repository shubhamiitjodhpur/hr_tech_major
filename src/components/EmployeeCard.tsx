import React from 'react';
import { Employee } from '../types';
import { Card, CardBody } from './ui/Card';
import { RiskLevelBadge } from './RiskLevelBadge';
import { useData } from '../context/DataContext';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  const { getEmployeeMatches } = useData();
  const matches = getEmployeeMatches(employee.id);
  
  return (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardBody>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {employee.avatar ? (
              <img 
                src={employee.avatar} 
                alt={employee.name} 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-medium">
                  {employee.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">{employee.name}</h3>
            <p className="text-sm text-gray-500 truncate">{employee.position}</p>
            <p className="text-xs text-gray-400">{employee.department}</p>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <RiskLevelBadge riskLevel={employee.riskLevel} />
            <div className="text-xs text-gray-500">
              {matches.length} possible matches
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
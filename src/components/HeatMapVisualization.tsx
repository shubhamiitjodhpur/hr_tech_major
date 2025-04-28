import React from 'react';
import { Employee } from '../types';

interface HeatMapVisualizationProps {
  employees: Employee[];
  onEmployeeClick?: (employee: Employee) => void;
}

export const HeatMapVisualization: React.FC<HeatMapVisualizationProps> = ({
  employees,
  onEmployeeClick
}) => {
  // Group employees by department
  const departmentGroups = employees.reduce<Record<string, Employee[]>>((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = [];
    }
    acc[employee.department].push(employee);
    return acc;
  }, {});

  // Get risk color
  const getRiskColor = (riskLevel: number) => {
    if (riskLevel >= 80) return 'bg-red-500';
    if (riskLevel >= 60) return 'bg-orange-400';
    if (riskLevel >= 40) return 'bg-yellow-300';
    return 'bg-green-400';
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        {Object.entries(departmentGroups).map(([department, deptEmployees]) => (
          <div key={department} className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">{department}</h3>
            <div className="flex flex-wrap gap-2">
              {deptEmployees.map(employee => (
                <div
                  key={employee.id}
                  className={`
                    flex items-center justify-center
                    w-16 h-16 rounded-md cursor-pointer
                    ${getRiskColor(employee.riskLevel)}
                    transition-transform transform hover:scale-105
                    shadow-sm
                  `}
                  onClick={() => onEmployeeClick?.(employee)}
                  title={`${employee.name} (Risk: ${employee.riskLevel}%)`}
                >
                  {employee.avatar ? (
                    <div className="relative w-full h-full">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="w-full h-full object-cover rounded-md"
                        style={{ filter: 'grayscale(30%)' }}
                      />
                      <div className={`absolute inset-0 ${getRiskColor(employee.riskLevel)} opacity-50 rounded-md`}></div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-40 text-white text-xs p-1 truncate rounded-b-md">
                        {employee.name.split(' ')[0]}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm font-medium text-white">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
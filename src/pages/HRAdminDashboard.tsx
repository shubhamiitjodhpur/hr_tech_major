import React, { useState } from 'react';
import { Users, Briefcase, TrendingUp, Award } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { MetricsCard } from '../components/MetricsCard';
import { ProgressChart } from '../components/ProgressChart';
import { HeatMapVisualization } from '../components/HeatMapVisualization';
import { EmployeeCard } from '../components/EmployeeCard';
import { Employee } from '../types';

export const HRAdminDashboard: React.FC = () => {
  const { employees, metrics, jobPositions } = useData();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };
  
  const topRiskEmployees = [...employees]
    .sort((a, b) => b.riskLevel - a.riskLevel)
    .slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="At-Risk Employees"
          value={metrics.totalAtRisk}
          icon={<Users size={24} />}
          trend={{ value: 12, label: "vs last month", isPositive: false }}
        />
        <MetricsCard
          title="Open Positions"
          value={jobPositions.length}
          icon={<Briefcase size={24} />}
          trend={{ value: 5, label: "vs last month", isPositive: true }}
        />
        <MetricsCard
          title="Cost Savings"
          value={formatCurrency(metrics.costSavings)}
          icon={<TrendingUp size={24} />}
          trend={{ value: 22, label: "vs last month", isPositive: true }}
        />
        <MetricsCard
          title="Satisfaction Rate"
          value={formatPercentage(metrics.satisfactionRate)}
          icon={<Award size={24} />}
          trend={{ value: 5, label: "vs last month", isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Talent Risk Map</h2>
              <span className="text-sm text-gray-500">
                {metrics.totalAtRisk} employees at risk
              </span>
            </CardHeader>
            <CardBody>
              <HeatMapVisualization 
                employees={employees} 
                onEmployeeClick={setSelectedEmployee}
              />
              {selectedEmployee && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Employee</h3>
                  <EmployeeCard employee={selectedEmployee} />
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Redeployment Progress</h2>
            </CardHeader>
            <CardBody>
              <div className="flex justify-around mb-6">
                <ProgressChart
                  value={metrics.successfulRedeployments}
                  total={metrics.totalAtRisk}
                  label="Redeployed"
                  color="green"
                />
                <ProgressChart
                  value={metrics.inProgress}
                  total={metrics.totalAtRisk}
                  label="In Progress"
                  color="blue"
                />
                <ProgressChart
                  value={metrics.totalAtRisk - metrics.successfulRedeployments - metrics.inProgress}
                  total={metrics.totalAtRisk}
                  label="Not Started"
                  color="yellow"
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Top Risk Employees</h3>
                <div className="space-y-3">
                  {topRiskEmployees.map(employee => (
                    <EmployeeCard 
                      key={employee.id} 
                      employee={employee}
                      onClick={() => setSelectedEmployee(employee)}
                    />
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
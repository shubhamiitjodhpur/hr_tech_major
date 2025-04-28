import React from 'react';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { ProgressChart } from '../components/ProgressChart';
import { TrendingUp, Users, Clock, DollarSign } from 'lucide-react';

export const MetricsSection: React.FC = () => {
  const { metrics } = useData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Redeployment Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardBody>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.satisfactionRate}%</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Redeployed</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.successfulRedeployments}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="text-yellow-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Time</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.averageTimeToRedeploy} days</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cost Savings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.costSavings)}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Redeployment Progress</h3>
          </CardHeader>
          <CardBody>
            <div className="flex justify-around">
              <ProgressChart
                value={metrics.successfulRedeployments}
                total={metrics.totalAtRisk}
                label="Successful"
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
                label="Pending"
                color="yellow"
              />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
          </CardHeader>
          <CardBody>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Monthly trend visualization</p>
                <p className="text-sm text-gray-400">Coming soon</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
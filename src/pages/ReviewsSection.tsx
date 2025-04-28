import React from 'react';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { jobMatches, getEmployeeById, getJobById } = useData();

  const pendingReviews = jobMatches
    .filter(match => match.status === 'in-review')
    .map(match => ({
      match,
      employee: getEmployeeById(match.employeeId)!,
      job: getJobById(match.jobId)!
    }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Redeployment Requests</h2>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Pending Reviews</h3>
            <Badge variant="primary">{pendingReviews.length} requests</Badge>
          </div>
        </CardHeader>
        <CardBody>
          {pendingReviews.length > 0 ? (
            <div className="space-y-4">
              {pendingReviews.map(({ match, employee, job }) => (
                <div key={`${match.employeeId}-${match.jobId}`} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{employee.name}</h4>
                      <p className="text-sm text-gray-500">{employee.position} → {job.title}</p>
                    </div>
                    <Badge variant="warning" size="sm">
                      <Clock size={14} className="mr-1" />
                      Pending Review
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Skill Match: {match.matchPercentage}%</p>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-2 bg-blue-500 rounded-full" 
                        style={{ width: `${match.matchPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<XCircle size={16} />}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      leftIcon={<CheckCircle size={16} />}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No pending redeployment requests</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { EmployeeCard } from '../components/EmployeeCard';
import { SkillGapIndicator } from '../components/SkillGapIndicator';
import { MatchPercentageIndicator } from '../components/MatchPercentageIndicator';
import { Badge } from '../components/ui/Badge';
import { ChevronLeft, CheckCircle, XCircle, Users, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { Employee, JobPosition } from '../types';

export const ManagerDashboard: React.FC = () => {
  const { employees, jobPositions, getEmployeeMatches, getJobById, updateJobMatchStatus } = useData();
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'development'>('overview');
  
  // For demo, filter employees that have the manager ID of '2'
  const teamMembers = employees.filter(emp => emp.managerId === '2');
  
  const pendingApprovals = teamMembers.flatMap(employee => {
    const matches = getEmployeeMatches(employee.id);
    return matches
      .filter(match => match.status === 'in-review')
      .map(match => ({
        employee,
        job: getJobById(match.jobId)!,
        match
      }));
  });

  const teamMetrics = {
    totalMembers: teamMembers.length,
    atRisk: teamMembers.filter(emp => emp.riskLevel > 70).length,
    avgPerformance: 85,
    completedTrainings: 12
  };
  
  const handleApprove = (employeeId: string, jobId: string) => {
    updateJobMatchStatus(employeeId, jobId, 'approved');
    setSelectedEmployee(null);
    setSelectedJob(null);
  };
  
  const handleReject = (employeeId: string, jobId: string) => {
    updateJobMatchStatus(employeeId, jobId, 'rejected');
    setSelectedEmployee(null);
    setSelectedJob(null);
  };

  const renderTeamMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardBody>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Team Size</p>
              <p className="text-xl font-bold text-gray-900">{teamMetrics.totalMembers}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">At Risk</p>
              <p className="text-xl font-bold text-gray-900">{teamMetrics.atRisk}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Performance</p>
              <p className="text-xl font-bold text-gray-900">{teamMetrics.avgPerformance}%</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Award className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Trainings</p>
              <p className="text-xl font-bold text-gray-900">{teamMetrics.completedTrainings}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
  
  const renderDetailView = () => {
    if (!selectedEmployee || !selectedJob) return null;
    
    const matches = getEmployeeMatches(selectedEmployee.id);
    const match = matches.find(m => m.jobId === selectedJob.id);
    
    if (!match) return null;
    
    return (
      <Card className="w-full">
        <CardHeader className="border-b">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ChevronLeft size={16} />}
            onClick={() => {
              setSelectedEmployee(null);
              setSelectedJob(null);
            }}
            className="mb-2"
          >
            Back to team
          </Button>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h2>
              <p className="text-sm text-gray-500">
                {selectedEmployee.position} • {selectedEmployee.department}
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <Badge variant="primary">Redeployment Request</Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardBody>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">New Position</h3>
            <div className="flex flex-col md:flex-row justify-between md:items-center bg-gray-50 p-4 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">{selectedJob.title}</h4>
                <p className="text-sm text-gray-500">{selectedJob.department}</p>
                <p className="text-sm text-gray-700 mt-2">{selectedJob.description}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <MatchPercentageIndicator percentage={match.matchPercentage} size="lg" />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Skill Assessment</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {match.skillGaps.map(gap => (
                <SkillGapIndicator key={gap.skillId} skillGap={gap} />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Manager Feedback</h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Provide your feedback on this redeployment request..."
            ></textarea>
          </div>
        </CardBody>
        
        <CardFooter className="bg-gray-50 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            variant="outline"
            leftIcon={<XCircle size={16} />}
            onClick={() => handleReject(selectedEmployee.id, selectedJob.id)}
          >
            Reject Request
          </Button>
          <Button
            leftIcon={<CheckCircle size={16} />}
            onClick={() => handleApprove(selectedEmployee.id, selectedJob.id)}
          >
            Approve Request
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  const renderTeamOverview = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Team</h2>
          <p className="text-gray-600">
            Manage your team's redeployment opportunities and review requests.
          </p>
        </div>

        {renderTeamMetrics()}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                  <div className="flex space-x-2">
                    {(['overview', 'performance', 'development'] as const).map(tab => (
                      <Button
                        key={tab}
                        variant={activeTab === tab ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {teamMembers.map(employee => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      onClick={() => setSelectedEmployee(employee)}
                    />
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
              </CardHeader>
              <CardBody>
                {pendingApprovals.length > 0 ? (
                  <div className="space-y-4">
                    {pendingApprovals.map(({ employee, job, match }) => (
                      <div 
                        key={`${employee.id}-${job.id}`}
                        className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setSelectedJob(job);
                        }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{employee.name}</h4>
                            <p className="text-sm text-gray-500">{employee.position}</p>
                          </div>
                          <Badge variant="warning" size="sm">Pending</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-700">→ {job.title}</p>
                          <MatchPercentageIndicator 
                            percentage={match.matchPercentage} 
                            size="sm"
                            showLabel={false}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-4">No pending approval requests.</p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </>
    );
  };
  
  return (
    <div>
      {selectedEmployee && selectedJob ? renderDetailView() : renderTeamOverview()}
    </div>
  );
};
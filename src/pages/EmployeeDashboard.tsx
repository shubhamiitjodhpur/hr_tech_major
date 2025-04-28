import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SkillGapIndicator } from '../components/SkillGapIndicator';
import { JobMatchCard } from '../components/JobMatchCard';
import { Badge } from '../components/ui/Badge';
import { BookOpen, ChevronLeft, ExternalLink } from 'lucide-react';
import { JobPosition, LearningResource } from '../types';

export const EmployeeDashboard: React.FC = () => {
  const { user } = useAuth();
  const { jobPositions, getEmployeeMatches, getJobById, getRecommendedLearningResources } = useData();
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [showLearningResources, setShowLearningResources] = useState(false);
  
  if (!user) return null;
  
  // Mock the current user as an employee
  const employeeId = '1'; // Using Jordan Smith for demo
  const matches = getEmployeeMatches(employeeId);
  
  // Filter job positions that match the employee
  const matchedJobs = matches.map(match => ({
    job: getJobById(match.jobId)!,
    match
  }));
  
  const learningResources = selectedJob
    ? getRecommendedLearningResources(employeeId, selectedJob.id)
    : [];
    
  const renderLearningResource = (resource: LearningResource) => {
    return (
      <div key={resource.id} className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium text-gray-900">{resource.title}</h4>
            <p className="text-sm text-gray-500">
              {resource.provider} • {resource.duration} • {resource.type}
            </p>
          </div>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    );
  };
  
  const renderDetailView = () => {
    if (!selectedJob) return null;
    
    const match = matches.find(m => m.jobId === selectedJob.id);
    if (!match) return null;
    
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
          <div>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ChevronLeft size={16} />}
              onClick={() => {
                setSelectedJob(null);
                setShowLearningResources(false);
              }}
              className="mb-2 sm:mb-0"
            >
              Back to matches
            </Button>
            <h2 className="text-xl font-semibold text-gray-900">{selectedJob.title}</h2>
            <p className="text-sm text-gray-500">{selectedJob.department} • {selectedJob.vacancies} open position{selectedJob.vacancies !== 1 ? 's' : ''}</p>
          </div>
          <Badge variant={match.matchPercentage >= 80 ? 'success' : match.matchPercentage >= 60 ? 'warning' : 'danger'} size="lg">
            {match.matchPercentage}% Match
          </Badge>
        </CardHeader>
        
        <CardBody>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description</h3>
            <p className="text-gray-700">{selectedJob.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Required Skills</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {match.skillGaps.map(gap => (
                <SkillGapIndicator key={gap.skillId} skillGap={gap} />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Learning Resources</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLearningResources(!showLearningResources)}
                leftIcon={<BookOpen size={16} />}
              >
                {showLearningResources ? 'Hide Resources' : 'Show Resources'}
              </Button>
            </div>
            
            {showLearningResources && (
              <div className="space-y-3">
                {learningResources.length > 0 ? (
                  learningResources.map(renderLearningResource)
                ) : (
                  <p className="text-gray-500 text-center py-4">No learning resources available for this job match.</p>
                )}
              </div>
            )}
          </div>
        </CardBody>
        
        <CardFooter className="bg-gray-50 flex justify-end">
          <Button>Apply for this Position</Button>
        </CardFooter>
      </Card>
    );
  };
  
  const renderMatchList = () => {
    return (
      <>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Job Matches</h2>
          <p className="text-gray-600">
            Based on your skills and experience, we've found {matchedJobs.length} potential matches for you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedJobs.map(({ job, match }) => (
            <JobMatchCard
              key={job.id}
              job={job}
              jobMatch={match}
              onViewDetails={() => setSelectedJob(job)}
            />
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div>
      {selectedJob ? renderDetailView() : renderMatchList()}
    </div>
  );
};
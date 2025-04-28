import React from 'react';
import { JobMatch, JobPosition } from '../types';
import { Card, CardBody, CardFooter } from './ui/Card';
import { Button } from './ui/Button';
import { MatchPercentageIndicator } from './MatchPercentageIndicator';
import { Badge } from './ui/Badge';
import { ChevronRight } from 'lucide-react';

interface JobMatchCardProps {
  jobMatch: JobMatch;
  job: JobPosition;
  onViewDetails: () => void;
}

export const JobMatchCard: React.FC<JobMatchCardProps> = ({
  jobMatch,
  job,
  onViewDetails
}) => {
  const { matchPercentage, status, skillGaps } = jobMatch;
  
  const getStatusBadge = () => {
    switch (status) {
      case 'recommended':
        return <Badge variant="info">Recommended</Badge>;
      case 'applied':
        return <Badge variant="primary">Applied</Badge>;
      case 'in-review':
        return <Badge variant="warning">In Review</Badge>;
      case 'approved':
        return <Badge variant="success">Approved</Badge>;
      case 'rejected':
        return <Badge variant="danger">Not a Match</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="h-full transition-transform transform hover:translate-y-[-4px]">
      <CardBody>
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
          <MatchPercentageIndicator percentage={matchPercentage} />
        </div>
        <p className="text-sm text-gray-500 mb-3">{job.department} • {job.vacancies} position{job.vacancies !== 1 ? 's' : ''}</p>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Skills Match</span>
            <span className="text-xs text-gray-500">{job.requiredSkills.length - skillGaps.length}/{job.requiredSkills.length} skills</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{ width: `${matchPercentage}%` }}
            />
          </div>
        </div>
        
        <div className="text-sm text-gray-700 line-clamp-2 mb-2">
          {job.description}
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between bg-gray-50">
        <div>{getStatusBadge()}</div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onViewDetails}
          rightIcon={<ChevronRight size={16} />}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
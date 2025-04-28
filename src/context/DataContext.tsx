import React, { createContext, useContext, useState } from 'react';
import { 
  Employee, 
  JobPosition, 
  JobMatch, 
  LearningResource, 
  RedeploymentMetrics,
  SkillGap
} from '../types';

// Mock data for demonstration
import { 
  mockEmployees,
  mockJobPositions,
  mockJobMatches,
  mockLearningResources,
  mockRedeploymentMetrics
} from '../data/mockData';

interface DataContextType {
  employees: Employee[];
  jobPositions: JobPosition[];
  jobMatches: JobMatch[];
  learningResources: LearningResource[];
  metrics: RedeploymentMetrics;
  getEmployeeById: (id: string) => Employee | undefined;
  getJobById: (id: string) => JobPosition | undefined;
  getEmployeeMatches: (employeeId: string) => JobMatch[];
  getJobMatches: (jobId: string) => JobMatch[];
  getEmployeeSkillGaps: (employeeId: string, jobId: string) => SkillGap[];
  getRecommendedLearningResources: (employeeId: string, jobId: string) => LearningResource[];
  updateJobMatchStatus: (employeeId: string, jobId: string, status: JobMatch['status']) => void;
}

const DataContext = createContext<DataContextType>({
  employees: [],
  jobPositions: [],
  jobMatches: [],
  learningResources: [],
  metrics: {
    totalAtRisk: 0,
    successfulRedeployments: 0,
    inProgress: 0,
    costSavings: 0,
    averageTimeToRedeploy: 0,
    satisfactionRate: 0
  },
  getEmployeeById: () => undefined,
  getJobById: () => undefined,
  getEmployeeMatches: () => [],
  getJobMatches: () => [],
  getEmployeeSkillGaps: () => [],
  getRecommendedLearningResources: () => [],
  updateJobMatchStatus: () => {}
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees] = useState<Employee[]>(mockEmployees);
  const [jobPositions] = useState<JobPosition[]>(mockJobPositions);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>(mockJobMatches);
  const [learningResources] = useState<LearningResource[]>(mockLearningResources);
  const [metrics] = useState<RedeploymentMetrics>(mockRedeploymentMetrics);

  const getEmployeeById = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  const getJobById = (id: string) => {
    return jobPositions.find(job => job.id === id);
  };

  const getEmployeeMatches = (employeeId: string) => {
    return jobMatches.filter(match => match.employeeId === employeeId);
  };

  const getJobMatches = (jobId: string) => {
    return jobMatches.filter(match => match.jobId === jobId);
  };

  const getEmployeeSkillGaps = (employeeId: string, jobId: string) => {
    const match = jobMatches.find(
      match => match.employeeId === employeeId && match.jobId === jobId
    );
    return match ? match.skillGaps : [];
  };

  const getRecommendedLearningResources = (employeeId: string, jobId: string) => {
    const skillGaps = getEmployeeSkillGaps(employeeId, jobId);
    return learningResources.filter(resource => 
      skillGaps.some(gap => gap.skillId === resource.skillId)
    );
  };

  const updateJobMatchStatus = (employeeId: string, jobId: string, status: JobMatch['status']) => {
    setJobMatches(prevMatches => 
      prevMatches.map(match => 
        match.employeeId === employeeId && match.jobId === jobId
          ? { ...match, status }
          : match
      )
    );
  };

  return (
    <DataContext.Provider value={{
      employees,
      jobPositions,
      jobMatches,
      learningResources,
      metrics,
      getEmployeeById,
      getJobById,
      getEmployeeMatches,
      getJobMatches,
      getEmployeeSkillGaps,
      getRecommendedLearningResources,
      updateJobMatchStatus
    }}>
      {children}
    </DataContext.Provider>
  );
};
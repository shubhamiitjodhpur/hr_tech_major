export type UserRole = 'hr-admin' | 'manager' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  skills: Skill[];
  riskLevel: number; // 0-100
  managerId: string;
  avatar?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  requiredSkills: Skill[];
  description: string;
  vacancies: number;
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
}

export interface JobMatch {
  employeeId: string;
  jobId: string;
  matchPercentage: number;
  skillGaps: SkillGap[];
  status: 'recommended' | 'applied' | 'in-review' | 'approved' | 'rejected';
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  skillId: string;
  duration: string;
  url: string;
  type: 'course' | 'certification' | 'workshop' | 'webinar';
}

export interface RedeploymentMetrics {
  totalAtRisk: number;
  successfulRedeployments: number;
  inProgress: number;
  costSavings: number;
  averageTimeToRedeploy: number;
  satisfactionRate: number;
}
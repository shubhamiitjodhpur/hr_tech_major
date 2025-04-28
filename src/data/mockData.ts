import { Employee, JobPosition, JobMatch, LearningResource, RedeploymentMetrics } from '../types';

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jordan Smith',
    position: 'Marketing Coordinator',
    department: 'Marketing',
    riskLevel: 85,
    managerId: '5',
    skills: [
      { id: 's1', name: 'Social Media Marketing', level: 4, category: 'Marketing' },
      { id: 's2', name: 'Content Creation', level: 3, category: 'Marketing' },
      { id: 's3', name: 'Data Analysis', level: 2, category: 'Analytics' },
      { id: 's4', name: 'SEO', level: 3, category: 'Marketing' }
    ],
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=96'
  },
  {
    id: '2',
    name: 'Casey Johnson',
    position: 'Sales Representative',
    department: 'Sales',
    riskLevel: 70,
    managerId: '6',
    skills: [
      { id: 's5', name: 'Lead Generation', level: 4, category: 'Sales' },
      { id: 's6', name: 'Negotiation', level: 3, category: 'Communication' },
      { id: 's7', name: 'CRM Tools', level: 3, category: 'Software' },
      { id: 's8', name: 'Market Research', level: 2, category: 'Research' }
    ],
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=96'
  },
  {
    id: '3',
    name: 'Morgan Lee',
    position: 'Customer Support Specialist',
    department: 'Customer Service',
    riskLevel: 90,
    managerId: '7',
    skills: [
      { id: 's9', name: 'Ticketing Systems', level: 4, category: 'Software' },
      { id: 's10', name: 'Problem Resolution', level: 4, category: 'Customer Service' },
      { id: 's11', name: 'Communication', level: 3, category: 'Soft Skills' },
      { id: 's12', name: 'Technical Troubleshooting', level: 2, category: 'Technical' }
    ],
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=96'
  },
  {
    id: '4',
    name: 'Riley Anderson',
    position: 'Junior Developer',
    department: 'Engineering',
    riskLevel: 65,
    managerId: '8',
    skills: [
      { id: 's13', name: 'JavaScript', level: 3, category: 'Programming' },
      { id: 's14', name: 'HTML/CSS', level: 4, category: 'Web Development' },
      { id: 's15', name: 'React', level: 2, category: 'Frontend' },
      { id: 's16', name: 'Git', level: 3, category: 'Version Control' }
    ],
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=96'
  }
];

export const mockJobPositions: JobPosition[] = [
  {
    id: 'j1',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    vacancies: 2,
    description: 'Responsible for developing and implementing digital marketing strategies to increase brand awareness and drive customer engagement.',
    requiredSkills: [
      { id: 's1', name: 'Social Media Marketing', level: 4, category: 'Marketing' },
      { id: 's2', name: 'Content Creation', level: 4, category: 'Marketing' },
      { id: 's17', name: 'Google Analytics', level: 3, category: 'Analytics' },
      { id: 's18', name: 'Email Marketing', level: 3, category: 'Marketing' }
    ]
  },
  {
    id: 'j2',
    title: 'Business Development Representative',
    department: 'Sales',
    vacancies: 3,
    description: 'Identify and pursue new business opportunities to drive company growth and revenue.',
    requiredSkills: [
      { id: 's5', name: 'Lead Generation', level: 4, category: 'Sales' },
      { id: 's6', name: 'Negotiation', level: 4, category: 'Communication' },
      { id: 's19', name: 'Strategic Planning', level: 3, category: 'Strategy' },
      { id: 's20', name: 'Presentation Skills', level: 3, category: 'Communication' }
    ]
  },
  {
    id: 'j3',
    title: 'Technical Support Specialist',
    department: 'IT',
    vacancies: 1,
    description: 'Provide technical assistance and support to users for computer systems, hardware, and software.',
    requiredSkills: [
      { id: 's12', name: 'Technical Troubleshooting', level: 4, category: 'Technical' },
      { id: 's9', name: 'Ticketing Systems', level: 3, category: 'Software' },
      { id: 's21', name: 'Network Basics', level: 3, category: 'IT' },
      { id: 's22', name: 'Windows/Linux OS', level: 3, category: 'Operating Systems' }
    ]
  },
  {
    id: 'j4',
    title: 'Frontend Developer',
    department: 'Engineering',
    vacancies: 2,
    description: 'Design and implement user-facing features for websites and applications.',
    requiredSkills: [
      { id: 's13', name: 'JavaScript', level: 4, category: 'Programming' },
      { id: 's14', name: 'HTML/CSS', level: 4, category: 'Web Development' },
      { id: 's15', name: 'React', level: 4, category: 'Frontend' },
      { id: 's23', name: 'UI/UX Principles', level: 3, category: 'Design' }
    ]
  }
];

export const mockJobMatches: JobMatch[] = [
  {
    employeeId: '1',
    jobId: 'j1',
    matchPercentage: 85,
    status: 'recommended',
    skillGaps: [
      { skillId: 's17', skillName: 'Google Analytics', currentLevel: 0, requiredLevel: 3, gap: 3 },
      { skillId: 's18', skillName: 'Email Marketing', currentLevel: 1, requiredLevel: 3, gap: 2 }
    ]
  },
  {
    employeeId: '1',
    jobId: 'j2',
    matchPercentage: 60,
    status: 'recommended',
    skillGaps: [
      { skillId: 's5', skillName: 'Lead Generation', currentLevel: 1, requiredLevel: 4, gap: 3 },
      { skillId: 's6', skillName: 'Negotiation', currentLevel: 1, requiredLevel: 4, gap: 3 },
      { skillId: 's19', skillName: 'Strategic Planning', currentLevel: 0, requiredLevel: 3, gap: 3 }
    ]
  },
  {
    employeeId: '2',
    jobId: 'j2',
    matchPercentage: 90,
    status: 'in-review',
    skillGaps: [
      { skillId: 's19', skillName: 'Strategic Planning', currentLevel: 2, requiredLevel: 3, gap: 1 },
      { skillId: 's20', skillName: 'Presentation Skills', currentLevel: 2, requiredLevel: 3, gap: 1 }
    ]
  },
  {
    employeeId: '3',
    jobId: 'j3',
    matchPercentage: 75,
    status: 'applied',
    skillGaps: [
      { skillId: 's21', skillName: 'Network Basics', currentLevel: 1, requiredLevel: 3, gap: 2 },
      { skillId: 's22', skillName: 'Windows/Linux OS', currentLevel: 1, requiredLevel: 3, gap: 2 }
    ]
  },
  {
    employeeId: '4',
    jobId: 'j4',
    matchPercentage: 70,
    status: 'recommended',
    skillGaps: [
      { skillId: 's15', skillName: 'React', currentLevel: 2, requiredLevel: 4, gap: 2 },
      { skillId: 's23', skillName: 'UI/UX Principles', currentLevel: 1, requiredLevel: 3, gap: 2 }
    ]
  }
];

export const mockLearningResources: LearningResource[] = [
  {
    id: 'lr1',
    title: 'Google Analytics for Beginners',
    provider: 'Google',
    skillId: 's17',
    duration: '4-6 hours',
    url: 'https://analytics.google.com/analytics/academy/course/6',
    type: 'course'
  },
  {
    id: 'lr2',
    title: 'Email Marketing Mastery',
    provider: 'Coursera',
    skillId: 's18',
    duration: '2 weeks',
    url: 'https://www.coursera.org/specializations/email-marketing',
    type: 'course'
  },
  {
    id: 'lr3',
    title: 'Sales Lead Generation Techniques',
    provider: 'LinkedIn Learning',
    skillId: 's5',
    duration: '3 hours',
    url: 'https://www.linkedin.com/learning/sales-lead-generation',
    type: 'course'
  },
  {
    id: 'lr4',
    title: 'Negotiation Skills Workshop',
    provider: 'MasterClass',
    skillId: 's6',
    duration: '5 hours',
    url: 'https://www.masterclass.com/classes/chris-voss-teaches-the-art-of-negotiation',
    type: 'workshop'
  },
  {
    id: 'lr5',
    title: 'Network Fundamentals',
    provider: 'Cisco',
    skillId: 's21',
    duration: '40 hours',
    url: 'https://www.cisco.com/c/en/us/training-events/training-certifications/certifications/entry/ccent.html',
    type: 'certification'
  },
  {
    id: 'lr6',
    title: 'Windows and Linux Administration',
    provider: 'Udemy',
    skillId: 's22',
    duration: '20 hours',
    url: 'https://www.udemy.com/course/linux-administration-bootcamp/',
    type: 'course'
  },
  {
    id: 'lr7',
    title: 'React - The Complete Guide',
    provider: 'Udemy',
    skillId: 's15',
    duration: '40 hours',
    url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
    type: 'course'
  },
  {
    id: 'lr8',
    title: 'UI/UX Design Fundamentals',
    provider: 'Interaction Design Foundation',
    skillId: 's23',
    duration: '3 weeks',
    url: 'https://www.interaction-design.org/courses/ui-design-patterns-for-successful-software',
    type: 'course'
  }
];

export const mockRedeploymentMetrics: RedeploymentMetrics = {
  totalAtRisk: 42,
  successfulRedeployments: 18,
  inProgress: 15,
  costSavings: 750000,
  averageTimeToRedeploy: 45, // days
  satisfactionRate: 85 // percentage
};
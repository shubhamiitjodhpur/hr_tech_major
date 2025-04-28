import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { user } = useAuth();
  const { employees, learningResources } = useData();
  
  // For demo, use the first employee's skills
  const employee = employees[0];
  
  const skillsByCategory = employee.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof employee.skills>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Skills</h2>
        <Button leftIcon={<TrendingUp size={16} />}>Track Progress</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">Skill Inventory</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <div key={category}>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">{category}</h4>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      {skills.map(skill => (
                        <div key={skill.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">{skill.name}</h5>
                            <Badge variant="primary">Level {skill.level}</Badge>
                          </div>
                          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-2 bg-blue-500 rounded-full" 
                              style={{ width: `${(skill.level / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                <Award className="text-blue-500" size={24} />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-900">Project Management Professional</p>
                  <p className="text-sm text-gray-500">Expires in 8 months</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <p className="font-medium text-gray-900">Agile Scrum Master</p>
                  <p className="text-sm text-gray-500">Expires in 14 months</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Learning Path</h3>
                <BookOpen className="text-blue-500" size={24} />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                {learningResources.slice(0, 3).map(resource => (
                  <div key={resource.id} className="p-3 border rounded-lg">
                    <p className="font-medium text-gray-900">{resource.title}</p>
                    <p className="text-sm text-gray-500">{resource.provider} • {resource.duration}</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Start Learning
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Search, Briefcase, Filter, Users, MapPin } from 'lucide-react';

export const JobsSection: React.FC = () => {
  const { jobPositions } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const departments = Array.from(new Set(jobPositions.map(job => job.department)));

  const filteredJobs = jobPositions.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Open Positions</h2>
          <p className="text-gray-500 mt-1">
            {filteredJobs.length} positions available across {departments.length} departments
          </p>
        </div>
        <Button>Post New Position</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search positions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {filteredJobs.map(job => (
              <div key={job.id} className="border rounded-lg p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Briefcase className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={16} className="mr-1" />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={16} className="mr-1" />
                          <span>Remote</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">{job.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="primary">{job.vacancies} {job.vacancies === 1 ? 'position' : 'positions'}</Badge>
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map(skill => (
                      <span 
                        key={skill.id} 
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 flex items-center"
                      >
                        {skill.name}
                        <Badge variant="primary" size="sm" className="ml-2">
                          Level {skill.level}
                        </Badge>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Posted 2 days ago • 12 applicants
                  </div>
                  <Button>Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
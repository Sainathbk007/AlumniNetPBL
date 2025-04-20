import React, { useState } from 'react';
import { Briefcase, Filter, Search } from 'lucide-react';
import { jobPostings } from '../data/mockData';
import JobCard from '../components/jobs/JobCard';

const JobsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(true);

  // Filter jobs based on search, type, and active status
  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === '' || job.type === selectedType;
    
    const isActive = new Date(job.applicationDeadline) >= new Date();
    const matchesActive = !showActiveOnly || isActive;
    
    return matchesSearch && matchesType && matchesActive;
  });

  // Sort jobs by deadline (closest deadline first)
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const deadlineA = new Date(a.applicationDeadline);
    const deadlineB = new Date(b.applicationDeadline);
    return deadlineA.getTime() - deadlineB.getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Jobs & Internships
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          Explore opportunities shared by our alumni
        </p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search jobs, companies, or keywords..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="relative inline-flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div className="inline-flex items-center">
            <input
              id="active-only"
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="active-only" className="ml-2 block text-sm text-gray-900">
              <Briefcase className="h-4 w-4 inline mr-1" />
              Active listings only
            </label>
          </div>
        </div>
      </div>

      {sortedJobs.length > 0 ? (
        <div className="space-y-6">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { JobPosting } from '../../types';
import { MapPin, Clock, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: JobPosting;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days left until deadline
  const calculateDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const differenceInTime = deadlineDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const daysLeft = calculateDaysLeft(job.applicationDeadline);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg border-l-4 border-blue-500">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
          <span 
            className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${job.type === 'full-time' ? 'bg-green-100 text-green-800' : 
                job.type === 'part-time' ? 'bg-blue-100 text-blue-800' :
                'bg-amber-100 text-amber-800'}
            `}
          >
            {job.type === 'full-time' ? 'Full-time' : 
             job.type === 'part-time' ? 'Part-time' : 'Internship'}
          </span>
        </div>
        
        <div className="mt-2 flex items-center">
          <Briefcase className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-gray-600 font-medium">{job.company}</span>
        </div>
        
        <div className="mt-1 flex items-center">
          <MapPin className="h-4 w-4 text-gray-500 mr-1" />
          <span className="text-gray-600">{job.location}</span>
        </div>
        
        <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>
        
        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-4">
            <span className="text-sm font-medium text-gray-700">Key Requirements:</span>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-600 space-y-1">
              {job.requirements.slice(0, 2).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
              {job.requirements.length > 2 && (
                <li className="text-blue-600">+ {job.requirements.length - 2} more requirements</li>
              )}
            </ul>
          </div>
        )}
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-1" />
            <span 
              className={`text-sm ${
                daysLeft < 3 ? 'text-red-600 font-medium' : 
                daysLeft < 7 ? 'text-amber-600' : 'text-gray-600'
              }`}
            >
              {daysLeft <= 0 ? 'Deadline passed' : 
               daysLeft === 1 ? 'Deadline: Tomorrow' : 
               `Deadline: ${formatDate(job.applicationDeadline)} (${daysLeft} days left)`}
            </span>
          </div>
          
          <div className="flex space-x-3">
            <Link
              to={`/jobs/${job.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Details
            </Link>
            <Link
              to={`/jobs/${job.id}/apply`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
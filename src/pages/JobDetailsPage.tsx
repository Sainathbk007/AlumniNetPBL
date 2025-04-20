import React from 'react';
import { useParams } from 'react-router-dom';
import { jobPostings } from '../data/mockData';

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = jobPostings.find((job) => String(job.id) === jobId);

  if (!job) {
    return <p className="text-center text-lg text-gray-600">Job not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="text-lg text-gray-600 mb-2">{job.company}</p>
      <p className="text-sm text-gray-600 mb-4">{job.location}</p>
      <p className="text-sm text-gray-600 mb-4">Type: {job.type}</p>
      <p className="text-sm text-gray-600 mb-4">
        Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
      </p>
      <p className="text-gray-700 mb-6">{job.description}</p>
      <a
        href={`mailto:hr@${job.company.toLowerCase().replace(/\s+/g, '')}.com`}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Apply Now
      </a>
    </div>
  );
};

export default JobDetailsPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import { users } from '../../data/mockData';

const AlumniProfilePage: React.FC = () => {
  const { alumniId } = useParams<{ alumniId: string }>();
  const alumni = users.find(user => String(user.id) === alumniId);

  if (!alumni) {
    return <p className="text-center text-lg text-gray-600">Alumni not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center">
        <img
          src={alumni.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
          alt={alumni.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold">{alumni.name}</h1>
        {alumni.position && alumni.company && (
          <p className="text-lg text-gray-600">
            {alumni.position} at {alumni.company}
          </p>
        )}
        {alumni.graduationYear && (
          <p className="text-lg text-gray-600">Class of {alumni.graduationYear}</p>
        )}
        {alumni.field && (
          <p className="text-lg text-gray-600">Field: {alumni.field}</p>
        )}
      </div>

      {alumni.skills && alumni.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {alumni.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {alumni.bio && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-700">{alumni.bio}</p>
        </div>
      )}
    </div>
  );
};

export default AlumniProfilePage;
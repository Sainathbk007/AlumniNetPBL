import React from 'react';
import { User } from '../../types';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, MessageSquare } from 'lucide-react';

interface AlumniCardProps {
  alumni: User;
}

const AlumniCard: React.FC<AlumniCardProps> = ({ alumni }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition duration-300 hover:shadow-lg">
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      <div className="relative px-6 pb-6">
        <div className="flex justify-center">
          <img
            src={alumni.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
            alt={alumni.name}
            className="w-24 h-24 rounded-full border-4 border-white absolute -top-12 object-cover"
          />
        </div>
        <div className="pt-16 text-center">
          <h3 className="text-xl font-bold text-gray-900">{alumni.name}</h3>
          {alumni.position && alumni.company && (
            <div className="flex items-center justify-center mt-1 text-gray-600">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{alumni.position} at {alumni.company}</span>
            </div>
          )}
          {alumni.graduationYear && (
            <div className="flex items-center justify-center mt-1 text-gray-600">
              <GraduationCap className="h-4 w-4 mr-1" />
              <span>Class of {alumni.graduationYear}</span>
            </div>
          )}
          {alumni.field && (
            <p className="mt-2 text-sm text-gray-500">{alumni.field}</p>
          )}
          
          {alumni.skills && alumni.skills.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap justify-center gap-2">
                {alumni.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-6 flex justify-center space-x-3">
            <Link
              to={`/directory/${alumni.id}`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Profile
            </Link>
            <Link
              to={`/mentorship/request/${alumni.id}`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Request Mentorship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniCard;
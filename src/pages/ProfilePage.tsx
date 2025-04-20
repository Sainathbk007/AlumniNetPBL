import React from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Mail, Calendar, Briefcase, GraduationCap } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-center">
              {currentUser.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-full border-4 border-white absolute -top-16 object-cover"
                />
              ) : (
                <UserCircle className="w-32 h-32 text-gray-400 absolute -top-16" />
              )}
            </div>

            <div className="pt-20 text-center">
              <h1 className="text-3xl font-bold text-gray-900">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}</p>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 flex items-center">
                  <dt className="w-1/4">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </dt>
                  <dd className="text-gray-900">{currentUser.email}</dd>
                </div>

                {currentUser.graduationYear && (
                  <div className="py-4 flex items-center">
                    <dt className="w-1/4">
                      <GraduationCap className="h-5 w-5 text-gray-400" />
                    </dt>
                    <dd className="text-gray-900">Class of {currentUser.graduationYear}</dd>
                  </div>
                )}

                {currentUser.company && currentUser.position && (
                  <div className="py-4 flex items-center">
                    <dt className="w-1/4">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                    </dt>
                    <dd className="text-gray-900">
                      {currentUser.position} at {currentUser.company}
                    </dd>
                  </div>
                )}

                {currentUser.field && (
                  <div className="py-4 flex items-center">
                    <dt className="w-1/4">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </dt>
                    <dd className="text-gray-900">{currentUser.field}</dd>
                  </div>
                )}
              </dl>
            </div>

            {currentUser.skills && currentUser.skills.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {currentUser.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
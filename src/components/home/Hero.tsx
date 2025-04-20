import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Hero: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  return (
    <div className="relative bg-blue-600">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
          alt="University campus"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="md:w-2/3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Connect. Mentor. Grow.
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl">
            Join our alumni network to connect with fellow graduates, mentor current students, and discover new career opportunities. Build lasting relationships that help everyone succeed.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/register"
                  className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Join the Network
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <>
                {currentUser?.role === 'student' && (
                  <Link
                    to="/mentorship"
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Find a Mentor
                  </Link>
                )}
                {currentUser?.role === 'alumni' && (
                  <Link
                    to="/mentorship"
                    className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Mentor Students
                  </Link>
                )}
                <Link
                  to="/events"
                  className="px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                >
                  Upcoming Events
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
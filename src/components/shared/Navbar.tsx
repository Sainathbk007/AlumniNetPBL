import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, UserCircle, LogOut, Briefcase, Calendar, Newspaper, Users, BookOpen, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { to: '/news', label: 'News Feed', icon: <Newspaper className="w-5 h-5 mr-2" /> },
      { to: '/events', label: 'Events', icon: <Calendar className="w-5 h-5 mr-2" /> },
      { to: '/directory', label: 'Alumni Directory', icon: <Users className="w-5 h-5 mr-2" /> },
    ];

    if (!currentUser) return commonLinks;

    if (currentUser.role === 'student') {
      return [
        ...commonLinks,
        { to: '/mentorship', label: 'Mentorship', icon: <BookOpen className="w-5 h-5 mr-2" /> },
        { to: '/jobs', label: 'Jobs & Internships', icon: <Briefcase className="w-5 h-5 mr-2" /> },
      ];
    }

    if (currentUser.role === 'alumni') {
      return [
        ...commonLinks,
        { to: '/mentorship', label: 'Mentoring', icon: <BookOpen className="w-5 h-5 mr-2" /> },
        { to: '/post-job', label: 'Post Job', icon: <Briefcase className="w-5 h-5 mr-2" /> },
        { to: '/admin/post-event', label: 'Post Event', icon: <PlusCircle className="w-5 h-5 mr-2" /> },
      ];
    }

    if (currentUser.role === 'admin') {
      return [
        ...commonLinks,
        { to: '/admin/events', label: 'Manage Events', icon: <Calendar className="w-5 h-5 mr-2" /> },
        { to: '/admin/users', label: 'Manage Users', icon: <Users className="w-5 h-5 mr-2" /> },
        { to: '/admin/post-job', label: 'Post Job', icon: <Briefcase className="w-5 h-5 mr-2" /> },
        { to: '/admin/post-event', label: 'Post Event', icon: <PlusCircle className="w-5 h-5 mr-2" /> },
      ];
    }

    return commonLinks;
  };

  const navLinks = getNavLinks();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-blue-600 font-bold text-xl">Alumni Network</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === link.to
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                } transition-colors duration-200`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex md:items-center">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  {currentUser.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-8 w-8" />
                  )}
                  <span className="ml-2 text-sm font-medium">{currentUser.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:bg-blue-50 focus:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.to
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                } transition-colors duration-200`}
                onClick={closeMenu}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}

            {currentUser ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  {currentUser.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-10 w-10 text-gray-400" />
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={closeMenu}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="space-y-1 px-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    onClick={closeMenu}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
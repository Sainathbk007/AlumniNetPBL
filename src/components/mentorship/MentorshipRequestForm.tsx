import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { users } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const MentorshipRequestForm: React.FC = () => {
  const { alumniId } = useParams<{ alumniId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Find the alumni
  const alumni = users.find(user => user.id === alumniId && user.role === 'alumni');

  if (!alumni) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Alumni not found. Please select a valid alumni from the directory.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/directory')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You must be logged in as a student to request mentorship.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      try {
        // In a real application, this would be an API call to save the mentorship request
        console.log('Mentorship request submitted', {
          studentId: currentUser.id,
          alumniId,
          message
        });
        
        setIsLoading(false);
        navigate('/mentorship', { 
          state: { success: true, message: 'Your mentorship request has been sent!' } 
        });
      } catch (err) {
        setError('Failed to send mentorship request. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-blue-600 text-white">
          <h2 className="text-xl font-bold">Request Mentorship</h2>
          <p className="text-blue-100">Send a mentorship request to {alumni.name}</p>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6 flex items-center">
            <img
              src={alumni.profilePicture || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
              alt={alumni.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{alumni.name}</h3>
              {alumni.position && alumni.company && (
                <p className="text-sm text-gray-600">{alumni.position} at {alumni.company}</p>
              )}
              {alumni.field && (
                <p className="text-sm text-gray-600">{alumni.field}</p>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="message" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Explain why you'd like to connect with this alumni and what you're hoping to learn..."
                className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-gray-300 rounded-md p-3"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Be specific about your goals and what you hope to achieve through mentorship.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending Request...' : 'Send Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorshipRequestForm;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mentorshipRequests, tasks, users } from '../data/mockData';
import { BookOpen, CheckCircle, PlusCircle, UserPlus } from 'lucide-react';

const MentorshipPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userTasks] = useState(tasks);

  // Filter mentorship requests
  const acceptedRequests = mentorshipRequests.filter(
    (request) =>
      (currentUser?.role === 'student' && request.studentId === currentUser.id && request.status === 'accepted') ||
      (currentUser?.role === 'alumni' && request.alumniId === currentUser.id && request.status === 'accepted')
  );

  // Get mentees for alumni
  const mentees = users.filter(
    (user) =>
      user.role === 'student' &&
      acceptedRequests.some((req) => req.studentId === user.id)
  );

  // Get mentors for students
  const mentors = users.filter(
    (user) =>
      user.role === 'alumni' &&
      acceptedRequests.some((req) => req.alumniId === user.id)
  );

  // Filter tasks based on user role
  const filteredTasks = userTasks.filter((task) => {
    if (currentUser?.role === 'student') {
      return acceptedRequests.some((req) => req.id === task.mentorshipId);
    } else if (currentUser?.role === 'alumni') {
      return acceptedRequests.some((req) => req.id === task.mentorshipId);
    }
    return false;
  });

  // Handle messaging
  const handleMessage = (userId: string) => {
    navigate(`/mentorship/messages/${userId}`); // Navigate to the conversation page
  };

  // Handle task details navigation
  const handleViewTaskDetails = (taskId: string) => {
    navigate(`/mentorship/task/${taskId}`);
  };

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Sign in to access mentorship</h2>
          <p className="mt-1 text-sm text-gray-500">You need to be logged in to view this page.</p>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {currentUser.role === 'student' ? 'Your Mentorship Program' : 'Mentor Dashboard'}
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
          {currentUser.role === 'student'
            ? 'Connect with alumni mentors and advance your skills'
            : 'Guide students and help them grow professionally'}
        </p>
      </div>

      {/* Student View */}
      {currentUser.role === 'student' && (
        <div>
          {/* Mentors Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Mentors</h2>
            {mentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={mentor.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                        alt={mentor.name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{mentor.name}</h3>
                        {mentor.position && mentor.company && (
                          <p className="text-sm text-gray-600">{mentor.position} at {mentor.company}</p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {mentor.bio || `Expert in ${mentor.field || 'their field'} with valuable industry experience.`}
                    </p>
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleMessage(mentor.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No mentors yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any mentors yet. Browse the alumni directory to find potential mentors.
                </p>
                <div className="mt-6">
                  <Link
                    to="/directory"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Explore Alumni Directory
                  </Link>
                </div>
              </div>
            )}
          </section>

          {/* Tasks Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Tasks</h2>
            {filteredTasks.length > 0 ? (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const assignedByName = mentors.find((m) => m.id === task.assignedBy)?.name || 'Unknown';

                  return (
                    <div key={task.id} className="bg-white shadow-md rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">Assigned by: {assignedByName}</p>
                        </div>
                        <span
                          className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${task.status === 'assigned' ? 'bg-gray-100 text-gray-800' : 
                              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'}
                          `}
                        >
                          {task.status === 'assigned' ? 'Assigned' : task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </span>
                      </div>
                      <p className="mt-4 text-gray-600">{task.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => handleViewTaskDetails(task.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any tasks assigned yet. Your mentor will add tasks for you to complete.
                </p>
              </div>
            )}
          </section>
        </div>
      )}

      {/* Alumni View */}
      {currentUser.role === 'alumni' && (
        <div>
          {/* Mentees Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Mentees</h2>
            {mentees.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentees.map((mentee) => (
                  <div key={mentee.id} className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={mentee.profilePicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'}
                        alt={mentee.name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{mentee.name}</h3>
                        <p className="text-sm text-gray-600">Student - Class of {mentee.graduationYear}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Studying {mentee.field || 'at the university'}.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleMessage(mentee.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Message
                      </button>
                      <Link
                        to={`/mentorship/assign-task/${mentee.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        <PlusCircle className="mr-1 h-4 w-4" />
                        Assign Task
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <UserPlus className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No mentees yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You don't have any mentees yet. You'll be notified when students request your mentorship.
                </p>
              </div>
            )}
          </section>

          {/* Tasks Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assigned Tasks</h2>
            {filteredTasks.length > 0 ? (
              <div className="space-y-4">
                {filteredTasks.map((task) => {
                  const assignedToName = mentees.find((m) => m.id === task.assignedTo)?.name || 'Unknown';

                  return (
                    <div key={task.id} className="bg-white shadow-md rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">Assigned to: {assignedToName}</p>
                        </div>
                        <span
                          className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${task.status === 'assigned' ? 'bg-gray-100 text-gray-800' : 
                              task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'}
                          `}
                        >
                          {task.status === 'assigned' ? 'Assigned' : task.status === 'in-progress' ? 'In Progress' : 'Completed'}
                        </span>
                      </div>
                      <p className="mt-4 text-gray-600">{task.description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <button
                          onClick={() => handleViewTaskDetails(task.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No tasks assigned</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't assigned any tasks to your mentees yet.
                </p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default MentorshipPage;
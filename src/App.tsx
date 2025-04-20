import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AlumniDirectoryPage from './pages/AlumniDirectoryPage';
import EventsPage from './pages/EventsPage';
import JobsPage from './pages/JobsPage';
import NewsPage from './pages/NewsPage';
import MentorshipPage from './pages/MentorshipPage';
import MentorshipRequestForm from './components/mentorship/MentorshipRequestForm';
import AlumniProfilePage from './pages/Alumni/AlumniProfilePage';
import PostJobPage from './pages/PostJobPage';
import PostEventPage from './pages/Admin/PostEventPage';
import MentorshipMessagePage from './pages/Mentorship/MentorshipMessagePage';
import ContactUsPage from './pages/ContactUsPage';
import AssignTaskPage from './pages/Mentorship/AssignTaskPage';
import TaskDetailsPage from './pages/Mentorship/TaskDetailPage';
import FAQPage from './pages/FAQPage';
import ManageUsersPage from './pages/Admin/ManageUsersPage';
import ManageEventsPage from './pages/Admin/ManageEventsPage';
import UpdateEventsPage from './pages/UpdateEventsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import PostNewsPage from './pages/Admin/PostNewsPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* General Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/directory" element={<AlumniDirectoryPage />} />
              <Route path="/directory/:alumniId" element={<AlumniProfilePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:eventId" element={<EventDetailsPage />} /> {/* View Event Details */}
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:jobId" element={<JobDetailsPage />} /> {/* View Job Details */}
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:newsId" element={<NewsDetailsPage />} />
              <Route path="/mentorship" element={<MentorshipPage />} />
              <Route path="/mentorship/request/:alumniId" element={<MentorshipRequestForm />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/faq" element={<FAQPage />} />

              {/* Admin Pages */}
              <Route path="/admin/users" element={<ManageUsersPage />} />
              <Route path="/admin/events" element={<ManageEventsPage />} />
              <Route path="/admin/post-event" element={<PostEventPage />} /> {/* Add Event */}
              <Route path="/admin/post-job" element={<PostJobPage />} /> {/* Add Job */}
              <Route path="/admin/post-news" element={<PostNewsPage />} />

              {/* Alumni Pages */}
              <Route path="/alumni/profile" element={<AlumniProfilePage />} />

              {/* Job and Event Posting */}
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/post-event" element={<PostEventPage />} />

              {/* Mentorship Pages */}
              <Route path="/mentorship/messages" element={<MentorshipMessagePage />} />
              <Route path="/mentorship/messages/:userId" element={<MentorshipMessagePage />} />
              <Route path="/mentorship/assign-task/:menteeId" element={<AssignTaskPage />} />
              <Route path="/mentorship/task/:taskId" element={<TaskDetailsPage />} /> {/* View Task Details */}

              {/* Event Update Page */}
              <Route path="/events/update/:eventId" element={<UpdateEventsPage />} />

              {/* Fallback Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
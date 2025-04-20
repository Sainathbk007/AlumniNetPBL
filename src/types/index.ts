export type UserRole = 'student' | 'alumni' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
  bio?: string;
  graduationYear?: number;
  company?: string;
  position?: string;
  field?: string;
  skills?: string[];
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  alumniId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'assigned' | 'in-progress' | 'completed';
  mentorshipId: string;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
}

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  type: 'full-time' | 'part-time' | 'internship';
  alumniId: string;
  postedAt: string;
  applicationDeadline: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  type: 'webinar' | 'seminar' | 'workshop' | 'networking';
  alumniId?: string;
  registrations?: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorRole: UserRole;
  postedAt: string;
  category: string;
  imageUrl?: string;
}
import { User, MentorshipRequest, Task, JobPosting, Event, NewsArticle } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'student',
    profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    graduationYear: 2025,
    field: 'Computer Science',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'alumni',
    profilePicture: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    graduationYear: 2020,
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer',
    field: 'Software Engineering',
    skills: ['Python', 'Machine Learning', 'Cloud Architecture']
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'admin',
    profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    role: 'alumni',
    profilePicture: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
    graduationYear: 2018,
    company: 'Global Innovations',
    position: 'Product Manager',
    field: 'Technology Management',
    skills: ['Product Strategy', 'Team Leadership', 'UX Design']
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'student',
    profilePicture: 'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg',
    graduationYear: 2024,
    field: 'Data Science',
    skills: ['SQL', 'Statistics', 'R Programming']
  }
];

export const mentorshipRequests: MentorshipRequest[] = [
  {
    id: '1',
    studentId: '1',
    alumniId: '2',
    status: 'accepted',
    message: 'I would like guidance on career opportunities in software development.',
    createdAt: '2023-09-15T10:30:00Z'
  },
  {
    id: '2',
    studentId: '5',
    alumniId: '4',
    status: 'pending',
    message: 'Looking for mentorship in product management and tech leadership.',
    createdAt: '2023-10-20T14:15:00Z'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Create a Portfolio Website',
    description: 'Build a personal portfolio website using React and deploy it online.',
    status: 'in-progress',
    mentorshipId: '1',
    dueDate: '2023-11-15',
    createdAt: '2023-10-01T09:00:00Z'
  },
  {
    id: '2',
    title: 'Complete JavaScript Course',
    description: 'Finish the advanced JavaScript course on Udemy and share the certificate.',
    status: 'assigned',
    mentorshipId: '1',
    dueDate: '2023-12-01',
    createdAt: '2023-10-15T11:30:00Z'
  }
];

export const jobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA (Remote)',
    description: 'We are looking for a skilled frontend developer to join our team and build innovative web applications.',
    requirements: ['3+ years of React experience', 'Proficiency in HTML, CSS, and JavaScript', 'Experience with responsive design'],
    type: 'full-time',
    alumniId: '2',
    postedAt: '2023-10-10T08:45:00Z',
    applicationDeadline: '2023-11-30'
  },
  {
    id: '2',
    title: 'Product Management Intern',
    company: 'Global Innovations',
    location: 'New York, NY (Hybrid)',
    description: 'Join our product team as an intern and gain valuable experience in technology product management.',
    requirements: ['Current student or recent graduate', 'Strong analytical skills', 'Interest in technology products'],
    type: 'internship',
    alumniId: '4',
    postedAt: '2023-10-15T14:20:00Z',
    applicationDeadline: '2023-12-15'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Career Development in Tech',
    description: 'A webinar on navigating career paths in the technology industry with insights from industry professionals.',
    date: '2023-11-20',
    time: '18:00-20:00',
    location: 'Online (Zoom)',
    organizer: 'Tech Solutions Inc.',
    type: 'webinar',
    alumniId: '2',
    registrations: ['1', '5']
  },
  {
    id: '2',
    title: 'Product Management Workshop',
    description: 'Learn the essentials of product management from experienced professionals in the field.',
    date: '2023-12-05',
    time: '14:00-17:00',
    location: 'University Campus, Room 305',
    organizer: 'Global Innovations',
    type: 'workshop',
    alumniId: '4',
    registrations: []
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'The Future of AI in Software Development',
    content: 'Artificial intelligence is revolutionizing the way we develop software. This article explores the current trends and future prospects.',
    author: 'Jane Smith',
    authorId: '2',
    authorRole: 'alumni',
    postedAt: '2023-10-05T10:15:00Z',
    category: 'Technology',
    imageUrl: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg'
  },
  {
    id: '2',
    title: 'University Partners with Industry Leaders for Internship Program',
    content: 'Our university has established partnerships with several industry leaders to provide exclusive internship opportunities for students.',
    author: 'Robert Johnson',
    authorId: '3',
    authorRole: 'admin',
    postedAt: '2023-10-12T09:30:00Z',
    category: 'University News',
    imageUrl: 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg'
  }
];
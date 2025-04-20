export interface User {
  id: string;
  name: string;
  email: string; // Add this if it's missing
  role: string; // e.g., 'alumni', 'admin', etc.
  company?: string;
  position?: string;
  field?: string;
  graduationYear?: number;
  profilePicture?: string;
  skills?: string[];
  bio?: string;
}
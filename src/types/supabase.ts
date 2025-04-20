export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'student' | 'alumni' | 'admin'
          profile_picture: string | null
          graduation_year: number | null
          company: string | null
          position: string | null
          field: string | null
          bio: string | null
          skills: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: 'student' | 'alumni' | 'admin'
          profile_picture?: string | null
          graduation_year?: number | null
          company?: string | null
          position?: string | null
          field?: string | null
          bio?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'student' | 'alumni' | 'admin'
          profile_picture?: string | null
          graduation_year?: number | null
          company?: string | null
          position?: string | null
          field?: string | null
          bio?: string | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      mentorship_requests: {
        Row: {
          id: string
          student_id: string
          alumni_id: string
          status: 'pending' | 'accepted' | 'rejected'
          message: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          alumni_id: string
          status?: 'pending' | 'accepted' | 'rejected'
          message: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          alumni_id?: string
          status?: 'pending' | 'accepted' | 'rejected'
          message?: string
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          status: 'assigned' | 'in-progress' | 'completed'
          mentorship_id: string
          due_date: string
          created_at: string
          completed_at: string | null
          created_by: string
          assigned_to: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status?: 'assigned' | 'in-progress' | 'completed'
          mentorship_id: string
          due_date: string
          created_at?: string
          completed_at?: string | null
          created_by: string
          assigned_to: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: 'assigned' | 'in-progress' | 'completed'
          mentorship_id?: string
          due_date?: string
          created_at?: string
          completed_at?: string | null
          created_by?: string
          assigned_to?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          date: string
          time_start: string
          time_end: string
          location: string
          organizer_id: string | null
          type: 'webinar' | 'seminar' | 'workshop' | 'networking'
          max_participants: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          date: string
          time_start: string
          time_end: string
          location: string
          organizer_id?: string | null
          type: 'webinar' | 'seminar' | 'workshop' | 'networking'
          max_participants?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          date?: string
          time_start?: string
          time_end?: string
          location?: string
          organizer_id?: string | null
          type?: 'webinar' | 'seminar' | 'workshop' | 'networking'
          max_participants?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          status: 'registered' | 'attended' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          status?: 'registered' | 'attended' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          status?: 'registered' | 'attended' | 'cancelled'
          created_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          description: string
          requirements: string[]
          type: 'full-time' | 'part-time' | 'internship'
          posted_by: string
          application_deadline: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          description: string
          requirements: string[]
          type: 'full-time' | 'part-time' | 'internship'
          posted_by: string
          application_deadline: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          description?: string
          requirements?: string[]
          type?: 'full-time' | 'part-time' | 'internship'
          posted_by?: string
          application_deadline?: string
          created_at?: string
          updated_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string
          applicant_id: string
          status: 'pending' | 'reviewed' | 'accepted' | 'rejected'
          cover_letter: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          applicant_id: string
          status?: 'pending' | 'reviewed' | 'accepted' | 'rejected'
          cover_letter?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          applicant_id?: string
          status?: 'pending' | 'reviewed' | 'accepted' | 'rejected'
          cover_letter?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news_articles: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          category: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          category: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          category?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
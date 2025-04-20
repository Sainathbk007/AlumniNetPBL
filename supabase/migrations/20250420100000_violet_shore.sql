/*
  # Initial Schema Setup for Alumni Network

  1. New Tables
    - users
      - Core user data and profile information
      - Integrated with Supabase auth
    - mentorship_requests
      - Tracks mentorship relationships between students and alumni
    - tasks
      - Assignments from mentors to mentees
    - events
      - University and alumni events
    - event_registrations
      - Tracks event attendance
    - jobs
      - Job and internship postings
    - job_applications
      - Tracks student applications to jobs
    - news_articles
      - Community news and updates
    
  2. Security
    - RLS enabled on all tables
    - Policies for authenticated access
    - Role-based access control
*/

-- Users table extending Supabase auth
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('student', 'alumni', 'admin')),
  profile_picture text,
  graduation_year integer,
  company text,
  position text,
  field text,
  bio text,
  skills text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Mentorship requests
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES public.users(id),
  alumni_id uuid NOT NULL REFERENCES public.users(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tasks for mentees
CREATE TABLE IF NOT EXISTS public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'assigned' CHECK (status IN ('assigned', 'in-progress', 'completed')),
  mentorship_id uuid NOT NULL REFERENCES public.mentorship_requests(id),
  due_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  created_by uuid NOT NULL REFERENCES public.users(id),
  assigned_to uuid NOT NULL REFERENCES public.users(id)
);

-- Events
CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  time_start time NOT NULL,
  time_end time NOT NULL,
  location text NOT NULL,
  organizer_id uuid REFERENCES public.users(id),
  type text NOT NULL CHECK (type IN ('webinar', 'seminar', 'workshop', 'networking')),
  max_participants integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event registrations
CREATE TABLE IF NOT EXISTS public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id),
  user_id uuid NOT NULL REFERENCES public.users(id),
  status text NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Jobs
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  requirements text[] NOT NULL,
  type text NOT NULL CHECK (type IN ('full-time', 'part-time', 'internship')),
  posted_by uuid NOT NULL REFERENCES public.users(id),
  application_deadline timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES public.jobs(id),
  applicant_id uuid NOT NULL REFERENCES public.users(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  cover_letter text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(job_id, applicant_id)
);

-- News articles
CREATE TABLE IF NOT EXISTS public.news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_id uuid NOT NULL REFERENCES public.users(id),
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own profile"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Mentorship request policies
CREATE POLICY "Students can create mentorship requests"
  ON public.mentorship_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'student'
    )
  );

CREATE POLICY "Users can view their own mentorship requests"
  ON public.mentorship_requests
  FOR SELECT
  TO authenticated
  USING (
    student_id = auth.uid() OR 
    alumni_id = auth.uid()
  );

-- Tasks policies
CREATE POLICY "Mentors can create tasks"
  ON public.tasks
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'alumni'
    )
  );

CREATE POLICY "Users can view their own tasks"
  ON public.tasks
  FOR SELECT
  TO authenticated
  USING (
    created_by = auth.uid() OR 
    assigned_to = auth.uid()
  );

-- Events policies
CREATE POLICY "Anyone can view events"
  ON public.events
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Alumni and admins can create events"
  ON public.events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('alumni', 'admin')
    )
  );

-- Event registrations policies
CREATE POLICY "Users can register for events"
  ON public.event_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their registrations"
  ON public.event_registrations
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Jobs policies
CREATE POLICY "Anyone can view jobs"
  ON public.jobs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Alumni can post jobs"
  ON public.jobs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'alumni'
    )
  );

-- Job applications policies
CREATE POLICY "Students can apply to jobs"
  ON public.job_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'student'
    )
  );

CREATE POLICY "Users can view their own applications"
  ON public.job_applications
  FOR SELECT
  TO authenticated
  USING (
    applicant_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.jobs
      WHERE jobs.id = job_applications.job_id
      AND jobs.posted_by = auth.uid()
    )
  );

-- News articles policies
CREATE POLICY "Anyone can view news"
  ON public.news_articles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Alumni and admins can post news"
  ON public.news_articles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('alumni', 'admin')
    )
  );

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS users_role_idx ON public.users(role);
CREATE INDEX IF NOT EXISTS mentorship_requests_status_idx ON public.mentorship_requests(status);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON public.tasks(status);
CREATE INDEX IF NOT EXISTS events_date_idx ON public.events(date);
CREATE INDEX IF NOT EXISTS jobs_deadline_idx ON public.jobs(application_deadline);
CREATE INDEX IF NOT EXISTS news_articles_created_at_idx ON public.news_articles(created_at);
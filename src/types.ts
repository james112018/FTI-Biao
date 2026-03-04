export interface Setting {
  key: string;
  value: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: string;
  category: string;
  status: string;
  created_at: string;
}

export interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  scripture: string;
  series: string;
  video_url: string;
  audio_url: string;
  notes: string;
  thumbnail: string;
  created_at: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  featured_image: string;
  status: string;
  created_at: string;
}

export interface Ministry {
  id: number;
  name: string;
  description: string;
  schedule: string;
  leader: string;
  icon: string;
}

export interface Testimony {
  id: number;
  name: string;
  content: string;
  image?: string;
}

export interface Submission {
  id: number;
  name: string;
  email: string;
  type: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'archived';
}

export interface SiteSettings {
  site_name: string;
  primary_color: string;
  accent_color: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  facebook_url: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'paused';
}

export interface CourseProgress {
  id: string;
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  lastAccessedLesson: string;
  updatedAt: string;
}

export interface LearningActivity {
  id: string;
  type: 'video' | 'quiz' | 'assignment';
  courseId: string;
  courseTitle?: string;
  duration?: string;
  score?: number;
  createdAt: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  certificateUrl?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: string;
}

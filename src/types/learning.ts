export interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: any;
  status: 'active' | 'completed' | 'paused';
}

export interface CourseProgress {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  lastAccessedLesson: string;
  updatedAt: any;
}

export interface LearningActivity {
  id: string;
  type: 'video' | 'quiz' | 'assignment';
  courseId: string;
  courseTitle: string;
  duration?: string;
  score?: number;
  createdAt: any;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseTitle: string;
  issuedAt: any;
  certificateUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  thumbnail: string;
}

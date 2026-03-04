import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  updateDoc, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Enrollment, CourseProgress, LearningActivity, Certificate } from '../types/learning';

export const enrollInCourse = async (uid: string, courseId: string, courseTitle: string, totalLessons: number) => {
  const enrollmentRef = doc(collection(db, `users/${uid}/enrollments`));
  const enrollmentData: Omit<Enrollment, 'id'> = {
    courseId,
    courseTitle,
    enrollmentDate: serverTimestamp(),
    status: 'active'
  };
  
  await setDoc(enrollmentRef, enrollmentData);
  
  const progressRef = doc(db, `users/${uid}/progress/${courseId}`);
  const progressData: CourseProgress = {
    courseId,
    totalLessons,
    completedLessons: 0,
    progressPercent: 0,
    lastAccessedLesson: 'Introduction',
    updatedAt: serverTimestamp()
  };
  
  await setDoc(progressRef, progressData);
  
  await addActivity(uid, {
    type: 'video',
    courseId,
    courseTitle,
    createdAt: serverTimestamp()
  });
};

export const updateCourseProgress = async (uid: string, courseId: string, completedLessons: number, totalLessons: number, lastLesson: string) => {
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);
  const progressRef = doc(db, `users/${uid}/progress/${courseId}`);
  
  await updateDoc(progressRef, {
    completedLessons,
    progressPercent,
    lastAccessedLesson: lastLesson,
    updatedAt: serverTimestamp()
  });

  if (progressPercent === 100) {
    await completeCourse(uid, courseId);
  }
};

const completeCourse = async (uid: string, courseId: string) => {
  // Update enrollment status
  const q = query(collection(db, `users/${uid}/enrollments`), where('courseId', '==', courseId));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const enrollmentDoc = querySnapshot.docs[0];
    await updateDoc(enrollmentDoc.ref, { status: 'completed' });
    
    // Issue certificate
    const certRef = doc(collection(db, `users/${uid}/certificates`));
    await setDoc(certRef, {
      courseId,
      courseTitle: enrollmentDoc.data().courseTitle,
      issuedAt: serverTimestamp()
    });
  }
};

export const addActivity = async (uid: string, activity: Omit<LearningActivity, 'id'>) => {
  const activityRef = collection(db, `users/${uid}/activity`);
  await addDoc(activityRef, {
    ...activity,
    createdAt: serverTimestamp()
  });
};

export const subscribeToEnrollments = (uid: string, callback: (enrollments: Enrollment[]) => void) => {
  const q = query(collection(db, `users/${uid}/enrollments`), orderBy('enrollmentDate', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const enrollments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Enrollment));
    callback(enrollments);
  });
};

export const subscribeToProgress = (uid: string, callback: (progress: CourseProgress[]) => void) => {
  const q = query(collection(db, `users/${uid}/progress`), orderBy('updatedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const progress = snapshot.docs.map(doc => doc.data() as CourseProgress);
    callback(progress);
  });
};

export const subscribeToActivity = (uid: string, callback: (activities: LearningActivity[]) => void) => {
  const q = query(collection(db, `users/${uid}/activity`), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const activities = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LearningActivity));
    callback(activities);
  });
};

export const subscribeToCertificates = (uid: string, callback: (certificates: Certificate[]) => void) => {
  const q = query(collection(db, `users/${uid}/certificates`), orderBy('issuedAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const certificates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Certificate));
    callback(certificates);
  });
};

import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy, 
  where, 
  Timestamp,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { db } from "../lib/firebase";

// Collections
const BLOG_POSTS = "blog_posts";
const SERMONS = "sermons";
const EVENTS = "events";
const MINISTRIES = "ministries";
const SUBMISSIONS = "submissions";
const DONATIONS = "donations";
const ADMINS = "admins";

// Generic CRUD
export const getCollection = async (collectionName: string) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void) => {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};

export const addDocument = async (collectionName: string, data: any) => {
  return await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  const docRef = doc(db, collectionName, id);
  return await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteDocument = async (collectionName: string, id: string) => {
  const docRef = doc(db, collectionName, id);
  return await deleteDoc(docRef);
};

// Specific Services
export const getAdminProfile = async (adminId: string) => {
  const docRef = doc(db, ADMINS, adminId);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? snapshot.data() : null;
};

export const updateAdminLastLogin = async (adminId: string) => {
  const docRef = doc(db, ADMINS, adminId);
  return await updateDoc(docRef, {
    lastLoginAt: serverTimestamp()
  });
};

// Revenue calculation
export const subscribeToRevenue = (callback: (total: number) => void) => {
  const q = query(collection(db, DONATIONS), where("paymentStatus", "==", "paid"));
  return onSnapshot(q, (snapshot) => {
    const total = snapshot.docs.reduce((acc, doc) => acc + (doc.data().amount || 0), 0);
    callback(total);
  });
};

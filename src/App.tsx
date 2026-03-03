import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PlanVisitPage } from './pages/PlanVisitPage';
import { MinistriesPage } from './pages/MinistriesPage';
import { SermonsPage } from './pages/SermonsPage';
import { EventsPage } from './pages/EventsPage';
import { BlogPage } from './pages/BlogPage';
import { GivingPage } from './pages/GivingPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { SermonPage } from './pages/SermonPage';
import { EventPage } from './pages/EventPage';
import { UserLogin } from './pages/UserLogin';
import { UserDashboard } from './pages/UserDashboard';
import { useAuth } from './lib/AuthContext';
import { Navigate } from 'react-router-dom';

import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLogin } from './admin/AdminLogin';

import { auth } from './lib/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('admin_token');
  if (!token) return <AdminLogin />;
  return <>{children}</>;
};

const UserProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (!loading && user && !user.emailVerified) {
      signOut(auth).then(() => {
        navigate('/login', { state: { verificationEmail: user.email }, replace: true });
      });
    }
  }, [user, loading, navigate]);

  if (loading) return null;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!user.emailVerified) {
    return null;
  }
  
  return <>{children}</>;
};

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/plan-your-visit" element={<PlanVisitPage />} />
          <Route path="/ministries" element={<MinistriesPage />} />
          <Route path="/sermons" element={<SermonsPage />} />
          <Route path="/sermons/:id" element={<SermonPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/give" element={<GivingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/dashboard" element={
            <UserProtectedRoute>
              <UserDashboard />
            </UserProtectedRoute>
          } />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

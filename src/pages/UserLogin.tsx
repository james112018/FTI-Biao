import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, LogIn, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useAuth } from '../lib/AuthContext';

export const UserLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (location.state?.verificationEmail) {
      setVerificationEmail(location.state.verificationEmail);
      // Clear state to avoid showing it on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (user && user.emailVerified) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerificationEmail(null);

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        setVerificationEmail(email);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setVerificationEmail(email);
          return;
        }
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      if (isSignUp) {
        if (err.code === 'auth/email-already-in-use') {
          setError('User already exists. Please sign in');
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        if (['auth/wrong-password', 'auth/user-not-found', 'auth/invalid-credential'].includes(err.code)) {
          setError('Email or password is incorrect');
        } else {
          setError('Something went wrong. Please try again.');
        }
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  if (verificationEmail) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-blue-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-blue-100"
        >
          <div className="p-10 md:p-12 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <CheckCircle2 size={32} />
            </div>
            <h1 className="font-serif text-3xl font-bold text-blue-900 mb-4">Verify Your Email</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We have sent you a verification email to <span className="font-bold text-blue-900">{verificationEmail}</span>. Please verify it and log in.
            </p>
            <button 
              onClick={() => setVerificationEmail(null)}
              className="w-full py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              <LogIn size={18} /> Back to Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-blue-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-blue-100"
      >
        <div className="p-10 md:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              {isSignUp ? <UserPlus size={32} /> : <LogIn size={32} />}
            </div>
            <h1 className="font-serif text-3xl font-bold text-blue-900 mb-2">
              {isSignUp ? 'Join Our Family' : 'Welcome Back'}
            </h1>
            <p className="text-gray-500">
              {isSignUp ? 'Create your account to get started' : 'Sign in to your Faith Tabernacle account'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <button type="button" className="text-xs font-bold text-blue-900 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-blue-900 text-white font-bold rounded-2xl hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              {isSignUp ? 'Create Account' : 'Sign In'} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-3"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm mb-4">
              {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
            </p>
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="inline-flex items-center gap-2 text-blue-900 font-bold hover:text-yellow-600 transition-colors"
            >
              {isSignUp ? <LogIn size={18} /> : <UserPlus size={18} />}
              {isSignUp ? 'Sign In Instead' : 'Join Our Community'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

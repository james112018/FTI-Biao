import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await window.fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
      >
        <div className="p-10 md:p-12">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Lock size={32} />
            </div>
            <h1 className="font-serif text-3xl font-bold text-blue-900">Admin Portal</h1>
            <p className="text-gray-500 mt-2">Please sign in to manage your church.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Mail size={16} className="text-blue-900" />
                Email Address
              </label>
              <input 
                required
                type="email" 
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                placeholder="admin@faithtabernacle.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Lock size={16} className="text-blue-900" />
                Password
              </label>
              <input 
                required
                type="password" 
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button 
              disabled={isLoading}
              className="w-full py-5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-blue-900 transition-colors">
              Back to Public Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

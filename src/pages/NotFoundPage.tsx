import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-serif font-bold text-blue-900 opacity-10">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-3xl font-serif font-bold text-blue-900 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-10">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white border-2 border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

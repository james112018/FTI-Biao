import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Course } from '../types/learning';

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (course: Course) => Promise<void>;
  course: Course | null;
}

export const EnrollModal = ({ isOpen, onClose, onConfirm, course }: EnrollModalProps) => {
  const [isEnrolling, setIsEnrolling] = useState(false);

  const handleEnroll = async () => {
    if (!course) return;
    setIsEnrolling(true);
    try {
      await onConfirm(course);
      onClose();
    } catch (error) {
      console.error('Enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && course && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="relative h-48">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-4 mb-8 p-4 bg-blue-50 rounded-2xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Course Duration</p>
                  <p className="text-gray-900 font-bold">{course.totalLessons} Lessons</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                  disabled={isEnrolling}
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                  className="flex-1 py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  {isEnrolling ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Confirm
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, PlayCircle, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CourseProgress } from '../types/learning';

interface UpdateProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (courseId: string, completedLessons: number, totalLessons: number, lastLesson: string) => Promise<void>;
  progress: CourseProgress | null;
  courseTitle: string;
}

export const UpdateProgressModal = ({ isOpen, onClose, onUpdate, progress, courseTitle }: UpdateProgressModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [completedCount, setCompletedCount] = useState(progress?.completedLessons || 0);
  const [lastLesson, setLastLesson] = useState(progress?.lastAccessedLesson || '');

  const handleUpdate = async () => {
    if (!progress) return;
    setIsUpdating(true);
    try {
      await onUpdate(progress.courseId, completedCount, progress.totalLessons, lastLesson);
      onClose();
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && progress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Update Progress</h3>
                  <p className="text-gray-500 text-sm">{courseTitle}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Lessons Completed</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="range" 
                      min="0" 
                      max={progress.totalLessons} 
                      value={completedCount}
                      onChange={(e) => setCompletedCount(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <span className="text-lg font-bold text-blue-600 w-12 text-right">
                      {completedCount}/{progress.totalLessons}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Last Lesson Accessed</label>
                  <div className="relative">
                    <PlayCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      value={lastLesson}
                      onChange={(e) => setLastLesson(e.target.value)}
                      placeholder="e.g., Introduction to React"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>
                </div>

                {completedCount === progress.totalLessons && (
                  <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-4 border border-emerald-100">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                      <Award size={20} />
                    </div>
                    <p className="text-sm text-emerald-700 font-medium">
                      Completing this will issue your course certificate!
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 px-6 border border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isUpdating}
                  className="flex-1 py-4 px-6 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  {isUpdating ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      Save Progress
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

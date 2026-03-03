import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Calendar, User, BookOpen, Share2, ArrowLeft, Download, MessageSquare } from 'lucide-react';
import { MOCK_SERMONS } from '../mockData';
import { formatDate } from '../lib/utils';
import { NotFoundPage } from './NotFoundPage';

export const SermonPage = () => {
  const { id } = useParams<{ id: string }>();
  const sermon = MOCK_SERMONS.find(s => s.id === Number(id));

  if (!sermon) return <NotFoundPage />;

  return (
    <div className="pt-20">
      {/* Video Section */}
      <section className="bg-black py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative z-10">
            <iframe 
              src={sermon.video_url} 
              title={sermon.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="absolute inset-0 opacity-20 blur-3xl scale-110">
          <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <Link to="/sermons" className="inline-flex items-center gap-2 text-blue-900 font-bold hover:text-yellow-600 transition-colors">
                  <ArrowLeft size={20} />
                  Back to Sermons
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-widest text-yellow-600">
                  <span className="flex items-center gap-2"><Calendar size={16} /> {formatDate(sermon.date)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-2"><User size={16} /> {sermon.speaker}</span>
                  <span>•</span>
                  <span className="flex items-center gap-2"><BookOpen size={16} /> {sermon.scripture}</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
                  {sermon.title}
                </h1>
                <p className="text-xl text-gray-500 italic">Part of the series: {sermon.series}</p>
              </div>

              <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                <h3 className="font-serif text-3xl font-bold text-blue-900 mb-6">Sermon Notes</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="space-y-4 my-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 shrink-0 mt-1 font-bold text-xs">1</div>
                    <span>Understanding the context of {sermon.scripture} and its relevance today.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 shrink-0 mt-1 font-bold text-xs">2</div>
                    <span>Practical steps for applying these biblical principles in your daily life.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 shrink-0 mt-1 font-bold text-xs">3</div>
                    <span>The transformative power of God's Word in our community.</span>
                  </li>
                </ul>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Discussion / Comments Placeholder */}
              <div className="pt-12 border-t border-gray-100">
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                  <MessageSquare size={24} className="text-yellow-500" />
                  Discussion & Reflection
                </h3>
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
                  <p className="text-gray-600 mb-6">Have a reflection or question about this message? Join the conversation.</p>
                  <button className="px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all">
                    Sign in to Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* Resources */}
              <div className="p-8 bg-blue-900 rounded-3xl text-white">
                <h3 className="font-serif text-xl font-bold mb-6">Sermon Resources</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3">
                      <Download size={20} className="text-yellow-500" />
                      <span className="font-bold text-sm">Download Audio</span>
                    </div>
                    <span className="text-xs opacity-50">MP3</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-yellow-500" />
                      <span className="font-bold text-sm">Sermon Transcript</span>
                    </div>
                    <span className="text-xs opacity-50">PDF</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3">
                      <Share2 size={20} className="text-yellow-500" />
                      <span className="font-bold text-sm">Share Message</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Related Sermons */}
              <div>
                <h3 className="font-serif text-xl font-bold text-blue-900 mb-6">Related Messages</h3>
                <div className="space-y-6">
                  {MOCK_SERMONS.filter(s => s.id !== sermon.id).slice(0, 3).map(s => (
                    <Link key={s.id} to={`/sermons/${s.id}`} className="group flex gap-4">
                      <div className="w-24 h-16 shrink-0 rounded-xl overflow-hidden relative">
                        <img src={s.thumbnail} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play size={12} fill="currentColor" className="text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-900 group-hover:text-yellow-600 transition-colors line-clamp-2">{s.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{s.speaker}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-8 bg-yellow-500 rounded-3xl text-blue-950 text-center">
                <h3 className="font-serif text-xl font-bold mb-4">Join Us This Sunday</h3>
                <p className="text-sm mb-6 opacity-90">Experience worship and the Word in person. We'd love to meet you!</p>
                <Link to="/plan-your-visit" className="inline-block w-full py-4 bg-blue-950 text-white font-bold rounded-xl hover:bg-blue-900 transition-all shadow-lg">
                  Plan Your Visit
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

import { FileText } from 'lucide-react';

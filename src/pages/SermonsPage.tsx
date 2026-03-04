import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Search, Filter, Calendar, User, BookOpen, Download, Share2 } from 'lucide-react';
import { MOCK_SERMONS } from '../mockData';
import { formatDate } from '../lib/utils';

export const SermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-blue-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold mb-6"
          >
            Sermons from FTI-Biao
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">Deepen your understanding of God's Word with our latest teachings from Biao, Davao City.</p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by title, speaker, or scripture..." 
              className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4">
          <button className="px-6 py-2 bg-blue-900 text-white rounded-full text-sm font-bold">All Messages</button>
          <button className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-bold transition-colors">Latest Series</button>
          <button className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-bold transition-colors">By Speaker</button>
          <button className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full text-sm font-bold transition-colors">By Topic</button>
          <div className="h-6 w-px bg-gray-200 mx-2 hidden md:block"></div>
          <button className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <Filter size={16} />
            More Filters
          </button>
        </div>
      </section>

      {/* Featured Sermon */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to={`/sermons/${MOCK_SERMONS[0].id}`} className="bg-blue-50 rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm group">
            <div className="lg:w-3/5 relative aspect-video overflow-hidden">
              <img src={MOCK_SERMONS[0].thumbnail} alt="Featured Sermon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-blue-950 shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="lg:w-2/5 p-10 flex flex-col justify-center">
              <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-4">Featured Message</span>
              <h2 className="font-serif text-3xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">{MOCK_SERMONS[0].title}</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <User size={18} className="text-blue-900" />
                  <span>{MOCK_SERMONS[0].speaker}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar size={18} className="text-blue-900" />
                  <span>{formatDate(MOCK_SERMONS[0].date)}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <BookOpen size={18} className="text-blue-900" />
                  <span>{MOCK_SERMONS[0].scripture}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all flex items-center gap-2">
                  <Play size={18} /> Watch Now
                </div>
                <div className="px-6 py-3 border border-blue-900 text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                  <Download size={18} /> Notes
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Sermon Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-serif text-2xl font-bold text-blue-900 mb-10">All Messages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_SERMONS.map((sermon) => (
              <Link 
                key={sermon.id}
                to={`/sermons/${sermon.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group block"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={48} className="text-white" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                    45:20
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">{sermon.series}</span>
                    <span className="text-xs text-gray-400">{formatDate(sermon.date)}</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">{sermon.title}</h4>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900">
                        <User size={14} />
                      </div>
                      <span className="text-sm font-medium text-gray-600">{sermon.speaker.split(' ').pop()}</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="p-2 text-gray-400 hover:text-blue-900 transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="p-2 text-gray-400 hover:text-blue-900 transition-colors">
                        <Share2 size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-16 flex justify-center gap-2">
            <button className="w-10 h-10 rounded-lg bg-blue-900 text-white font-bold shadow-lg">1</button>
            <button className="w-10 h-10 rounded-lg bg-white text-gray-600 font-bold hover:bg-gray-100 transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg bg-white text-gray-600 font-bold hover:bg-gray-100 transition-colors">3</button>
            <button className="px-4 h-10 rounded-lg bg-white text-gray-600 font-bold hover:bg-gray-100 transition-colors">Next</button>
          </div>
        </div>
      </section>
    </div>
  );
};

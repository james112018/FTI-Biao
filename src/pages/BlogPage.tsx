import React from 'react';
import { motion } from 'motion/react';
import { Search, ChevronRight, User, Calendar, Tag, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_POSTS } from '../mockData';
import { formatDate, cn } from '../lib/utils';

export const BlogPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('All Posts');

  const filteredPosts = activeCategory === 'All Posts' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === activeCategory);

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
            The Faith Tabernacle Blog
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-12">Devotionals, encouragement, church news, and biblical reflections.</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-4">
          {['All Posts', 'Devotionals', 'Church News', 'Announcements', 'Testimonies', 'Youth Corner', 'Missions'].map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-all",
                activeCategory === cat ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === 'All Posts' && filteredPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/blog/${filteredPosts[0].slug}`} className="group block">
              <div className="bg-gray-900 rounded-[3rem] overflow-hidden relative aspect-[21/9] flex items-center">
                <img 
                  src={filteredPosts[0].featured_image} 
                  alt={filteredPosts[0].title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 p-12 md:p-24 max-w-3xl text-white">
                  <span className="inline-block px-4 py-1 bg-yellow-500 text-blue-950 text-xs font-bold rounded-full uppercase tracking-widest mb-6">Featured Article</span>
                  <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight group-hover:text-yellow-500 transition-colors">{filteredPosts[0].title}</h2>
                  <p className="text-xl text-blue-100 opacity-90 mb-8 line-clamp-2">{filteredPosts[0].excerpt}</p>
                  <div className="flex items-center gap-6 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-yellow-500" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-yellow-500" />
                      <span>{formatDate(filteredPosts[0].created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {(activeCategory === 'All Posts' ? filteredPosts.slice(1) : filteredPosts).map((post) => (
              <motion.article 
                key={post.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="aspect-[16/10] overflow-hidden">
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </Link>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full">{post.category}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{formatDate(post.created_at)}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors leading-tight">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <User size={14} />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{post.author.split(' ').pop()}</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="text-blue-900 font-bold text-sm hover:text-yellow-600 flex items-center transition-colors">
                      Read More <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          
          {/* Load More */}
          <div className="mt-20 text-center">
            <button className="px-10 py-4 bg-white border-2 border-blue-900 text-blue-900 font-bold rounded-full hover:bg-blue-900 hover:text-white transition-all shadow-sm">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-yellow-500 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
            <Mail size={40} className="text-blue-950 -rotate-12" />
          </div>
          <h2 className="font-serif text-4xl font-bold mb-6">Never Miss a Word</h2>
          <p className="text-xl text-blue-100 opacity-80 mb-10">
            Join our mailing list to receive weekly devotionals, church news, and spiritual encouragement directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="text" 
              placeholder="First Name" 
              className="flex-1 px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <button className="px-10 py-5 bg-yellow-500 text-blue-950 font-bold rounded-2xl hover:bg-yellow-400 transition-all shadow-lg">
              Subscribe
            </button>
          </form>
          <p className="mt-6 text-xs text-blue-300">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
};

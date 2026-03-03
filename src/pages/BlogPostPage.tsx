import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Youtube, Instagram } from 'lucide-react';
import { MOCK_POSTS } from '../mockData';
import { formatDate } from '../lib/utils';
import { NotFoundPage } from './NotFoundPage';

export const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_POSTS.find(p => p.slug === slug);

  if (!post) return <NotFoundPage />;

  return (
    <div className="pt-20">
      {/* Hero / Header */}
      <section className="bg-blue-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1 bg-yellow-500 text-blue-950 text-xs font-bold uppercase rounded-full">
              {post.category}
            </span>
            <span className="text-blue-200 text-sm">{formatDate(post.created_at)}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-8">
            {post.title}
          </h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold">
                {post.author[0]}
              </div>
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-xs text-blue-300">Church Contributor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                <p className="text-xl font-medium text-gray-900 mb-8">{post.excerpt}</p>
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-6">{para}</p>
                ))}
                
                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 my-12">
                  <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4">Reflect & Pray</h3>
                  <p className="italic text-gray-700">
                    "As you read this, take a moment to ask God how this truth applies to your current season. May His peace which surpasses all understanding guard your heart and mind in Christ Jesus."
                  </p>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                
                <h3 className="font-serif text-3xl font-bold text-blue-900 mt-12 mb-6">Walking in Faith</h3>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              {/* Share */}
              <div className="pt-12 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">Share this post:</span>
                  <div className="flex gap-2">
                    <button className="p-3 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition-all">
                      <Facebook size={20} />
                    </button>
                    <button className="p-3 bg-blue-50 text-blue-900 rounded-xl hover:bg-blue-900 hover:text-white transition-all">
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Tag size={18} className="text-yellow-500" />
                  <span className="text-sm text-gray-500">Faith, Community, Growth</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* About Author */}
              <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                <h3 className="font-serif text-xl font-bold text-blue-900 mb-6">About the Author</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xl">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-blue-900">{post.author}</p>
                    <p className="text-xs text-gray-500">Ministry Leader</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {post.author} is a dedicated member of our church family, serving in various capacities to share the love of Christ.
                </p>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="font-serif text-xl font-bold text-blue-900 mb-6">Recent Posts</h3>
                <div className="space-y-6">
                  {MOCK_POSTS.filter(p => p.id !== post.id).slice(0, 3).map(p => (
                    <Link key={p.id} to={`/blog/${p.slug}`} className="group flex gap-4">
                      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden">
                        <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-blue-900 group-hover:text-yellow-600 transition-colors line-clamp-2">{p.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(p.created_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-8 bg-blue-900 rounded-3xl text-white">
                <h3 className="font-serif text-xl font-bold mb-4">Never Miss a Post</h3>
                <p className="text-sm text-blue-100 mb-6">Get our latest devotionals and updates delivered to your inbox.</p>
                <form className="space-y-4">
                  <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-blue-300" />
                  <button className="w-full py-3 bg-yellow-500 text-blue-950 font-bold rounded-xl hover:bg-yellow-400 transition-all">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

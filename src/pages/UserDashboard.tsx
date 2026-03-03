import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, Heart, Calendar, Play, BookOpen, Settings, 
  LogOut, ChevronRight, Bell, CreditCard, MessageSquare,
  Clock, MapPin, CheckCircle2
} from 'lucide-react';
import { MOCK_SERMONS, MOCK_EVENTS, MOCK_POSTS } from '../mockData';
import { formatDate } from '../lib/utils';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../lib/AuthContext';

export const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email || 'member@example.com';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: <User size={20} /> },
    { id: 'giving', name: 'My Giving', icon: <CreditCard size={20} /> },
    { id: 'events', name: 'Registered Events', icon: <Calendar size={20} /> },
    { id: 'sermons', name: 'Saved Sermons', icon: <Play size={20} /> },
    { id: 'messages', name: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 text-center">
              <div className="w-24 h-24 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold border-4 border-white shadow-md">
                {userEmail[0].toUpperCase()}
              </div>
              <h2 className="font-serif text-xl font-bold text-blue-900 mb-1">Welcome Back!</h2>
              <p className="text-xs text-gray-400 truncate mb-6">{userEmail}</p>
              <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Active Member
              </div>
            </div>

            <nav className="bg-white p-4 rounded-[2rem] shadow-sm border border-gray-100 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                    activeTab === item.id 
                      ? "bg-blue-900 text-white font-bold shadow-lg" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-900"
                  }`}
                >
                  <span className={activeTab === item.id ? "text-yellow-500" : ""}>{item.icon}</span>
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-50">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={20} />
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl font-bold text-blue-900">
                  {menuItems.find(i => i.id === activeTab)?.name}
                </h1>
                <p className="text-gray-500">Manage your connection with Faith Tabernacle.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 hover:text-blue-900 transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <Link to="/give" className="px-6 py-3 bg-yellow-500 text-blue-950 font-bold rounded-2xl hover:bg-yellow-400 transition-all shadow-md">
                  Give Online
                </Link>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {activeTab === 'overview' && (
                <>
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-4">
                        <Calendar size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Events</p>
                      <p className="text-2xl font-bold text-blue-900">{MOCK_EVENTS.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-yellow-50 text-yellow-700 rounded-2xl flex items-center justify-center mb-4">
                        <Heart size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Sermons</p>
                      <p className="text-2xl font-bold text-blue-900">{MOCK_SERMONS.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center mb-4">
                        <BookOpen size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Blog Posts</p>
                      <p className="text-2xl font-bold text-blue-900">{MOCK_POSTS.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-green-50 text-green-700 rounded-2xl flex items-center justify-center mb-4">
                        <CreditCard size={24} />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Total Giving</p>
                      <p className="text-2xl font-bold text-blue-900">$1,250.00</p>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-serif text-xl font-bold text-blue-900">Your Faith Journey</h3>
                      <span className="text-sm font-bold text-blue-600">Level 4 Member</span>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-500">Discipleship Progress</span>
                          <span className="font-bold text-blue-900">75%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-blue-900 rounded-full"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                        {[
                          { label: 'Foundation', completed: true },
                          { label: 'Baptism', completed: true },
                          { label: 'Membership', completed: true },
                          { label: 'Leadership', completed: false },
                        ].map((step, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                              <CheckCircle2 size={12} />
                            </div>
                            <span className={`text-xs font-bold ${step.completed ? 'text-blue-900' : 'text-gray-400'}`}>{step.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upcoming Events */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-serif text-xl font-bold text-blue-900">Your Next Events</h3>
                        <Link to="/events" className="text-xs font-bold text-blue-500 hover:underline">Browse All</Link>
                      </div>
                      <div className="space-y-6">
                        {MOCK_EVENTS.slice(0, 2).map((event) => (
                          <Link key={event.id} to={`/events/${event.id}`} className="flex gap-4 p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden">
                              <img src={event.featured_image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-bold text-blue-900 mb-1">{event.title}</h4>
                              <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(event.date)}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                              </div>
                            </div>
                            <div className="self-center p-2 text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight size={20} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Sermons */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                      <div className="flex items-center justify-between mb-8">
                        <h3 className="font-serif text-xl font-bold text-blue-900">Recommended for You</h3>
                        <Link to="/sermons" className="text-xs font-bold text-blue-500 hover:underline">View All</Link>
                      </div>
                      <div className="space-y-6">
                        {MOCK_SERMONS.slice(0, 2).map((sermon) => (
                          <Link key={sermon.id} to={`/sermons/${sermon.id}`} className="flex gap-4 p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden relative">
                              <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <Play size={12} fill="currentColor" className="text-white" />
                              </div>
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-sm font-bold text-blue-900 mb-1">{sermon.title}</h4>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{sermon.speaker}</p>
                            </div>
                            <div className="self-center p-2 text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                              <ChevronRight size={20} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-blue-900 rounded-[2.5rem] p-10 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-500">
                          <BookOpen size={24} />
                        </div>
                        <h4 className="font-serif text-xl font-bold">Daily Devotional</h4>
                        <p className="text-sm text-blue-100 opacity-70">Read today's scripture and reflection to start your day with God.</p>
                        <button className="text-sm font-bold text-yellow-500 hover:underline flex items-center gap-2">
                          Read Now <ChevronRight size={16} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-500">
                          <MessageSquare size={24} />
                        </div>
                        <h4 className="font-serif text-xl font-bold">Prayer Request</h4>
                        <p className="text-sm text-blue-100 opacity-70">How can we pray for you? Share your requests with our prayer team.</p>
                        <button className="text-sm font-bold text-yellow-500 hover:underline flex items-center gap-2">
                          Submit Request <ChevronRight size={16} />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-500">
                          <CheckCircle2 size={24} />
                        </div>
                        <h4 className="font-serif text-xl font-bold">Serve</h4>
                        <p className="text-sm text-blue-100 opacity-70">Discover volunteer opportunities and use your gifts to serve.</p>
                        <button className="text-sm font-bold text-yellow-500 hover:underline flex items-center gap-2">
                          Explore Roles <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'giving' && (
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-serif text-2xl font-bold text-blue-900">Giving History</h3>
                    <Link to="/give" className="px-6 py-2 bg-blue-900 text-white text-sm font-bold rounded-xl">New Gift</Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-4 font-bold text-sm text-gray-400">Date</th>
                          <th className="pb-4 font-bold text-sm text-gray-400">Amount</th>
                          <th className="pb-4 font-bold text-sm text-gray-400">Category</th>
                          <th className="pb-4 font-bold text-sm text-gray-400">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[
                          { date: 'Feb 15, 2024', amount: '$100.00', category: 'Tithes', status: 'Completed' },
                          { date: 'Feb 01, 2024', amount: '$100.00', category: 'Tithes', status: 'Completed' },
                          { date: 'Jan 15, 2024', amount: '$50.00', category: 'Missions', status: 'Completed' },
                        ].map((item, idx) => (
                          <tr key={idx}>
                            <td className="py-4 text-sm text-gray-600">{item.date}</td>
                            <td className="py-4 font-bold text-blue-900">{item.amount}</td>
                            <td className="py-4 text-sm text-gray-600">{item.category}</td>
                            <td className="py-4">
                              <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-md">{item.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'events' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_EVENTS.map((event) => (
                    <div key={event.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex gap-4">
                      <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden">
                        <img src={event.featured_image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-2">{event.title}</h4>
                        <p className="text-xs text-gray-500 mb-4">{formatDate(event.date)}</p>
                        <Link to={`/events/${event.id}`} className="text-xs font-bold text-blue-500 hover:underline">View Details</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'sermons' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {MOCK_SERMONS.map((sermon) => (
                    <div key={sermon.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group">
                      <div className="aspect-video relative overflow-hidden">
                        <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Play size={24} fill="currentColor" className="text-white" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-blue-900 mb-1 line-clamp-1">{sermon.title}</h4>
                        <p className="text-xs text-gray-400 mb-4">{sermon.speaker}</p>
                        <Link to={`/sermons/${sermon.id}`} className="text-xs font-bold text-blue-500 hover:underline">Watch Again</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'messages' && (
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <h3 className="font-serif text-2xl font-bold text-blue-900 mb-8">Messages</h3>
                  <div className="space-y-4">
                    {[
                      { id: 1, from: 'Pastor Samuel', subject: 'Welcome to the family!', date: '2024-03-01', read: false },
                      { id: 2, from: 'Church Office', subject: 'Upcoming Volunteer Opportunity', date: '2024-02-28', read: true },
                      { id: 3, from: 'Missions Team', subject: 'Thank you for your support', date: '2024-02-25', read: true },
                    ].map((msg) => (
                      <div key={msg.id} className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${msg.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100 shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${msg.read ? 'bg-transparent' : 'bg-blue-600'}`}></div>
                          <div>
                            <p className="text-sm font-bold text-blue-900">{msg.from}</p>
                            <p className="text-gray-600">{msg.subject}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{formatDate(msg.date)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <h3 className="font-serif text-2xl font-bold text-blue-900 mb-8">Account Settings</h3>
                  <form className="space-y-6 max-w-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">First Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" defaultValue="Faith" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" defaultValue="Member" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" defaultValue={userEmail} disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Phone Number</label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none" placeholder="+1 (555) 000-0000" />
                    </div>
                    <div className="pt-4">
                      <button type="button" className="px-8 py-4 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg">
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Removed the generic messages/settings block */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

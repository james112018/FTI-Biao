import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Users, Baby, Heart, Music, Globe, Shield, BookOpen, Users2, Home, Star, MessageSquare, Handshake, Clock } from 'lucide-react';
import { MOCK_MINISTRIES } from '../mockData';

export const MinistriesPage = () => {
  const allMinistries = [
    ...MOCK_MINISTRIES,
    { id: 3, name: "Women's Ministry", description: "Building sisters in faith through Bible study, mentorship, and community.", schedule: "Saturdays at 10:00 AM", leader: "Pastor Grace Mensah", icon: "Heart" },
    { id: 4, name: "Men's Fellowship", description: "Equipping men to lead with integrity through accountability and the Word.", schedule: "Saturdays at 7:00 AM", leader: "Elder Thomas Brown", icon: "Shield" },
    { id: 5, name: "Worship & Creative Arts", description: "Using God-given gifts to lead the congregation into His presence.", schedule: "Thursdays at 6:30 PM (Rehearsal)", leader: "Brother Isaac Newton", icon: "Music" },
    { id: 6, name: "Outreach & Missions", description: "Extending the love of Christ beyond our walls into the community and nations.", schedule: "Monthly Outreach Projects", leader: "Sister Sarah Jenkins", icon: "Globe" },
    { id: 7, name: "Prayer Ministry", description: "The engine room of the church, dedicated to interceding for the church and world.", schedule: "Daily at 5:00 AM (Online)", leader: "Sister Hannah Paul", icon: "Star" },
    { id: 8, name: "Marriage & Family", description: "Strengthening homes through biblical principles and supportive fellowship.", schedule: "Quarterly Workshops", leader: "The Adeyemis", icon: "Home" }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Baby': return <Baby size={32} />;
      case 'Users': return <Users size={32} />;
      case 'Heart': return <Heart size={32} />;
      case 'Shield': return <Shield size={32} />;
      case 'Music': return <Music size={32} />;
      case 'Globe': return <Globe size={32} />;
      case 'Star': return <Star size={32} />;
      case 'Home': return <Home size={32} />;
      default: return <Users size={32} />;
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-blue-900 py-24 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold mb-6"
          >
            Ministries at FTI-Biao
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">There is a place for everyone to grow, serve, and belong in our Biao, Davao City community. Find your place today.</p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allMinistries.map((ministry) => (
              <motion.div 
                key={ministry.id}
                whileHover={{ y: -5 }}
                className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 mb-8 group-hover:bg-yellow-500 group-hover:text-blue-950 transition-colors">
                  {getIcon(ministry.icon)}
                </div>
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4">{ministry.name}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">{ministry.description}</p>
                
                <div className="space-y-4 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Clock size={16} className="text-yellow-500" />
                    <span>{ministry.schedule}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Users2 size={16} className="text-yellow-500" />
                    <span>Leader: {ministry.leader}</span>
                  </div>
                </div>
                
                <Link to="/contact" className="mt-8 block w-full py-3 bg-blue-50 text-blue-900 text-center font-bold rounded-xl hover:bg-blue-900 hover:text-white transition-all">
                  Get Involved
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-12 shadow-sm border border-blue-100 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="font-serif text-4xl font-bold text-blue-900">Ready to Serve?</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                God has given each of us unique gifts to build His kingdom. Whether you're tech-savvy, love working with children, or have a heart for hospitality, there's a team waiting for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="px-8 py-4 bg-blue-900 text-white font-bold rounded-full hover:bg-blue-800 transition-all text-center">
                  Sign Up to Volunteer
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-transparent border-2 border-blue-900 text-blue-900 font-bold rounded-full hover:bg-blue-900 hover:text-white transition-all text-center">
                  Contact a Leader
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1559027615-cd2673675250?auto=format&fit=crop&q=80&w=400" alt="Serving" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden mt-8">
                <img src="https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=400" alt="Community" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

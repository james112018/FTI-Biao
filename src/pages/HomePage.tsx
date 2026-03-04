import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Play, Calendar, Users, Heart, ArrowRight, Quote, MapPin, Clock, ChevronRight, Mail, Send } from 'lucide-react';
import { MOCK_POSTS, MOCK_SERMONS, MOCK_EVENTS, MOCK_MINISTRIES, MOCK_TESTIMONIES } from '../mockData';
import { formatDate } from '../lib/utils';

export const HomePage = () => {
  const [newsletterStatus, setNewsletterStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('subject', 'Newsletter Subscription');
    
    try {
      const response = await fetch('https://formspree.io/f/xzdaebwk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setNewsletterStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Section 1 - Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1920" 
            alt="Worship Gathering" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            A Place Where <span className="text-yellow-500">Faith</span> Comes Alive
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-10 text-blue-50 max-w-3xl mx-auto leading-relaxed"
          >
            Join our vibrant community in Biao, Davao City. Rooted in love, Christ-centered worship, and the transforming power of God's Word, everyone is welcome at FTI-Biao Church.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/plan-your-visit" className="w-full sm:w-auto px-8 py-4 bg-yellow-500 text-blue-950 font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg">
              Plan Your Visit
            </Link>
            <Link to="/sermons/1" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Play size={18} fill="currentColor" />
              Watch Latest Sermon
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Section 2 - Welcome Message */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-blue-900">
                Welcome Home to FTI-Biao Church
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  At Faith Tabernacle Inc. Biao, we believe that church is more than a building. It is a family. For years, we have been a place in Davao City where people from every walk of life come together to encounter God, grow in faith, and serve one another with love.
                </p>
                <p>
                  Whether you have been walking with Christ for decades or you are just beginning to explore what faith means, there is a seat for you here. Come as you are. Leave transformed.
                </p>
              </div>
              <Link to="/about" className="inline-flex items-center text-blue-900 font-bold hover:text-yellow-600 transition-colors group">
                Learn More About Us <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <Quote className="text-yellow-500" size={32} />
                  <div>
                    <p className="italic text-gray-700 font-medium">"Our mission is to see every heart ignited with the love of Christ and every life fulfilling its divine purpose."</p>
                    <p className="mt-2 font-bold text-blue-900">— Pastor Samuel Adeyemi, Senior Pastor</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800" 
                  alt="Church Community" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-yellow-500 p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-blue-950 font-serif text-2xl font-bold">20+ Years</p>
                <p className="text-blue-900/80 text-sm font-medium">Serving the Biao Community</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 - Service Times and Location */}
      <section className="py-24 bg-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/5 rounded-full -ml-48 -mb-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">Join Us This Week</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Sunday Worship Service", time: "9:00 AM & 11:00 AM", note: "Children's church available during both services." },
              { title: "Wednesday Bible Study", time: "7:00 PM", note: "Midweek teaching and prayer for all ages." },
              { title: "Friday Prayer Meeting", time: "6:00 PM", note: "Corporate intercession and worship." }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 text-center"
              >
                <Clock className="mx-auto text-yellow-500 mb-6" size={32} />
                <h3 className="font-serif text-xl font-bold text-blue-900 mb-3">{service.title}</h3>
                <p className="text-2xl font-bold text-blue-800 mb-4">{service.time}</p>
                <p className="text-gray-500 text-sm">{service.note}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-yellow-500 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="font-serif text-2xl font-bold mb-2">Our Location</h4>
                <p className="text-blue-100 opacity-80">Biao, Davao City, Philippines</p>
                <Link to="/contact" className="inline-block mt-4 text-yellow-500 font-bold hover:underline">Get Directions</Link>
              </div>
            </div>
            <div className="h-px w-full md:w-px md:h-20 bg-blue-800"></div>
            <div className="text-center md:text-left">
              <h4 className="font-serif text-2xl font-bold mb-2">Can't Make It In Person?</h4>
              <p className="text-blue-100 opacity-80 mb-4">Join our vibrant online community via livestream.</p>
              <Link to="/sermons/1" className="px-6 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-blue-50 transition-colors">
                Join Us Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Upcoming Events */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">What's Happening</h2>
              <p className="text-gray-600">Discover opportunities to grow and serve at Faith Tabernacle.</p>
            </div>
            <Link to="/events" className="text-blue-900 font-bold hover:text-yellow-600 flex items-center">
              View All Events <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_EVENTS.filter(e => e.status === 'upcoming').slice(0, 3).map((event) => (
              <motion.div key={event.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-video overflow-hidden">
                  <img src={event.featured_image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-yellow-600 text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar size={14} />
                    {formatDate(event.date)} • {event.time}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">{event.description}</p>
                  <Link to={`/events/${event.id}`} className="w-full py-3 border border-blue-900 text-blue-900 font-bold rounded-lg hover:bg-blue-900 hover:text-white transition-all text-center block">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - Latest Sermons */}
      <section className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Recent Messages</h2>
            <p className="text-blue-200/70 max-w-2xl mx-auto">Missed a Sunday or want to revisit a message? Catch up on our latest teachings.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {MOCK_SERMONS.slice(0, 3).map((sermon) => (
              <Link key={sermon.id} to={`/sermons/${sermon.id}`} className="group cursor-pointer">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                  <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-blue-950">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-yellow-500 text-xs font-bold uppercase tracking-widest">
                    <span>{sermon.speaker}</span>
                    <span>•</span>
                    <span>{formatDate(sermon.date)}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold group-hover:text-yellow-500 transition-colors">{sermon.title}</h3>
                  <p className="text-blue-200/50 text-sm italic">{sermon.scripture}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/sermons" className="inline-flex items-center px-8 py-4 bg-white text-blue-950 font-bold rounded-full hover:bg-blue-50 transition-all">
              View All Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6 - Ministries Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">Get Connected</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">There is a place for everyone to grow, serve, and belong at Faith Tabernacle.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {MOCK_MINISTRIES.slice(0, 3).map((ministry) => (
              <div key={ministry.id} className="p-8 rounded-2xl border border-gray-100 hover:border-yellow-500 transition-colors group">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 mb-6 group-hover:bg-yellow-500 group-hover:text-blue-950 transition-colors">
                  <Users size={24} />
                </div>
                <h3 className="font-serif text-xl font-bold text-blue-900 mb-3">{ministry.name}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{ministry.description}</p>
                <Link to="/ministries" className="text-blue-900 font-bold text-sm hover:text-yellow-600 flex items-center">
                  Learn More <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/ministries" className="inline-flex items-center text-blue-900 font-bold hover:text-yellow-600">
              Explore All Ministries <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 7 - Online Giving */}
      <section className="py-24 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-blue-950">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Give Generously. Impact Eternally.</h2>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Your tithes and offerings fuel the mission of Faith Tabernacle. Every gift supports our worship, outreach, community programs, and the advancement of the Gospel. Giving is an act of worship, and we make it simple and secure.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/give" className="px-8 py-4 bg-blue-950 text-white font-bold rounded-full hover:bg-blue-900 transition-all shadow-lg">
                  Give Online Now
                </Link>
                <Link to="/give" className="px-8 py-4 bg-transparent border-2 border-blue-950 text-blue-950 font-bold rounded-full hover:bg-blue-950 hover:text-white transition-all">
                  Other Giving Options
                </Link>
              </div>
              <p className="mt-8 text-sm italic opacity-70">"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl border border-white/30 hidden lg:block">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Tithes", desc: "The first tenth of our income." },
                  { label: "Offerings", desc: "Gifts beyond the tithe." },
                  { label: "Missions", desc: "Supporting global outreach." },
                  { label: "Benevolence", desc: "Helping those in need." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm">
                    <h4 className="font-serif font-bold text-blue-900 mb-1">{item.label}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8 - Testimonies */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">Lives Changed</h2>
            <p className="text-gray-600">Real stories of God's grace from our church family.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_TESTIMONIES.map((testimony) => (
              <div key={testimony.id} className="bg-blue-50 p-10 rounded-3xl relative">
                <Quote className="absolute top-8 right-8 text-blue-100" size={64} />
                <p className="text-lg text-gray-700 italic mb-8 relative z-10 leading-relaxed">
                  "{testimony.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimony.image} alt={testimony.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="font-bold text-blue-900">{testimony.name}</p>
                    <p className="text-xs text-blue-700 uppercase tracking-widest font-bold">Member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9 - Blog Preview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">From the Blog</h2>
              <p className="text-gray-600">Encouragement and reflections for your walk with God.</p>
            </div>
            <Link to="/blog" className="text-blue-900 font-bold hover:text-yellow-600 flex items-center">
              Read All Posts <ChevronRight size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_POSTS.slice(0, 2).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row">
                <div className="md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">{post.category}</span>
                  <h3 className="font-serif text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-700 transition-colors">{post.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{formatDate(post.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10 - Newsletter */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-800 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-3xl font-bold mb-2">Stay Connected</h2>
              <p className="text-blue-100 opacity-80">Receive weekly devotionals and church updates in your inbox.</p>
            </div>
            {newsletterStatus === 'success' ? (
              <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 text-white font-bold">
                Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1">
                  <input 
                    name="email"
                    type="email" 
                    placeholder="Your Email Address" 
                    className="px-6 py-4 bg-white text-blue-900 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-80"
                    required
                  />
                  {newsletterStatus === 'error' && (
                    <p className="text-red-400 text-[10px] font-bold ml-4">Error. Try again.</p>
                  )}
                </div>
                <button 
                  disabled={newsletterStatus === 'submitting'}
                  className="px-8 py-4 bg-yellow-500 text-blue-950 font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg whitespace-nowrap disabled:opacity-50 h-fit"
                >
                  {newsletterStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

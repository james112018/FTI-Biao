import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ChevronRight, Filter, Grid, List as ListIcon } from 'lucide-react';
import { MOCK_EVENTS } from '../mockData';
import { formatDate, cn } from '../lib/utils';

export const EventsPage = () => {
  const [filter, setFilter] = React.useState<'upcoming' | 'past'>('upcoming');

  const filteredEvents = MOCK_EVENTS.filter(event => event.status === filter);

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
            Events at Faith Tabernacle
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">Join us for worship, fellowship, and community outreach.</p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFilter('upcoming')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-colors",
                filter === 'upcoming' ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter('past')}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-bold transition-colors",
                filter === 'past' ? "bg-blue-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Past Events
            </button>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-2 text-blue-900"><Grid size={20} /></button>
              <button className="p-2 hover:text-blue-900"><ListIcon size={20} /></button>
            </div>
            <button className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <Filter size={16} />
              Filter by Ministry
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <Link 
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={event.featured_image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl text-center shadow-lg">
                      <span className="block text-xs font-bold text-blue-900 uppercase tracking-widest">{new Date(event.date).toLocaleString('en-US', { month: 'short' })}</span>
                      <span className="block text-2xl font-serif font-bold text-blue-900 leading-none">{new Date(event.date).getDate()}</span>
                    </div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                    <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4 group-hover:text-blue-700 transition-colors">{event.title}</h3>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Clock size={16} className="text-yellow-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <MapPin size={16} className="text-yellow-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-8 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="text-blue-900 font-bold hover:text-yellow-600 flex items-center transition-colors">
                        Learn More <ChevronRight size={18} />
                      </div>
                      {filter === 'upcoming' && (
                        <div className="px-6 py-2 bg-blue-900 text-white text-xs font-bold rounded-full hover:bg-blue-800 transition-all">
                          Register
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <Calendar size={64} className="mx-auto text-gray-300 mb-6" />
              <h3 className="text-2xl font-bold text-blue-900 mb-2">No {filter} events found</h3>
              <p className="text-gray-500">Check back later for more updates.</p>
            </div>
          )}
        </div>
      </section>

      {/* Calendar View Placeholder */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-[3rem] p-12 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mt-32"></div>
            <div className="relative z-10">
              <h2 className="font-serif text-4xl font-bold mb-6">Church Calendar</h2>
              <p className="text-blue-100 opacity-80 max-w-2xl mx-auto mb-10 text-lg">
                Stay up to date with all our services, meetings, and special events. You can also sync our calendar with your personal device.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-yellow-500 text-blue-950 font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg">
                  View Full Calendar
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all">
                  Sync to My Device
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

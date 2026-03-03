import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Users, Share2, ArrowLeft, CheckCircle2, Info } from 'lucide-react';
import { MOCK_EVENTS } from '../mockData';
import { formatDate } from '../lib/utils';
import { NotFoundPage } from './NotFoundPage';

export const EventPage = () => {
  const { id } = useParams<{ id: string }>();
  const event = MOCK_EVENTS.find(e => e.id === Number(id));

  if (!event) return <NotFoundPage />;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={event.featured_image} alt={event.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link to="/events" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} />
            Back to Events
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1 bg-yellow-500 text-blue-950 text-xs font-bold uppercase rounded-full">
              Upcoming Event
            </span>
            <span className="text-blue-100 flex items-center gap-2 text-sm font-bold">
              <Calendar size={16} /> {formatDate(event.date)}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight max-w-4xl">
            {event.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed">
                <h3 className="font-serif text-3xl font-bold text-blue-900 mb-6">About the Event</h3>
                <p className="text-xl font-medium text-gray-900 mb-8">{event.description}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                
                <h4 className="font-serif text-2xl font-bold text-blue-900 mt-12 mb-6">What to Expect</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  {[
                    "Inspirational worship and prayer",
                    "Engaging speakers and workshops",
                    "Opportunities for fellowship",
                    "Resources for spiritual growth"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <CheckCircle2 className="text-yellow-500 shrink-0" size={20} />
                      <span className="text-sm font-medium text-blue-900">{item}</span>
                    </div>
                  ))}
                </div>

                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              {/* FAQ / Additional Info */}
              <div className="pt-12 border-t border-gray-100">
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-8 flex items-center gap-3">
                  <Info size={24} className="text-yellow-500" />
                  Important Information
                </h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-blue-900 mb-2">Is there childcare?</h4>
                    <p className="text-sm text-gray-600">Yes, childcare will be provided for children ages 0-10. Please indicate if you need childcare when you register.</p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-blue-900 mb-2">Is there a registration fee?</h4>
                    <p className="text-sm text-gray-600">This event is free to attend, but registration is required for planning purposes.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
              {/* Event Details Card */}
              <div className="p-8 bg-white rounded-3xl shadow-2xl border border-gray-100 sticky top-24">
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-8">Event Details</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <Calendar className="text-yellow-500 shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</p>
                      <p className="font-bold text-blue-900">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="text-yellow-500 shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time</p>
                      <p className="font-bold text-blue-900">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="text-yellow-500 shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</p>
                      <p className="font-bold text-blue-900">{event.location}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg mb-4">
                  Register for Event
                </button>
                <button className="w-full py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share Event
                </button>
                
                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xs text-gray-400 mb-4">Organized by</p>
                  <div className="flex items-center justify-center gap-2 text-blue-900 font-bold">
                    <Users size={18} />
                    <span>Church Leadership</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

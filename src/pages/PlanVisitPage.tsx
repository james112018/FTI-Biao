import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Users, Heart, CheckCircle2, Send } from 'lucide-react';

export const PlanVisitPage = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('subject', 'Plan Your Visit');
    
    try {
      const response = await fetch('https://formspree.io/f/xzdaebwk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1920" alt="Welcome" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold mb-6"
          >
            Plan Your Visit
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">We can't wait to welcome you to Faith Tabernacle. Here's everything you need to know for your first visit.</p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">What to Expect</h2>
            <p className="text-gray-600">We want your first experience to be comfortable and uplifting.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Heart className="text-yellow-500" />, title: "Warm Welcome", desc: "From the moment you walk in, you'll be greeted with a smile. Our hospitality team is here to help you find your way." },
              { icon: <Users className="text-yellow-500" />, title: "Come As You Are", desc: "There's no dress code here. Whether you prefer a suit or jeans, you'll fit right in. We care about you, not your clothes." },
              { icon: <Clock className="text-yellow-500" />, title: "Engaging Service", desc: "Our services last about 90 minutes and include vibrant worship, corporate prayer, and a practical, Bible-based message." }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {item.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-blue-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Times & Location */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-serif text-4xl font-bold text-blue-900">Service Times & Location</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="text-yellow-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-blue-900">Sundays</h4>
                    <p className="text-gray-600">9:00 AM & 11:00 AM Worship Services</p>
                    <p className="text-sm text-blue-700 font-medium mt-1">Children's Church available during both services.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-yellow-500 shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-blue-900">Location</h4>
                    <p className="text-gray-600">Biao, Community Center, City, State</p>
                    <a href="#" className="text-blue-900 font-bold hover:underline mt-2 inline-block">Open in Google Maps</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 h-96 overflow-hidden">
              {/* Placeholder for Map */}
              <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center text-blue-300">
                <MapPin size={48} className="mb-4" />
                <p className="font-bold">Interactive Map Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Form */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold mb-4">Let Us Know You're Coming</h2>
              <p className="text-blue-100 opacity-80">Fill out this quick form and we'll have a special welcome gift waiting for you!</p>
            </div>

            {formStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="mx-auto text-yellow-500 mb-6" size={64} />
                <h3 className="text-2xl font-bold mb-2">We're Excited to Meet You!</h3>
                <p className="text-blue-100">Thank you for letting us know. We'll see you this Sunday!</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-yellow-500 font-bold hover:underline"
                >
                  Send another notification
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-blue-200">Full Name</label>
                    <input name="name" required type="text" className="w-full px-6 py-4 bg-blue-800 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-blue-400" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-blue-200">Email Address</label>
                    <input name="email" required type="email" className="w-full px-6 py-4 bg-blue-800 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-blue-400" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-blue-200">Preferred Service</label>
                    <select name="service" className="w-full px-6 py-4 bg-blue-800 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white">
                      <option>Sunday 9:00 AM</option>
                      <option>Sunday 11:00 AM</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-blue-200">Number of People</label>
                    <input name="people_count" type="number" min="1" className="w-full px-6 py-4 bg-blue-800 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white" placeholder="1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-blue-200">Any Questions or Prayer Requests?</label>
                  <textarea name="message" rows={4} className="w-full px-6 py-4 bg-blue-800 border border-blue-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-blue-400" placeholder="How can we help you?"></textarea>
                </div>
                {formStatus === 'error' && (
                  <p className="text-red-400 text-sm font-bold">Something went wrong. Please try again.</p>
                )}
                <button 
                  disabled={formStatus === 'submitting'}
                  className="w-full py-5 bg-yellow-500 text-blue-950 font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === 'submitting' ? "Sending..." : (
                    <>
                      <Send size={20} />
                      Plan My Visit
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

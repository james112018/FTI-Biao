import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, Send, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export const ContactPage = () => {
  const [contactStatus, setContactStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [prayerStatus, setPrayerStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('submitting');
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('https://formspree.io/f/xzdaebwk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setContactStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setContactStatus('error');
      }
    } catch (error) {
      setContactStatus('error');
    }
  };

  const handlePrayerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrayerStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('subject', 'Prayer Request');
    
    try {
      const response = await fetch('https://formspree.io/f/xzdaebwk', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setPrayerStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setPrayerStatus('error');
      }
    } catch (error) {
      setPrayerStatus('error');
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
            Contact Us
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">We're here to listen, pray with you, and help you find your way at Faith Tabernacle.</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Contact Info */}
            <div className="space-y-12">
              <div>
                <h2 className="font-serif text-4xl font-bold text-blue-900 mb-6">Get in Touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  Whether you have a question about our services, want to join a ministry, or need prayer, our team is ready to connect with you.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Email</h4>
                      <p className="text-gray-600">info@faithtabernaclebiao.org</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Address</h4>
                      <p className="text-gray-600">Biao, Community Center, City, State</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Office Hours</h4>
                      <p className="text-gray-600">Mon-Fri: 9:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-12 border-t border-gray-100">
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="https://www.facebook.com/FTIBiaoChurch" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center hover:bg-yellow-500 transition-all shadow-lg">
                    <Facebook size={24} />
                  </a>
                  <a href="#" className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center hover:bg-yellow-500 transition-all shadow-lg">
                    <Youtube size={24} />
                  </a>
                  <a href="#" className="w-14 h-14 bg-blue-900 text-white rounded-2xl flex items-center justify-center hover:bg-yellow-500 transition-all shadow-lg">
                    <Instagram size={24} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100">
              <h3 className="font-serif text-2xl font-bold text-blue-900 mb-8">Send Us a Message</h3>
              {contactStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you shortly.</p>
                  <button 
                    onClick={() => setContactStatus('idle')}
                    className="mt-8 text-blue-900 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Full Name</label>
                      <input name="name" required type="text" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Email Address</label>
                      <input name="email" required type="email" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Subject</label>
                    <select name="subject" className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900">
                      <option>General Inquiry</option>
                      <option>Prayer Request</option>
                      <option>Membership</option>
                      <option>Volunteering</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Message</label>
                    <textarea name="message" required rows={6} className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="How can we help you?"></textarea>
                  </div>
                  {contactStatus === 'error' && (
                    <p className="text-red-500 text-sm font-bold">Something went wrong. Please try again.</p>
                  )}
                  <button 
                    disabled={contactStatus === 'submitting'}
                    className="w-full py-5 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send size={20} />
                    {contactStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageSquare className="mx-auto text-yellow-500 mb-8" size={64} />
          <h2 className="font-serif text-4xl font-bold text-blue-900 mb-6">Need Prayer?</h2>
          <p className="text-xl text-gray-600 mb-12">
            Our prayer team is dedicated to interceding for your needs. No request is too small or too large for God.
          </p>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-blue-100 text-left">
            {prayerStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="mx-auto text-yellow-500 mb-6" size={64} />
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Prayer Request Received</h3>
                <p className="text-gray-600">We are standing in faith with you. Our team will be praying.</p>
                <button 
                  onClick={() => setPrayerStatus('idle')}
                  className="mt-8 text-blue-900 font-bold hover:underline"
                >
                  Submit another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handlePrayerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input name="name" type="text" placeholder="Name (Optional)" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" />
                  <input name="email" type="email" placeholder="Email (Optional)" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900" />
                </div>
                <textarea name="message" required rows={4} placeholder="How can we pray for you?" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-900"></textarea>
                <div className="flex items-center gap-3">
                  <input name="share_with_team" type="checkbox" id="share" className="w-5 h-5 rounded border-gray-300 text-blue-900 focus:ring-blue-900" />
                  <label htmlFor="share" className="text-sm text-gray-600">Share this request with our corporate prayer team</label>
                </div>
                {prayerStatus === 'error' && (
                  <p className="text-red-500 text-sm font-bold">Something went wrong. Please try again.</p>
                )}
                <button 
                  disabled={prayerStatus === 'submitting'}
                  className="w-full py-5 bg-yellow-500 text-blue-950 font-bold rounded-xl hover:bg-yellow-400 transition-all shadow-lg disabled:opacity-50"
                >
                  {prayerStatus === 'submitting' ? 'Submitting...' : 'Submit Prayer Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

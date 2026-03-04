import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, MapPin, Phone, Mail, Facebook, Youtube, Instagram, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Give', path: '/give' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              isScrolled ? "bg-blue-900 text-white" : "bg-white text-blue-900"
            )}>
              <span className="font-serif font-bold text-xl">F</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-serif font-bold text-lg leading-tight",
                isScrolled ? "text-blue-900" : "text-white"
              )}>
                Faith Tabernacle
              </span>
              <span className={cn(
                "text-[10px] uppercase tracking-widest",
                isScrolled ? "text-blue-700" : "text-blue-100"
              )}>
                Inc. (Biao)
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-yellow-500",
                  location.pathname === link.path 
                    ? "text-yellow-500" 
                    : isScrolled ? "text-gray-700" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/plan-your-visit"
              className={cn(
                "px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105",
                isScrolled 
                  ? "bg-blue-900 text-white hover:bg-blue-800" 
                  : "bg-yellow-500 text-blue-900 hover:bg-yellow-400"
              )}
            >
              Plan Your Visit
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={isScrolled ? "text-blue-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-blue-900" : "text-white"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-900 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/plan-your-visit"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 bg-blue-900 text-white rounded-md font-bold"
              >
                Plan Your Visit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center">
                <span className="font-serif font-bold text-xl">F</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight">Faith Tabernacle</span>
                <span className="text-[10px] uppercase tracking-widest text-blue-200">Inc. (Biao)</span>
              </div>
            </Link>
            <p className="text-blue-100/70 text-sm leading-relaxed">
              "Rooted in Faith. Growing in Love. Reaching the World." We are a community dedicated to Christ-centered worship and transforming lives through God's Word.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/FTIBiaoChurch" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-500 transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-yellow-500">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Ministries', 'Sermons', 'Events', 'Blog', 'Give', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-sm text-blue-100/70 hover:text-white flex items-center group">
                    <ChevronRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-all -ml-4 group-hover:ml-0" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-yellow-500">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-yellow-500 shrink-0 mt-1" />
                <span className="text-sm text-blue-100/70">Biao, Davao City, Philippines</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-yellow-500 shrink-0" />
                <span className="text-sm text-blue-100/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-yellow-500 shrink-0" />
                <span className="text-sm text-blue-100/70">info@faithtabernaclebiao.org</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Times */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-6 text-yellow-500">Service Times</h3>
            <ul className="space-y-3">
              <li className="text-sm">
                <span className="block font-bold text-white">Sunday Worship</span>
                <span className="text-blue-100/70">9:00 AM & 11:00 AM</span>
              </li>
              <li className="text-sm">
                <span className="block font-bold text-white">Wednesday Bible Study</span>
                <span className="text-blue-100/70">7:00 PM</span>
              </li>
              <li className="text-sm">
                <span className="block font-bold text-white">Friday Prayer Meeting</span>
                <span className="text-blue-100/70">6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-blue-100/50">
            &copy; {new Date().getFullYear()} Faith Tabernacle Inc. (Biao). All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-blue-100/50 hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-blue-100/50 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

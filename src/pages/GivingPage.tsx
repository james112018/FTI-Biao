import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, ShieldCheck, CreditCard, Landmark, Smartphone, CheckCircle2, ArrowRight, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export const GivingPage = () => {
  const [amount, setAmount] = useState('50');
  const [isRecurring, setIsRecurring] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.currentTarget);
    formData.append('amount', amount);
    formData.append('frequency', isRecurring ? 'Monthly' : 'One-time');
    formData.append('subject', 'Giving Notification');
    
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
      <section className="bg-blue-900 py-24 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1920" alt="Giving" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold mb-6"
          >
            Give to Faith Tabernacle
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">"Each of you should give what you have decided in your heart to give... for God loves a cheerful giver." — 2 Corinthians 9:7</p>
        </div>
      </section>

      {/* Giving Form Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Content */}
            <div className="space-y-8">
              <h2 className="font-serif text-4xl font-bold text-blue-900">Why We Give</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                At Faith Tabernacle, we believe that giving is an act of worship and a way to express our gratitude to God for His provision. Your generosity enables us to reach the community, support missions, and maintain a spiritual home for all.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Heart className="text-yellow-500" />, title: "Tithes & Offerings", desc: "Supporting the day-to-day ministry and mission of our local church." },
                  { icon: <Globe className="text-yellow-500" />, title: "Missions Fund", desc: "Extending the Gospel to the ends of the earth through our partners." },
                  { icon: <ShieldCheck className="text-yellow-500" />, title: "Benevolence", desc: "Providing practical support for those in our community facing hardship." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-blue-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-4 text-gray-500">
                  <ShieldCheck className="text-green-500" />
                  <span className="text-sm">Your giving is secure and encrypted. We prioritize financial accountability and transparency.</span>
                </div>
              </div>
            </div>

            {/* Right: Payment Options */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12">
              <div className="mb-10">
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-2">Giving Options</h3>
                <p className="text-gray-500 text-sm">You can give through any of the following platforms.</p>
              </div>

              <div className="space-y-6">
                {/* GCash */}
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-lg">GCash</h4>
                    <p className="text-blue-700 font-mono text-xl font-bold">0912 345 6789</p>
                    <p className="text-xs text-gray-500 mt-1">Account Name: Faith Tabernacle Inc.</p>
                  </div>
                </div>

                {/* Bank Transfer */}
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center text-blue-950 shrink-0">
                    <Landmark size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-lg">Bank Transfer (BDO)</h4>
                    <p className="text-blue-900 font-mono text-xl font-bold">001234567890</p>
                    <p className="text-xs text-gray-500 mt-1">Account Name: Faith Tabernacle Inc.</p>
                  </div>
                </div>

                {/* PayMaya */}
                <div className="p-6 rounded-2xl bg-green-50 border border-green-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900 text-lg">Maya</h4>
                    <p className="text-green-700 font-mono text-xl font-bold">0912 345 6789</p>
                    <p className="text-xs text-gray-500 mt-1">Account Name: Faith Tabernacle Inc.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500 italic">
                  "Give, and it will be given to you. A good measure, pressed down, shaken together and running over, will be poured into your lap." — Luke 6:38
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Methods */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">Other Ways to Give</h2>
            <p className="text-gray-600">We offer several convenient ways to support the ministry.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <Landmark className="mx-auto text-yellow-500 mb-6" size={40} />
              <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4">Bank Transfer</h3>
              <p className="text-gray-600 text-sm mb-6">Direct deposit to our church account.</p>
              <div className="bg-gray-50 p-4 rounded-xl text-left space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Details</p>
                <p className="text-sm font-bold text-blue-900">Faith Tabernacle Inc.</p>
                <p className="text-sm text-gray-600">Bank: Global Trust Bank</p>
                <p className="text-sm text-gray-600">Acc: 1234567890</p>
              </div>
            </div>
            
            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <Smartphone className="mx-auto text-yellow-500 mb-6" size={40} />
              <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4">Mobile Money</h3>
              <p className="text-gray-600 text-sm mb-6">Quick giving via your mobile device.</p>
              <div className="bg-gray-50 p-4 rounded-xl text-left space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mobile Pay</p>
                <p className="text-sm font-bold text-blue-900">Code: *123*456#</p>
                <p className="text-sm text-gray-600">Merchant ID: 987654</p>
              </div>
            </div>

            <div className="bg-white p-10 rounded-3xl shadow-sm text-center">
              <Heart className="mx-auto text-yellow-500 mb-6" size={40} />
              <h3 className="font-serif text-2xl font-bold text-blue-900 mb-4">In-Person</h3>
              <p className="text-gray-600 text-sm mb-6">Giving during our weekly services.</p>
              <p className="text-sm leading-relaxed text-gray-500">
                You can give via cash or check during any of our worship services. Envelopes are available at the back of the sanctuary.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

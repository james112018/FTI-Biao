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

            {/* Right: Giving Form */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 p-8 md:p-12">
              <div className="mb-10">
                <h3 className="font-serif text-2xl font-bold text-blue-900 mb-2">Online Giving</h3>
                <p className="text-gray-500 text-sm">Select an amount and fund category below.</p>
              </div>

              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
                  <h3 className="text-2xl font-bold text-blue-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your giving notification has been sent. We appreciate your generosity!</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 text-blue-900 font-bold hover:underline"
                  >
                    Give again
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Amount Selection */}
                  <div className="grid grid-cols-3 gap-4">
                    {['25', '50', '100', '250', '500', 'Other'].map((amt) => (
                      <button 
                        type="button"
                        key={amt}
                        onClick={() => amt !== 'Other' && setAmount(amt)}
                        className={cn(
                          "py-4 rounded-2xl font-bold text-lg transition-all border-2",
                          amount === amt 
                            ? "bg-blue-900 border-blue-900 text-white shadow-lg" 
                            : "bg-white border-gray-100 text-gray-600 hover:border-blue-900"
                        )}
                      >
                        {amt === 'Other' ? amt : `$${amt}`}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  {amount === 'Other' && (
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                      <input 
                        name="custom_amount"
                        type="number" 
                        className="w-full pl-12 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-bold text-xl"
                        placeholder="Enter amount"
                        autoFocus
                        required
                      />
                    </div>
                  )}

                  {/* Fund Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Select Fund</label>
                    <select name="fund" className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium text-gray-700">
                      <option>Tithes & Offerings</option>
                      <option>Missions Fund</option>
                      <option>Building Fund</option>
                      <option>Benevolence</option>
                      <option>Special Project</option>
                    </select>
                  </div>

                  {/* Frequency */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                    <button 
                      type="button"
                      onClick={() => setIsRecurring(false)}
                      className={cn(
                        "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                        !isRecurring ? "bg-white text-blue-900 shadow-sm" : "text-gray-500"
                      )}
                    >
                      One-time
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsRecurring(true)}
                      className={cn(
                        "flex-1 py-3 rounded-xl text-sm font-bold transition-all",
                        isRecurring ? "bg-white text-blue-900 shadow-sm" : "text-gray-500"
                      )}
                    >
                      Monthly
                    </button>
                  </div>

                  {formStatus === 'error' && (
                    <p className="text-red-500 text-sm font-bold">Something went wrong. Please try again.</p>
                  )}

                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-6 bg-yellow-500 text-blue-950 font-bold rounded-2xl hover:bg-yellow-400 transition-all shadow-xl text-xl disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Processing...' : `Give $${amount === 'Other' ? '...' : amount} Now`}
                  </button>

                  <div className="flex justify-center items-center gap-6 pt-4">
                    <CreditCard size={24} className="text-gray-300" />
                    <Landmark size={24} className="text-gray-300" />
                    <Smartphone size={24} className="text-gray-300" />
                  </div>
                </form>
              )}
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

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Target, Eye, Users, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  const leaders = [
    { name: "Pastor Samuel Adeyemi", title: "Senior Pastor", bio: "Pastor Samuel has led Faith Tabernacle for over 15 years with a heart for community transformation and spiritual growth.", scripture: "Philippians 4:13", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
    { name: "Pastor Grace Mensah", title: "Associate Pastor", bio: "Pastor Grace oversees our education and discipleship programs, ensuring every member grows in the knowledge of Christ.", scripture: "Psalm 23:1", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400" },
    { name: "Brother David Smith", title: "Youth Leader", bio: "David is passionate about empowering the next generation to lead with integrity and faith.", scripture: "1 Timothy 4:12", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" }
  ];

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
            About FTI-Biao Church
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">Discover our story, our mission, and the hearts behind our community in Biao, Davao City.</p>
        </div>
      </section>

      {/* History */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-serif text-4xl font-bold text-blue-900">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2004, Faith Tabernacle Inc. (Biao) began as a small gathering of believers in a living room, driven by a shared vision to see God's love transform our community. What started with just twelve people has grown into a vibrant spiritual home for hundreds.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Over the years, we have witnessed countless lives restored, families strengthened, and a community impacted by the Gospel. Our journey is a testament to God's faithfulness and the power of a community united in purpose.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800" alt="Church History" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-blue-100">
              <Target className="text-yellow-500 mb-6" size={48} />
              <h3 className="font-serif text-3xl font-bold text-blue-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To glorify God by making disciples of all nations through worship, the Word, fellowship, and service. We exist to be the hands and feet of Jesus in our world today.
              </p>
            </div>
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-blue-100">
              <Eye className="text-yellow-500 mb-6" size={48} />
              <h3 className="font-serif text-3xl font-bold text-blue-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be a thriving, Spirit-led community where every person encounters the love of Christ and is equipped to fulfill their God-given purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-blue-900 mb-16">What We Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { title: "The Authority of Scripture", desc: "We believe the Bible is the inspired, infallible Word of God and our final authority in all matters of faith and conduct.", ref: "2 Timothy 3:16" },
              { title: "Salvation Through Christ", desc: "We believe that salvation is a gift from God, received through faith in Jesus Christ and His finished work on the cross.", ref: "Ephesians 2:8-9" },
              { title: "The Holy Spirit", desc: "We believe in the present-day ministry of the Holy Spirit, who empowers believers for godly living and effective service.", ref: "Acts 1:8" },
              { title: "The Church", desc: "We believe the Church is the body of Christ, called to continue His mission on earth through worship and witness.", ref: "Matthew 28:19-20" },
              { title: "Baptism & Communion", desc: "We practice water baptism by immersion and regular observance of the Lord's Supper as acts of obedience and remembrance.", ref: "Matthew 28:19, 1 Cor 11:23-26" },
              { title: "The Second Coming", desc: "We believe in the personal, visible return of Jesus Christ to judge the living and the dead and establish His eternal kingdom.", ref: "Revelation 21:1-4" }
            ].map((belief, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-gray-50 border border-gray-100">
                <h4 className="font-bold text-blue-900 mb-3">{belief.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{belief.desc}</p>
                <p className="text-yellow-600 text-xs font-bold italic">{belief.ref}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-blue-900 mb-4">Our Leadership</h2>
            <p className="text-gray-600">Meet the team dedicated to serving our church family.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {leaders.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-square overflow-hidden">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8">
                  <h4 className="font-serif text-2xl font-bold text-blue-900 mb-1">{leader.name}</h4>
                  <p className="text-yellow-600 font-bold text-sm uppercase tracking-widest mb-4">{leader.title}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{leader.bio}</p>
                  <p className="text-blue-900 font-bold italic text-xs">Favorite Scripture: {leader.scripture}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold mb-6">We Would Love to Meet You</h2>
          <p className="text-xl text-blue-100 mb-10">Whether you're visiting for the first time or looking for a home, there's a place for you here.</p>
          <Link to="/plan-your-visit" className="inline-flex items-center px-8 py-4 bg-yellow-500 text-blue-950 font-bold rounded-full hover:bg-yellow-400 transition-all shadow-lg">
            Plan Your Visit <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

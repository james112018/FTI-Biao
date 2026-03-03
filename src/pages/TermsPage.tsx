import React from 'react';
import { motion } from 'motion/react';

export const TermsPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-blue-900 mb-12"
          >
            Terms of Service
          </motion.h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
            <p className="text-lg">
              Welcome to the website of Faith Tabernacle Inc. (Biao). By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By using this website, you signify your acceptance of these Terms of Service. If you do not agree to these terms, please do not use our site. We reserve the right to modify these terms at any time, and your continued use of the site following any changes will signify your acceptance of those changes.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. Use of Content</h2>
              <p>
                All content on this website, including text, graphics, logos, images, audio clips, and video, is the property of Faith Tabernacle Inc. (Biao) or its content suppliers and is protected by international copyright laws. You may use the content for personal, non-commercial purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">3. Online Giving</h2>
              <p>
                When you make a donation through our website, you agree to provide accurate and complete information. All donations are final and non-refundable, except in cases of documented error. We use secure third-party payment processors and do not store your full credit card information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">4. User Conduct</h2>
              <p>
                You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">5. Limitation of Liability</h2>
              <p>
                Faith Tabernacle Inc. (Biao) will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">6. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the church is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            <div className="pt-12 border-t border-gray-100">
              <p className="text-sm italic">Last Updated: March 1, 2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

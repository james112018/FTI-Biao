import React from 'react';
import { motion } from 'motion/react';

export const PrivacyPage = () => {
  return (
    <div className="pt-20">
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-blue-900 mb-12"
          >
            Privacy Policy
          </motion.h1>
          
          <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
            <p className="text-lg">
              At Faith Tabernacle Inc. (Biao), we are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and safeguard your data.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">1. Information We Collect</h2>
              <p>We may collect personal information from you when you interact with our website, including but not limited to:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Name, email address, and phone number when you fill out contact or visitor forms.</li>
                <li>Financial information when you make an online donation (processed securely via third-party providers).</li>
                <li>Information about your interests and ministry involvement.</li>
                <li>Technical data such as IP address and browsing behavior via cookies.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>To respond to your inquiries and prayer requests.</li>
                <li>To process and acknowledge your donations.</li>
                <li>To send you church updates, devotionals, and event information (if you have opted in).</li>
                <li>To improve our website and user experience.</li>
                <li>To comply with legal and regulatory requirements.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">3. Data Security</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your personal data is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">4. Third-Party Disclosure</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our ministry, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information at any time. If you wish to exercise these rights or have any questions about our privacy practices, please contact us at info@faithtabernaclebiao.org.
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

import React from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Pages.module.css';

const TermsAndConditions = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <FileText size={24} />,
      title: "Acceptance of Terms",
      content: "By accessing and using the Atharaman website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: <Users size={24} />,
      title: "User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password. You must notify us immediately of any unauthorized use of your account."
    },
    {
      icon: <Globe size={24} />,
      title: "Service Availability",
      content: "We strive to provide uninterrupted access to our services, but we cannot guarantee 100% uptime. We reserve the right to modify, suspend, or discontinue any part of our service at any time without prior notice."
    },
    {
      icon: <Scale size={24} />,
      title: "Booking and Cancellation",
      content: "All bookings are subject to availability and confirmation. Cancellation policies vary by service provider and will be clearly stated at the time of booking. Refunds, if applicable, will be processed according to the specific terms of each booking."
    },
    {
      icon: <AlertTriangle size={24} />,
      title: "Limitation of Liability",
      content: "Atharaman shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of our services."
    }
  ];

  return (
    <div className={`min-h-dvh bg-gradient-to-br from-gray-50 to-purple-50/30 ${styles.pageContainer}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors ${styles.animateSlideInLeft}`}
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`text-center mb-12 ${styles.animateFadeInUp}`}>
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-purple-100/80 rounded-full">
              <FileText size={32} className="text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our services.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: January 15, 2024
          </div>
        </div>

        {/* Introduction */}
        <div className={`bg-white rounded-xl shadow-md p-8 mb-8 ${styles.animateSlideInUp}`}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to Atharaman</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            These Terms and Conditions ("Terms", "Terms and Conditions") govern your relationship with the Atharaman 
            website and services operated by Atharaman ("us", "we", or "our").
          </p>
          <p className="text-gray-600 leading-relaxed">
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. 
            These Terms apply to all visitors, users and others who access or use the Service.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-md p-8 ${styles.animateSlideInUp}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2 bg-purple-100/80 rounded-lg">
                  <div className="text-purple-600">
                    {section.icon}
                  </div>
                </div>
                <div className="grow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Terms */}
        <div className={`bg-white rounded-xl shadow-md p-8 mt-8 ${styles.animateSlideInUp}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Important Terms</h3>
          <div className="space-y-4 text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Intellectual Property</h4>
              <p>All content, features, and functionality of our service are owned by Atharaman and are protected by international copyright, trademark, and other intellectual property laws.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Prohibited Uses</h4>
              <p>You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, or laws.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Termination</h4>
              <p>We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className={`bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg p-8 mt-12 text-white ${styles.animateFadeInUp}`}>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Questions About These Terms?</h3>
            <p className="text-purple-100/90 mb-6">
              If you have any questions about these Terms and Conditions, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:legal@atharaman.com"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Email Legal Team
              </a>
              <a
                href="tel:+1-555-123-4567"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                Call Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
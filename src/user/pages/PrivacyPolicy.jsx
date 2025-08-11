import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: <Database className="size-6" />,
      title: "Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support. This includes your name, email address, phone number, and travel preferences."
    },
    {
      icon: <Eye className="size-6" />,
      title: "How We Use Your Information",
      content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers."
    },
    {
      icon: <Shield className="size-6" />,
      title: "Information Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption and security protocols."
    },
    {
      icon: <Users className="size-6" />,
      title: "Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share information with trusted partners who assist us in operating our website and serving you."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors animate-fade-in"
            aria-label="Back to home"
          >
            <ArrowLeft className="size-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-fade-in [animation-delay:100ms]">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Shield className="size-8 text-orange-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8 animate-fade-in [animation-delay:200ms]">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            At Atharaman, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our 
            website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of 
            this privacy policy, please do not access the site.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8 animate-fade-in"
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-orange-100 rounded-lg">
                  <div className="text-orange-600">
                    {section.icon}
                  </div>
                </div>
                <div className="flex-1">
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

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-8 mt-12 text-white animate-fade-in [animation-delay:700ms]">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Questions About Our Privacy Policy?</h3>
            <p className="text-orange-100 mb-6">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:privacy@atharaman.com"
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                aria-label="Email us about privacy policy"
              >
                Email Us
              </a>
              <a
                href="tel:+1-555-123-4567"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                aria-label="Call us about privacy policy"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
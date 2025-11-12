// app/contact/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/component/Header';
import { Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle, FileText, CheckCircle } from 'lucide-react';

export default function ContactSupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 pt-30 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Contact & Support</h1>
            <p className="text-xl text-red-100">We're here to help! Get in touch with our team</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Info */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Email</div>
                    <a href="mailto:support@expobook.com" className="text-gray-600 hover:text-red-600 transition-colors text-lg">
                      support@expobook.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Phone</div>
                    <a href="tel:+66123456789" className="text-gray-600 hover:text-red-600 transition-colors text-lg">
                      +66 (0) 12-345-6789
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Office</div>
                    <p className="text-gray-600 text-lg">
                      123 Exhibition Street<br />
                      Bangkok 10110, Thailand
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Business Hours</div>
                    <p className="text-gray-600 text-lg">
                      Mon - Fri: 9:00 AM - 6:00 PM<br />
                      Sat - Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Help Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Need Quick Help?</h3>
              <div className="space-y-3">
                <Link href="/demo" className="flex items-center space-x-3 text-blue-700 hover:text-blue-900 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Link>
              </div>
            </div>

            {/* Response Time Card */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-bold text-green-900">Fast Response</h3>
              </div>
              <p className="text-sm text-green-700">
                We typically respond within 24 hours on business days
              </p>
            </div>
          </div>

          {/* Right Side - Support Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-600 mb-8">Choose the best way to reach us based on your needs</p>

              <div className="space-y-6">
                {/* Email Support */}
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">Email Support</h4>
                      <p className="text-gray-600 mb-3">Best for detailed inquiries and documentation</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Response time: 24-48 hours</span>
                        <a
                          href="mailto:support@expobook.com"
                          className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-all"
                        >
                          Send Email
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone Support */}
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-red-500 transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">Phone Support</h4>
                      <p className="text-gray-600 mb-3">For urgent matters and immediate assistance</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Mon-Fri, 9:00 AM - 6:00 PM</span>
                        <a
                          href="tel:+66123456789"
                          className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-all"
                        >
                          Call Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Chat */}
                <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-7 h-7 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-lg mb-2">Live Chat</h4>
                      <p className="text-gray-600 mb-3">Real-time chat with our support team</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Coming soon</span>
                        <button
                          disabled
                          className="bg-gray-400 text-white px-6 py-2 rounded-full text-sm font-medium cursor-not-allowed"
                        >
                          Not Available
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-15">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-red-100 mb-8">Explore our exhibition booths and start booking today</p>
          <div className="flex justify-center space-x-4">
            <Link href="/user/exhibition" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Browse Exhibitions
            </Link>
            <Link href="/" className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
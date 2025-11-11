'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, Mail, Phone, Shield, ArrowLeft } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  tel: string;
  role: string;
  createdAt: string;
}

interface ViewProfileProps {
  user: UserProfile;
}

export default function ViewProfile({ user }: ViewProfileProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-5">
        <div className="flex justify-between max-w-4xl mx-auto px-6">
          <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-red-100 mb-2">View your personal information</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-red-100 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - User Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-gray-500">Role</div>
                    <div className="font-medium text-gray-900 capitalize">
                      {user.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="text-gray-500">Member Since</div>
                    <div className="font-medium text-gray-900">
                      {formatDate(user.createdAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Info Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={user.tel}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-1">Security Tip</h4>
                <p className="text-sm text-blue-700">
                  Protect your account by keeping your credentials private.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold text-green-900 mb-1">
                  Stay Updated
                </h4>
                <p className="text-sm text-green-700">
                  Make sure your contact info is always accurate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

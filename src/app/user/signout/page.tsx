// app/signout/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  const router = useRouter();

  const handleSignOut = () => {
  console.log('User signed out');

  signOut({ redirect: true,
      callbackUrl: "/",
  });

    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="text-center lg:text-left">
          <Link href="/" className="inline-block">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl">
                <Calendar className="w-20 h-20 text-white" />
              </div>
            </div>
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">See You Soon!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for using ExpoBook. We hope to see you again soon for your next exhibition booking.
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Before you go:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Your bookings are saved securely
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                You can log back in anytime
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Check your email for updates
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Contact support if you need help
              </li>
            </ul>
          </div>
          <div className="flex justify-center lg:justify-start space-x-2 mt-8">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Out</h2>
            <p className="text-gray-600">Are you sure you want to sign out?</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full bg-red-600 text-white py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>

            <Link
              href="/"
              className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-full text-lg font-medium hover:border-red-600 hover:text-red-600 transition-all flex items-center justify-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
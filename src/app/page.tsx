import React from 'react';
import Link from 'next/link';
import { MapPin, Users, TrendingUp } from 'lucide-react';
import Header from '../component/Header';
import FeatureSection from '@/component/FeatureSection';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function HomePage() {

  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Header />
      
      {/* main Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12">
          <div>
            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🎉 Book Your Exhibition Space Today
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Seamless Booth Booking for Your Next
              <span className="text-red-600"> Exhibition</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover, compare, and book exhibition booths worldwide. Streamline your event planning with real-time availability, instant confirmations, and comprehensive venue details.
            </p>
            <div className="flex items-center space-x-4">
              {
                session ? 
                <Link href="/user/exhibition" className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl">
                Start Booking Now
                </Link> : <Link href="/user/signup" className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl">
                Start Booking Now
                </Link>
              }
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-red-600 hover:text-red-600 transition-all">
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex items-center space-x-8">
              <div>
                <div className="text-3xl font-bold text-gray-900">5000+</div>
                <div className="text-gray-600">Exhibition Spaces</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">150+</div>
                <div className="text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">98%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-3xl shadow-2xl p-12 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-8 transform -rotate-3">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <FeatureSection />

      {/* CTA Section */}
      {
        session ? <div className="bg-gradient-to-r from-red-600 to-red-700 py-10"><div className="max-w-4xl mx-auto px-6 text-center">
          <p className="m-5 text-white">By Will and Drew</p></div>
        </div> : <div className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Book Your Exhibition Booth?</h2>
          <p className="text-xl text-red-100 mb-8">Join thousands of exhibitors who trust ExpoBook for their event needs</p>
          <Link href="/user/signup" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
            Get Started for Free
          </Link>
          <p className="m-5">By Will and Drew</p>
          </div>
        </div>
      }
      </div>
  );
}
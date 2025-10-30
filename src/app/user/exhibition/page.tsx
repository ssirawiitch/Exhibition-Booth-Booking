// app/exhibitions/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/component/Header';
import Card from '@/component/Card';

// Updated mock data matching the new schema
const availableBooths = [
  {
    id: 1,
    name: "Tech Summit 2025",
    description: "The largest technology exhibition in Southeast Asia featuring AI, IoT, and emerging technologies.",
    venue: "Bangkok International Trade Center",
    startDate: "2025-03-15",
    durationDay: 4,
    smallBoothQuota: 12,
    bigBoothQuota: 8,
    posterPicture: "https://example.com/poster1.jpg",
    image: "🏢",
    type: "Technology"
  },
  {
    id: 2,
    name: "Food & Beverage Expo",
    description: "Discover the latest trends in food and beverage industry with world-class exhibitors.",
    venue: "Queen Sirikit National Convention Center",
    startDate: "2025-04-05",
    durationDay: 4,
    smallBoothQuota: 10,
    bigBoothQuota: 5,
    posterPicture: "https://example.com/poster2.jpg",
    image: "🍽️",
    type: "Food & Beverage"
  },
  {
    id: 3,
    name: "International Auto Show",
    description: "Experience the future of automotive with electric vehicles and autonomous driving technology.",
    venue: "Impact Exhibition Center",
    startDate: "2025-05-20",
    durationDay: 6,
    smallBoothQuota: 5,
    bigBoothQuota: 5,
    posterPicture: "https://example.com/poster3.jpg",
    image: "🚗",
    type: "Automotive"
  },
  {
    id: 4,
    name: "Fashion Week Asia",
    description: "Showcase your brand at Asia's premier fashion event with designers from around the world.",
    venue: "Central World Convention Hall",
    startDate: "2025-06-10",
    durationDay: 6,
    smallBoothQuota: 15,
    bigBoothQuota: 10,
    posterPicture: "https://example.com/poster4.jpg",
    image: "👗",
    type: "Fashion"
  },
  {
    id: 5,
    name: "Healthcare Innovation Summit",
    description: "Explore cutting-edge medical technology and healthcare solutions for the future.",
    venue: "Bangkok Convention Center",
    startDate: "2025-07-08",
    durationDay: 5,
    smallBoothQuota: 8,
    bigBoothQuota: 10,
    posterPicture: "https://example.com/poster5.jpg",
    image: "⚕️",
    type: "Healthcare"
  },
  {
    id: 6,
    name: "Education & Training Expo",
    description: "Connect with educational institutions and training providers from around the globe.",
    venue: "Bitec Exhibition Center",
    startDate: "2025-08-22",
    durationDay: 4,
    smallBoothQuota: 20,
    bigBoothQuota: 10,
    posterPicture: "https://example.com/poster6.jpg",
    image: "📚",
    type: "Education"
  }
];

export default function ExhibitionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Technology', 'Food & Beverage', 'Automotive', 'Fashion', 'Healthcare', 'Education'];

  const filteredBooths = availableBooths.filter(booth => {
    const matchesSearch = booth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booth.venue.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || booth.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalSmallBooths = availableBooths.reduce((sum, booth) => sum + booth.smallBoothQuota, 0);
  const totalBigBooths = availableBooths.reduce((sum, booth) => sum + booth.bigBoothQuota, 0);
  const totalBooths = totalSmallBooths + totalBigBooths;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-5 pt-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Available Exhibition Booths</h1>
            <p className="text-xl text-red-100 mb-8">Find the perfect booth for your next exhibition</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-3xl font-bold text-gray-900">{availableBooths.length}</div>
            <div className="text-gray-600">Available Events</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-2">📍</div>
            <div className="text-3xl font-bold text-gray-900">6</div>
            <div className="text-gray-600">Locations</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-2">🎫</div>
            <div className="text-3xl font-bold text-gray-900">{totalBooths}</div>
            <div className="text-gray-600">Total Booths</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-gray-900">4.7</div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Booths Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {filteredBooths.length} Exhibition{filteredBooths.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-gray-600">Browse and book your perfect exhibition booth</p>
        </div>

        {filteredBooths.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No exhibitions found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooths.map((booth) => (
              <div key={booth.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                {/* Card Header */}
                <div className="bg-gradient-to-br from-red-500 to-red-700 p-8 text-center">
                  <div className="text-6xl mb-2">{booth.image}</div>
                  <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-medium">
                    {booth.type}
                  </div>
                </div>

                {/* Card Body - Using Updated Card Component */}
                <Card
                  id={booth.id}
                  name={booth.name}
                  description={booth.description}
                  venue={booth.venue}
                  startDate={booth.startDate}
                  durationDay={booth.durationDay}
                  smallBoothQuota={booth.smallBoothQuota}
                  bigBoothQuota={booth.bigBoothQuota}
                  posterPicture={booth.posterPicture}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-red-100 mb-8">Contact our team to discuss custom exhibition solutions</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
              Contact Support
            </a>
            <Link href="/" className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
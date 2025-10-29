'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin , Square, Star } from 'lucide-react';
import Header from '@/component/Header';

// Mock data for available booths
const availableBooths = [
  {
    id: 1,
    name: "Tech Summit 2025",
    location: "Bangkok International Trade Center",
    date: "March 15-18, 2025",  
    price: 5000,
    size: "3x3m",
    available: 12,
    total: 20,
    rating: 4.8,
    image: "🏢",
    type: "Technology"
  },
  {
    id: 2,
    name: "Food & Beverage Expo",
    location: "Queen Sirikit National Convention Center",
    date: "April 5-8, 2025",
    price: 3500,
    size: "2x3m",
    available: 8,
    total: 15,
    rating: 4.6,
    image: "🍽️",
    type: "Food & Beverage"
  },
  {
    id: 3,
    name: "International Auto Show",
    location: "Impact Exhibition Center",
    date: "May 20-25, 2025",
    price: 8000,
    size: "5x5m",
    available: 5,
    total: 10,
    rating: 4.9,
    image: "🚗",
    type: "Automotive"
  },
  {
    id: 4,
    name: "Fashion Week Asia",
    location: "Central World Convention Hall",
    date: "June 10-15, 2025",
    price: 6500,
    size: "4x4m",
    available: 15,
    total: 25,
    rating: 4.7,
    image: "👗",
    type: "Fashion"
  },
  {
    id: 5,
    name: "Healthcare Innovation Summit",
    location: "Bangkok Convention Center",
    date: "July 8-12, 2025",
    price: 7000,
    size: "3x4m",
    available: 10,
    total: 18,
    rating: 4.8,
    image: "⚕️",
    type: "Healthcare"
  },
  {
    id: 6,
    name: "Education & Training Expo",
    location: "Bitec Exhibition Center",
    date: "August 22-25, 2025",
    price: 4000,
    size: "3x3m",
    available: 20,
    total: 30,
    rating: 4.5,
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
                         booth.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || booth.type === selectedType;
    return matchesSearch && matchesType;
  });

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
            
            {/* Search and Filter */}
            {/* <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-8 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900"
                    />
                  </div>
                  <div className="md:col-span-4 relative">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 appearance-none cursor-pointer"
                    >
                      {types.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div> */}

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 pt-15 pb-10">
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
            <div className="text-3xl font-bold text-gray-900">70</div>
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

                {/* Card Body */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{booth.name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{booth.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-sm">{booth.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Square className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-sm">Booth Size: {booth.size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">{booth.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-green-600">{booth.available}</span> / {booth.total} available
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="text-2xl font-bold text-red-600">
                        ${booth.price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/exhibitions/${booth.id}`}
                    className="block w-full bg-red-600 text-white text-center py-3 rounded-xl font-medium hover:bg-red-700 transition-all transform hover:scale-105"
                  >
                    View Details & Book
                  </Link>
                </div>
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
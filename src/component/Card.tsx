'use client';

import Link from 'next/link';
import { Calendar, MapPin , Square, Star } from 'lucide-react';

interface CardProps {
    name: string;
    location: string;
    date: string;
    size: string;
    available: number;
    rating: number,
    total: number;
    price: number;
}

export default function Card({ 
    name,
    location,
    date,
    size,
    available,
    rating,
    total,
    price
    }: CardProps) {
    return (
        <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-sm">{date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Square className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-sm">Booth Size: {size}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">{rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-semibold text-green-600">{available}</span> / {total} available
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-gray-600">Starting from</div>
                      <div className="text-2xl font-bold text-red-600">
                        ${price.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <Link
                  // `/exhibitions/${booth.id}`
                    href=""
                    className="block w-full bg-red-600 text-white text-center py-3 rounded-xl font-medium hover:bg-red-700 transition-all transform hover:scale-105"
                  >
                    View Details & Book
                  </Link>
                </div>
    )
}
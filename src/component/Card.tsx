// component/Card.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Square , Users } from 'lucide-react';

interface CardProps {
    id: number;
    name: string;
    description: string;
    venue: string;
    startDate: string;
    durationDay: number;
    smallBoothQuota: number;
    bigBoothQuota: number;
    posterPicture: string;
}

export default function Card({ 
    id,
    name,
    description,
    venue,
    startDate,
    durationDay,
    smallBoothQuota,
    bigBoothQuota,
    posterPicture,
}: CardProps) {
    
    // Calculate end date
    const calculateEndDate = (start: string, duration: number) => {
        const startDateObj = new Date(start);
        const endDateObj = new Date(startDateObj);
        endDateObj.setDate(endDateObj.getDate() + duration - 1);
        return endDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatStartDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const totalBooths = smallBoothQuota + bigBoothQuota;

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            {/* Image Section */}
            <div className="relative w-full h-48">
                <Image
                    src={posterPicture}
                    alt={name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{name}</h3>
                
                {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p> */}
            
            <div className="space-y-3 mb-4">
                <div className="flex items-start space-x-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{venue}</span>
                </div>
                
                {/* <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-sm">
                        {formatStartDate(startDate)} - {calculateEndDate(startDate, durationDay)}
                    </span>
                </div> */}
                
                {/* <div className="flex items-center space-x-2 text-gray-600">
                    <Square className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-sm">Duration: {durationDay} day{durationDay > 1 ? 's' : ''}</span>
                </div> */}
                
                <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="text-sm">
                        Small: {smallBoothQuota} | Big: {bigBoothQuota}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div className="text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">{totalBooths}</span> total booths
                </div>
            </div>

            <Link
                href={`/user/exhibition/${id}`}
                className="block w-full bg-red-600 text-white text-center py-3 rounded-xl font-medium hover:bg-red-700 transition-all transform hover:scale-105"
            >
                View Details & Book
            </Link>
        </div>
        </div>
    );
}
// app/exhibitions/page.tsx
import React from 'react';
import Link from 'next/link';
import Header from '@/component/Header';
import StatSection from '@/component/StatSection';
import getExhibitions from '@/libs/getExhibitions';
import { Suspense } from "react"; 
import { LinearProgress } from "@mui/material";
import ExhibitionCardSection from '@/component/ExhibitionCardSection';

// Updated mock data matching the new schema
const availableBooths = [
  {
    id: 1,
    name: "Tech Summit 2025",
    description: "The largest technology exhibition in Southeast Asia featuring AI, IoT, and emerging technologies.",
    venue: "Bangkok International Trade Center",
    startDate: "2025-11-05", // ต้องเป็นวันนี้หรือมากกว่า
    durationDay: 4,
    smallBoothQuota: 12,
    bigBoothQuota: 8,
    posterPicture: "/images/exhibitions/TechSummit.jpg"
  },
  {
    id: 2,
    name: "Food & Beverage Expo",
    description: "Discover the latest trends in food and beverage industry with world-class exhibitors.",
    venue: "Queen Sirikit National Convention Center",
    startDate: "2025-11-05",
    durationDay: 4,
    smallBoothQuota: 10,
    bigBoothQuota: 5,
    posterPicture: "/images/exhibitions/FoodExpo.jpg"
  },
  {
    id: 3,
    name: "International Auto Show",
    description: "Experience the future of automotive with electric vehicles and autonomous driving technology.",
    venue: "Impact Exhibition Center",
    startDate: "2025-11-05",
    durationDay: 6,
    smallBoothQuota: 5,
    bigBoothQuota: 5,
    posterPicture: "/images/exhibitions/MotorShow.jpg"
  },
  {
    id: 4,
    name: "Fashion Week Asia",
    description: "Showcase your brand at Asia's premier fashion event with designers from around the world.",
    venue: "Central World Convention Hall",
    startDate: "2025-11-05",
    durationDay: 6,
    smallBoothQuota: 15,
    bigBoothQuota: 10,
    posterPicture: "/images/exhibitions/FashionWeek.jpg"
  },
  {
    id: 5,
    name: "Healthcare Innovation Summit",
    description: "Explore cutting-edge medical technology and healthcare solutions for the future.",
    venue: "Bangkok Convention Center",
    startDate: "2025-11-05",
    durationDay: 5,
    smallBoothQuota: 8,
    bigBoothQuota: 10,
    posterPicture: "/images/exhibitions/HealthSummit.jpg"
  },
  {
    id: 6,
    name: "Education & Training Expo",
    description: "Connect with educational institutions and training providers from around the globe.",
    venue: "Bitec Exhibition Center",
    startDate: "2025-11-05",
    durationDay: 4,
    smallBoothQuota: 20,
    bigBoothQuota: 10,
    posterPicture: "/images/exhibitions/EducationExpo.jpg"
  }
];

export default function ExhibitionPage() {

  const exhibits = getExhibitions()
  
  // const [searchTerm, setSearchTerm] = useState('');
  // const [selectedType, setSelectedType] = useState('All');

  // const types = ['All', 'Technology', 'Food & Beverage', 'Automotive', 'Fashion', 'Healthcare', 'Education'];

  // const filteredBooths = availableBooths.filter(booth => {
  //   const matchesSearch = booth.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        booth.venue.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesType = selectedType === 'All' || booth.type === selectedType;
  //   return matchesSearch && matchesType;
  // });

  // const totalSmallBooths = availableBooths.reduce((sum, booth) => sum + booth.smallBoothQuota, 0);
  // const totalBigBooths = availableBooths.reduce((sum, booth) => sum + booth.bigBoothQuota, 0);
  // const totalBooths = totalSmallBooths + totalBigBooths;

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

      {/* Stats Section and Booth Section */}
      <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
        <StatSection exhibitJson= {exhibits}/>
        <ExhibitionCardSection exhibitJson= {exhibits}/>
      </Suspense> 


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
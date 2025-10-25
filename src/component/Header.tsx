import { Calendar, MapPin, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
    return(
        <nav className="bg-white shadow-sm fixed w-full z-10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
                <Calendar className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">ExpoBook</span>
            </div>
            <div className="flex items-center space-x-6">
                <a href="#features" className="text-gray-600 hover:text-red-600 transition-colors">Features</a>
                <Link href="/user/login" className="text-red-600 hover:text-red-700 font-medium transition-colors">
                Login
                </Link>
                <Link href="/user/signup" className="bg-red-600 text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg">
                Get Started
                </Link>
            </div>
            </div>
        </nav>
    )
}
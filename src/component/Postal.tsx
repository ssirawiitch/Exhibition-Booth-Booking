import { MapPin, Users, TrendingUp } from 'lucide-react';

export default function Postal() {
    return (
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
    )
}
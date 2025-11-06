import React from 'react';

type Exhibition = {
  smallBoothQuota: number;
  bigBoothQuota: number;
};

export default function StatAdminSection ({ exhibitions }: { exhibitions: Exhibition[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-15 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">{exhibitions.length}</div>
            <div className="text-gray-600">Total Exhibitions</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {exhibitions.reduce((sum, ex) => sum + (ex.smallBoothQuota + ex.bigBoothQuota), 0)}
            </div>
            <div className="text-gray-600">Total Booths</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {exhibitions.reduce((sum, ex) => sum + ex.smallBoothQuota, 0)}
            </div>
            <div className="text-gray-600">Small Booths</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {exhibitions.reduce((sum, ex) => sum + ex.bigBoothQuota, 0)}
            </div>
            <div className="text-gray-600">Big Booths</div>
          </div>
        </div>
    )
}
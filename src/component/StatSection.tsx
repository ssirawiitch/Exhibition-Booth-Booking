export default async function StatSection({exhibitJson}:{exhibitJson:Object}){

    const exhibitJsonReady = await exhibitJson

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-20">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
                <div className="text-4xl mb-2">🏢</div>
                <div className="text-3xl font-bold text-gray-900">{exhibitJsonReady.count}</div>
                <div className="text-gray-600">Available Events</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
                <div className="text-4xl mb-2">📍</div>
                <div className="text-3xl font-bold text-gray-900">{exhibitJsonReady.count}</div>
                <div className="text-gray-600">Locations</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
                <div className="text-4xl mb-2">🎫</div>
                <div className="text-3xl font-bold text-gray-900">{exhibitJsonReady.count}</div>
                <div className="text-gray-600">Total Booths</div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:-translate-y-2 transition-all">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-3xl font-bold text-gray-900">4.7</div>
                <div className="text-gray-600">Avg Rating</div>
            </div>
            </div>
      </div>
    )
}
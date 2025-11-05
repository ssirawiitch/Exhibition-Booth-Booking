import Card from "./Card"

export default async function ExhibitionCardSection({exhibitJson}:{exhibitJson:Object}){

    const exhibitJsonReady = await exhibitJson

    return (
        <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {exhibitJsonReady.count} Exhibition{exhibitJsonReady.count !== 1 ? 's' : ''} Found
                </h2>
                <p className="text-gray-600">Browse and book your perfect exhibition booth</p>
            </div>

            {exhibitJsonReady.count === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No exhibitions found</h3>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {exhibitJsonReady.data.map((booth:Object) => (
                          <div key={booth.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
            
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
    )
}
export default function FeatureSection() {
    return (
        <div className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ExpoBook?</h2>
                <p className="text-xl text-gray-600">Everything you need to manage exhibition bookings in one place</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                { icon: '🎯', title: 'Easy Booking', desc: 'Book your exhibition booth in just a few clicks with our intuitive platform' },
                { icon: '💳', title: 'Secure Payments', desc: 'Multiple payment options with bank-level security and instant confirmations' },
                { icon: '📊', title: 'Real-time Updates', desc: 'Get live updates on availability, schedules, and important event information' },
                { icon: '🌍', title: 'Global Reach', desc: 'Access exhibition spaces in over 150 countries worldwide' },
                { icon: '💬', title: '24/7 Support', desc: 'Our dedicated team is always ready to help you with any questions' },
                { icon: '📱', title: 'Mobile Friendly', desc: 'Manage your bookings on the go with our responsive platform' }
                ].map((feature, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-2">
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
    )
}
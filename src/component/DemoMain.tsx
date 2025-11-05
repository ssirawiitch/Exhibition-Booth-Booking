import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function DemoMain() {
    return (
        <div className="bg-gradient-to-r from-red-600 to-red-700 pt-30 pb-15">
            <div className="max-w-7xl mx-auto px-6">
            <div className="text-center text-white">
                <Link href="/" className="inline-flex items-center space-x-2 text-red-100 hover:text-white mb-4 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
                </Link>
                <h1 className="text-5xl font-bold mb-4">Watch Our Demo</h1>
                <p className="text-xl text-red-100">See how ExpoBook makes exhibition booth booking simple and efficient</p>
            </div>
            </div>
        </div>
    )
}
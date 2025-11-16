import React from "react";
import Link from "next/link";
import Header from "../component/Header";
import FeatureSection from "@/component/FeatureSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Postal from "@/component/Postal";
import getUserProfile from "@/libs/getUserProfile";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  let userDetail = null;
  if (session?.user?.token) {
    userDetail = await getUserProfile(session.user.token as string);
  }
  const userRole = userDetail?.data?.role;

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-50">
      <Header />

      {/* main Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12">
          <div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight mt-10">
              Seamless Booth Booking for Your Next
              <span className="text-red-600"> Exhibition</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover, compare, and book exhibition booths worldwide.
              Streamline your event planning with real-time availability,
              instant confirmations, and comprehensive venue details.
            </p>
            <div className="flex items-center space-x-4">
              {/* Check session first, then role */}
              {!session ? (
                <Link
                  href="/user/exhibition"
                  className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  view Exhibitons
                </Link>
              ) : userRole === "admin" ? (
                <Link
                  href="/admin/home"
                  className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  Manage Exhibitions
                </Link>
              ) : (
                <Link
                  href="/user/exhibition"
                  className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-red-700 transition-all transform hover:scale-105 shadow-xl"
                >
                  Start Booking Now
                </Link>
              )}

              {session && userRole === "admin" ? (
                <Link
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-red-600 hover:text-red-600 transition-all"
                  href="/admin/manageBooking"
                >
                  Manage Bookings
                </Link>
              ) : (
                <Link
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:border-red-600 hover:text-red-600 transition-all"
                  href="/demo"
                >
                  Watch Demo
                </Link>
              )}
            </div>

            {session ? (
              <></>
            ) : (
              <div className="mt-12 flex items-center space-x-8">
                <div>
                  <div className="text-3xl font-bold text-gray-900">5000+</div>
                  <div className="text-gray-600">Exhibition Spaces</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">150+</div>
                  <div className="text-gray-600">Countries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <Postal />
          </div>
        </div>
      </div>

      {/* Features Section */}
      {session ? <></> : <FeatureSection />}

      {/* CTA Section */}
      {session ? (
        <div className="bg-linear-to-br from-red-600 to-red-700 py-10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <p className="m-5 text-white">© 2025 Will &amp; Drew</p>
          </div>
        </div>
      ) : (
        <div className="bg-linear-to-br from-red-600 to-red-700 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Book Your Exhibition Booth?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Join thousands of exhibitors who trust ExpoBook for their event
              needs
            </p>
            <Link
              href="/user/signup"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Get Started for Free
            </Link>
            <p className="m-5">© 2025 Will &amp; Drew</p>
          </div>
        </div>
      )}
    </div>
  );
}

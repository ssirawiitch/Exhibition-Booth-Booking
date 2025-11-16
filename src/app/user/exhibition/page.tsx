// app/exhibitions/page.tsx
import React from "react";
import Link from "next/link";
import Header from "@/component/Header";
import StatSection from "@/component/StatSection";
import getExhibitions from "@/libs/getExhibitions";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import ExhibitionCardSection from "@/component/ExhibitionCardSection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function ExhibitionPage() {

  const exhibits = getExhibitions();

  const session = await getServerSession(authOptions);
  let userDetail = null;
  if (session?.user?.token) {
    userDetail = await getUserProfile(session.user.token as string);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-5 pt-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Available Exhibition Booths
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Find the perfect booth for your next exhibition
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section and Booth Section */}
      <Suspense
        fallback={
          <p>
            Loading ... <LinearProgress />
          </p>
        }
      >
        <StatSection exhibitJson={exhibits} />
        <ExhibitionCardSection exhibitJson={exhibits} />
      </Suspense>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-15">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Contact our team to discuss custom exhibition solutions
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/contact"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Contact Support
            </a>
            <Link
              href="/"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

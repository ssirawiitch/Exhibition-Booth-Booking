"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HeaderClient() {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.token) {
        try {
          const response = await fetch("http://localhost:5000/api/v1/auth/me", {
            method: "GET",
            headers: {
              authorization: `Bearer ${session.user.token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          setUserRole(result.data.role);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchData();
  }, [session]);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">ExpoBook</span>
        </div>

        {/* Menu */}
        {session ? (
          <div className="flex items-center">
            {userRole == "admin" ? 
              <Link
                href="/admin/manageBooking"
              >
                <div className="text-red-600 hover:text-red-700 font-medium transition-colors mr-8">Manage Bookings</div>
              </Link> : 
              <Link
                href="/user/profile"
              >
                <div className="text-red-600 hover:text-red-700 font-medium transition-colors mr-8">Edit Profile</div>
              </Link>
            }
            <Link
              href={userRole === "admin" ? "/admin/home" : "/user/mybooking"}
            >
              <div className="text-red-600 hover:text-red-700 font-medium transition-colors">
                {userRole === "admin" ? "Manage Exhibitions" : "My Booking"}
              </div>
            </Link>
            <Link href="/api/auth/signout">
              <div className="text-red-600 hover:text-red-700 font-medium transition-colors ml-7">
                Sign-Out of {session.user?.name}
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <Link
              href="/user/login"
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/user/signup"
              className="bg-red-600 text-white px-6 py-2.5 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import {
  Calendar,
  Bell,
  User,
  ChevronDown,
  Edit,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getUserProfile from "@/libs/getUserProfile";

export default function HeaderClient() {
  const { data: session } = useSession();
  const [userRole, setUserRole] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (session?.user?.token) {
        try {
          const result = await getUserProfile(session.user.token);
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
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ExpoBook</span>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {session ? (
            <>
              <div className="hidden md:flex items-center space-x-8">
                {userRole === "admin" ? (
                  <>
                    <Link
                      href="/admin/home"
                      className="text-gray-900 font-bold hover:text-red-700  transition-colors"
                    >
                      Manage Expos
                    </Link>
                    <Link
                      href="/admin/manageBooking"
                      className="text-gray-900 font-bold hover:text-red-700  transition-colors"
                    >
                      Manage Bookings
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/user/exhibition"
                      className="text-gray-900 font-bold hover:text-red-700  transition-colors"
                    >
                      Browse Expos
                    </Link>
                    <Link
                      href="/user/mybooking"
                      className="text-gray-900 font-bold hover:text-red-700  transition-colors"
                    >
                      My Booking
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center space-x-6">
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className=" cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-red-600"
                  >
                    <User className="w-7 h-7 bg-gray-200 rounded-full p-1" />
                    <span>{session.user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href="/user/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </Link>
                      <Link
                        href="#"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <LifeBuoy className="w-4 h-4" />
                        <span>Help Center</span>
                      </Link>
                      <hr className="my-1" />
                      <Link
                        href="/api/auth/signout"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-6">
              <Link
                href="/user/login"
                className="text-gray-900 font-bold hover:text-red-700  transition-colors"
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
      </div>
    </nav>
  );
}

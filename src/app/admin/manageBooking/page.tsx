// src/app/admin/manageBooking/page.tsx
"use client";

import Header from "@/component/Header";
import { useSession } from "next-auth/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Trash2, Edit, MapPin, X, Eye } from "lucide-react";
import deleteBooking from "@/libs/deleteBooking";
import AdminBookingSearchFilterBar from "@/component/AdminBookingSearchFilterBar";
import EditBookingModal from "@/component/EditBookingModal";
import getBookings from "@/libs/getBooking";
import getUserProfile from "@/libs/getUserProfile";

type Booking = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  exhibition: {
    _id: string;
    name: string;
    venue: string;
    startDate: string;
    durationDay: number;
    smallBoothQuota: number;
    bigBoothQuota: number;
  };
  boothType: "small" | "big";
  amount: number;
  createdAt: string;
  updatedAt: string;
};

type EditContext = {
  currentBookingAmount: number;
  totalSmallExcludingCurrent: number;
  totalBigExcludingCurrent: number;
};

type BookingWithContext = Booking & { editContext: EditContext };

export default function ManageBookingPage() {
  const { data: session, status } = useSession();
  const token = session?.user?.token;

  useEffect(() => {
    const checkRole = async () => {
      if (!token) return; 

      try {
        const profile = await getUserProfile(token); 

        if (profile.role !== 'admin') {
          alert("Unauthorized: Only admin can access this page");
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Error checking role:", err);
        alert("Unable to verify your role.");
        window.location.href = "/";
      }
    };

    checkRole();
  }, [token]);

  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] =
    useState<BookingWithContext | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"none" | "date" | "amount">("date");
  const [sortAsc, setSortAsc] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getBookings(token);
      setAllBookings(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load all bookings.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchBookings();
    } else if (status === "unauthenticated") {
      setLoading(false);
      setError("Unauthorized. Please sign in as an admin.");
    }
  }, [status, token, fetchBookings]);

  const handleDelete = async (bookingId: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this specific booking (1 entry)? This action is permanent."
    );
    if (!confirmDelete) return;

    try {
      if (!token) return alert("Not authenticated");
      await deleteBooking(token, bookingId);
      alert("Booking deleted successfully ✅");
      fetchBookings();
    } catch (err) {
      console.error("Error deleting booking:", err);
      alert("Failed to delete booking ❌");
    }
  };

  const handleEdit = (booking: Booking) => {
    if (!token) {
      alert("Not authenticated.");
      return;
    }

    const currentAmount = booking.amount;
    const exhibitionId = booking.exhibition._id;

    const relatedBookings = allBookings.filter(
      (b) =>
        b.exhibition._id === exhibitionId && b.user._id === booking.user._id
    );

    let totalSmallExcludingCurrent = relatedBookings
      .filter((b) => b.boothType === "small" && b._id !== booking._id)
      .reduce((sum, b) => sum + b.amount, 0);

    let totalBigExcludingCurrent = relatedBookings
      .filter((b) => b.boothType === "big" && b._id !== booking._id)
      .reduce((sum, b) => sum + b.amount, 0);

    if (booking.boothType === "small") {
      totalBigExcludingCurrent = relatedBookings
        .filter((b) => b.boothType === "big")
        .reduce((sum, b) => sum + b.amount, 0);
    } else {
      totalSmallExcludingCurrent = relatedBookings
        .filter((b) => b.boothType === "small")
        .reduce((sum, b) => sum + b.amount, 0);
    }

    const editContext: EditContext = {
      currentBookingAmount: currentAmount,
      totalSmallExcludingCurrent,
      totalBigExcludingCurrent,
    };

    setEditingBooking({
      ...booking,
      editContext,
    } as BookingWithContext);
  };

  const handleCloseModal = () => {
    setEditingBooking(null);
  };

  const filteredBookings = useMemo(() => {
    let result = [...allBookings];

    if (searchTerm.trim() !== "") {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.exhibition.name.toLowerCase().includes(lowerSearchTerm) ||
          b.user.email.toLowerCase().includes(lowerSearchTerm) ||
          b.user.name.toLowerCase().includes(lowerSearchTerm)
      );
    }

    if (sortBy !== "none") {
      result.sort((a, b) => {
        let valueA = 0,
          valueB = 0;
        let comparison = 0;

        if (sortBy === "date") {
          valueA = new Date(a.createdAt).getTime();
          valueB = new Date(b.createdAt).getTime();
          comparison = valueA - valueB;
        } else if (sortBy === "amount") {
          valueA = a.amount;
          valueB = b.amount;
          comparison = valueA - valueB;
        }

        return sortAsc ? comparison : -comparison;
      });
    }
    return result;
  }, [allBookings, searchTerm, sortBy, sortAsc]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Header />
        <p className="text-gray-600 text-lg">Loading all bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Header />
        <div className="text-center p-8 bg-white rounded-lg shadow-xl ">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Error Loading Bookings
          </h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <Header />

      <div className="bg-gradient-to-r from-red-600 to-red-700 py-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-4xl font-bold mt-23 mb-2">
              Booking Management
            </h1>
            <p className="text-red-100">
              View, Edit, and Cancel all user bookings
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -mt-15">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {allBookings.length}
            </div>
            <div className="text-gray-600">Total Booking Entries</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {allBookings.reduce((sum, b) => sum + b.amount, 0)}
            </div>
            <div className="text-gray-600">Total Booths Reserved</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {new Set(allBookings.map((b) => b.user.email)).size}
            </div>
            <div className="text-gray-600">Total Unique Users</div>
          </div>
        </div>
        <AdminBookingSearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAsc={sortAsc}
          setSortAsc={setSortAsc}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    User / Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Exhibition
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Booth Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Booking Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.map((b, i) => (
                  <tr
                    key={b._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      #{i + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {b.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {b.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {b.exhibition.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="max-w-xs truncate">
                          {b.exhibition.venue}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-medium ${
                        b.boothType === "small"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {b.boothType.toUpperCase()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {b.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(b)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Booking Amount"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Booking Entry"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No bookings found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingBooking && token && (
        <EditBookingModal
          booking={{
            _id: editingBooking._id,
            exhibition: {
              _id: editingBooking.exhibition._id,
              name: editingBooking.exhibition.name,
            },
            boothType: editingBooking.boothType,
            amount: editingBooking.amount,
          }}
          token={token}
          onClose={handleCloseModal}
          onSuccess={async () => {
            handleCloseModal();
            await fetchBookings();
          }}
          otherBookingsTotal={editingBooking.editContext}
        />
      )}
    </div>
  );
}

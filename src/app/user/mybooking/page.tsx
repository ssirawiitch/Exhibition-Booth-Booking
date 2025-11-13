"use client";
import Header from "@/component/Header";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import getBookings from "@/libs/getBooking";
import deleteBooking from "@/libs/deleteBooking";
import { Trash2, Edit, MapPin, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import EditBookingModal from "@/component/EditBookingModal";

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
  };
  boothType: "small" | "big";
  amount: number;
  createdAt: string;
};

type GroupedBooking = {
  exhibitionId: string;
  name: string;
  venue: string;
  startDate: string;
  durationDay: number;
  totalSmallBooths: number;
  totalBigBooths: number;
  bookingIds: string[];
  allBookings: Booking[];
};

type EditContext = {
  currentBookingAmount: number;
  totalSmallExcludingCurrent: number;
  totalBigExcludingCurrent: number;
};

type BookingWithContext = Booking & { editContext: EditContext };
const groupBookings = (bookings: Booking[]): GroupedBooking[] => {
  const groupedMap = new Map<string, GroupedBooking>();

  bookings.forEach((booking) => {
    const eid = booking.exhibition._id;

    if (!groupedMap.has(eid)) {
      groupedMap.set(eid, {
        exhibitionId: eid,
        name: booking.exhibition.name,
        venue: booking.exhibition.venue,
        startDate: booking.exhibition.startDate,
        durationDay: booking.exhibition.durationDay,
        totalSmallBooths: 0,
        totalBigBooths: 0,
        bookingIds: [],
        allBookings: [],
      });
    }

    const group = groupedMap.get(eid)!;
    if (booking.boothType === "small") {
      group.totalSmallBooths += booking.amount;
    } else if (booking.boothType === "big") {
      group.totalBigBooths += booking.amount;
    }
    group.bookingIds.push(booking._id);
    group.allBookings.push(booking);
  });

  return Array.from(groupedMap.values());
};

export default function MyBookingPage() {
  const { data: session, status } = useSession();
  const token = session?.user?.token;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] =
    useState<BookingWithContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const groupedBookings = useMemo(() => groupBookings(bookings), [bookings]);

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getBookings(token);
      setBookings(res.data || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status === "authenticated" && token) {
      fetchBookings();
    } else if (status === "unauthenticated") {
      setLoading(false);
      setError("Please sign in to view your bookings.");
    }
  }, [status, token, fetchBookings]);

  const handleDeleteGroup = async (group: any) => {
    if (!token) {
      alert("Authentication error. Please sign in again.");
      return;
    }
    const totalBookings = group.bookingIds.length;

    if (
      !confirm(
        `Are you sure you want to cancel all ${totalBookings} bookings for "${group.name}"? This action cannot be undone.`
      )
    )
      return;

    try {
      for (const bookingId of group.bookingIds) {
        await deleteBooking(token, bookingId);
      }
      const BOOKED_EXHIBITIONS_KEY = "bookedExhibitionIds";

      const exhibitionIdToClear = group.exhibitionId;

      if (!exhibitionIdToClear) {
        console.error(
          "Could not clear localStorage flag: 'exhibitionId' is missing from group object."
        );
      } else if (typeof window !== "undefined" && window.localStorage) {
        console.log(
          `Attempting to clear localStorage flag for: ${exhibitionIdToClear}`
        );
        try {
          const storedData = window.localStorage.getItem(
            BOOKED_EXHIBITIONS_KEY
          );
          if (storedData) {
            const bookedIds: string[] = JSON.parse(storedData);

            const newBookedIds = bookedIds.filter(
              (id) => id !== exhibitionIdToClear
            );

            window.localStorage.setItem(
              BOOKED_EXHIBITIONS_KEY,
              JSON.stringify(newBookedIds)
            );
            console.log(
              `localStorage flag for ${exhibitionIdToClear} cleared.`
            );
          }
        } catch (localErr) {
          console.error(
            "Error updating localStorage after deletion:",
            localErr
          );
        }
      }
      alert(
        `✅ Successfully cancelled all ${totalBookings} bookings for ${group.name}!`
      );
      fetchBookings();
    } catch (err: any) {
      console.error("Error during group deletion:", err);
      alert(
        "❌ Failed to cancel some bookings in the group. Please try again or contact support."
      );
    }
  };

  const handleEditSubBooking = (booking: Booking, group: any) => {
    if (!token) {
      alert("Not authenticated.");
      return;
    }

    const currentAmount = booking.amount;

    let totalSmallExcludingCurrent = group.totalSmallBooths;
    let totalBigExcludingCurrent = group.totalBigBooths;

    if (booking.boothType === "small") {
      totalSmallExcludingCurrent -= currentAmount;
    } else {
      totalBigExcludingCurrent -= currentAmount;
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

  const handleViewDetails = (group: any) => {
    window.location.href = `/user/exhibition/${group.exhibitionId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center">
        <div className="grow flex flex-row justify-center">
          <Header />
        </div>
        <div className="text-center grow flex flex-col items-center ">
          <svg
            className="animate-spin -ml-1 mr-3 h-10 w-10 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-gray-700 mt-4">
            Loading your bookings...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=" bg-gray-50 flex flex-col items-center">
        <div className="top-0 flex justify-center">
          <Header />
        </div>
        <div className="mt-75 pb-70">
          <div className=" p-8 bg-white rounded-lg shadow-xl">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Error Loading Bookings
            </h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={fetchBookings}
              className="cursor-pointer bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 ">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-25">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          {groupedBookings.length} Booked Exhibition
          {groupedBookings.length !== 1 ? "s" : ""} Found
        </h2>

        {groupedBookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-600 mb-4">
              You have no reserved exhibition booths.
            </p>
            <Link
              href="/user/exhibition"
              className="inline-block bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition"
            >
              Browse Exhibitions
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedBookings.map((group) => (
              <div
                key={group.exhibitionId}
                className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-red-600"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <span>{group.venue}</span>
                    </p>
                    <p className="text-sm text-gray-500 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>
                        {new Date(group.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        for {group.durationDay} day
                        {group.durationDay !== 1 ? "s" : ""}
                      </span>
                    </p>
                    <span className="text-xs text-gray-400">
                      ({group.bookingIds.length} sub-booking
                      {group.bookingIds.length !== 1 ? "s" : ""})
                    </span>
                  </div>

                  <div className="flex space-x-3 items-center flex-shrink-0">
                    <button
                      onClick={() => handleViewDetails(group)}
                      className="p-3 text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors shadow-md"
                      title="View Exhibition Details"
                    >
                      <Eye className="w-5 h-5 cursor-pointer" />
                    </button>
                    <button
                      onClick={() => handleDeleteGroup(group)}
                      className="p-3 text-white bg-red-500 hover:bg-red-600 rounded-full transition-colors shadow-md"
                      title="Cancel All Bookings for this Event"
                    >
                      <Trash2 className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4">
                  <div className="bg-green-50 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-700">
                        Small Booths Booked
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-green-700">
                      {group.totalSmallBooths}
                    </span>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-gray-700">
                        Big Booths Booked
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-blue-700">
                      {group.totalBigBooths}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h4 className="text-md font-semibold text-gray-800 mb-3">
                    Sub-Bookings for Editing:
                  </h4>
                  <div className="space-y-2">
                    {group.allBookings.map((subBooking: any) => (
                      <div
                        key={subBooking._id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
                      >
                        <span className="text-sm font-medium text-gray-700">
                          {subBooking.boothType.toUpperCase()} Booth:{" "}
                          {subBooking.amount} unit
                          {subBooking.amount !== 1 ? "s" : ""}
                        </span>
                        <button
                          onClick={() =>
                            handleEditSubBooking(subBooking, group)
                          }
                          className="cursor-pointer px-3 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-colors flex items-center space-x-1"
                          title="Edit Amount (Min 0, Max Total 6)"
                        >
                          <Edit className="w-3 h-3 " />
                          <span>Edit Amount</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-6 shadow-xl">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-extrabold text-white mb-3">
            Having Trouble?
          </h3>
          <p className="text-red-100 text-lg mb-6">
            Our support team is ready to assist you with any questions or issues
            regarding your bookings.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-red-700 px-8 py-3 rounded-full font-bold uppercase tracking-wide shadow-lg hover:bg-red-50 transition duration-300 transform hover:scale-105"
          >
            Contact Support Now
          </a>
        </div>
      </div>
      {editingBooking && token && (
        <EditBookingModal
          booking={editingBooking}
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

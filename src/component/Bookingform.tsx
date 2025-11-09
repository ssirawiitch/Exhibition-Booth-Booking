"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

export default function BookingForm({
  session,
  exhibitionId,
  eventName,
  eventStartDate,
  eventDurationDays,
  availableSmall,
  availableBig,
}: {
  session: Session | null;
  exhibitionId: string;
  eventName: string;
  eventStartDate: string;
  eventDurationDays: number;
  availableSmall: number;
  availableBig: number;
}) {
  const router = useRouter();
  const [smallCount, setSmallCount] = useState(0);
  const [bigCount, setBigCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const MAX_TOTAL = 6;
  const [bookingPeriod, setBookingPeriod] = useState({
    startDate: "",
  });
  const totalCount = smallCount + bigCount;
  const isAtMax = totalCount >= MAX_TOTAL;
  const isAtMinSmall = smallCount === 0;
  const isAtMinBig = bigCount === 0;

  const isAtMaxSmallAvailable = smallCount >= availableSmall;
  const isAtMaxBigAvailable = bigCount >= availableBig;

  const isSubmitDisabled =
    totalCount === 0 || !bookingPeriod.startDate || isLoading;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingPeriod((prevPeriod) => ({
      ...prevPeriod,
      [name]: value,
    }));
  };

  const handleSmallPlus = () => {
    if (!isAtMax && !isAtMaxSmallAvailable) setSmallCount((prev) => prev + 1);
  };
  const handleSmallMinus = () => {
    if (!isAtMinSmall) setSmallCount((prev) => prev - 1);
  };
  const handleBigPlus = () => {
    if (!isAtMax && !isAtMaxBigAvailable) setBigCount((prev) => prev + 1);
  };
  const handleBigMinus = () => {
    if (!isAtMinBig) setBigCount((prev) => prev - 1);
  };
  const calculateMaxEndDate = (startDateString: string, duration: number) => {
    if (!startDateString || duration <= 0) return "";
    const startDate = new Date(startDateString);
    startDate.setDate(startDate.getDate() + eventDurationDays - 1);
    return startDate.toISOString().slice(0, 10);
  };
  const safeEndDate = calculateMaxEndDate(eventStartDate, eventDurationDays);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const safeStartDate = eventStartDate ? eventStartDate.slice(0, 10) : "";

    if (safeStartDate && bookingPeriod.startDate < safeStartDate) {
      alert(`วันเริ่มจองต้องไม่ก่อนวันเริ่มงาน (${safeStartDate})`);
      return;
    }
    setIsLoading(true);

    const token = session?.user.token as string | null;

    const API_URL = "http://localhost:5000/api/v1/booking";

    const apiCalls = [];

    if (smallCount > 0) {
      apiCalls.push(
        fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exhibition: exhibitionId,
            boothType: "small",
            amount: smallCount,
          }),
        }).then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            console.error("API Error Detail (Small):", errorData);
            throw new Error(
              errorData.error ||
                errorData.message ||
                "Failed to book Small booth"
            );
          }
          return res.json();
        })
      );
    }

    if (bigCount > 0) {
      apiCalls.push(
        fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            exhibition: exhibitionId,
            boothType: "big",
            amount: bigCount,
          }),
        }).then(async (res) => {
          if (!res.ok) {
            const errorData = await res.json();
            console.error("API Error Detail (Big):", errorData);
            throw new Error(
              errorData.error || errorData.message || "Failed to book Big booth"
            );
          }
          return res.json();
        })
      );
    }

    try {
      await Promise.all(apiCalls);

      alert("✅ จองสำเร็จเรียบร้อย!");

      setSmallCount(0);
      setBigCount(0);
      router.push(`/user/exhibition/${exhibitionId}/mybooking`);
    } catch (error: any) {
      console.error("Booking Error:", error);
      alert(`เกิดข้อผิดพลาดในการจอง: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <main>
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-xl rounded-lg overflow-hidden"
          >
            <div className="p-8 sm:p-10 sm:pb-4!">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create Your Booking
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  For:{" "}
                  <span className="font-semibold text-red-600">
                    {eventName}
                  </span>
                </p>
                <div className="mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm font-medium text-gray-700">
                  <p>
                    Event Start:{" "}
                    <span className="text-red-600 font-semibold">
                      {eventStartDate.slice(0, 10)}
                    </span>
                  </p>
                  <p>
                    Event End:{" "}
                    <span className="text-red-600 font-semibold">
                      {safeEndDate.slice(0, 10)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 border-t border-gray-200 pt-4 text-left">
                    Booking
                  </h3>
                  <div>
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        check in date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={bookingPeriod.startDate}
                        onChange={handleDateChange}
                        min={eventStartDate ? eventStartDate.slice(0, 10) : ""}
                        max={safeEndDate ? safeEndDate.slice(0, 10) : ""}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-t border-gray-200 pt-4 text-left">
                  Select Your Booths
                </h3>

                <div className="space-y-5">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-lg font-medium text-gray-800 block">
                        Small Booth
                      </span>
                      <span className="text-sm text-gray-500">
                        (Available: {availableSmall})
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={handleSmallMinus}
                        disabled={isAtMinSmall}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-700 text-2xl flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                        {smallCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleSmallPlus}
                        disabled={isAtMax || isAtMaxSmallAvailable}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-700 text-2xl flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-lg font-medium text-gray-800 block">
                        Big Booth
                      </span>
                      <span className="text-sm text-gray-500">
                        (Available: {availableBig})
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={handleBigMinus}
                        disabled={isAtMinBig}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-700 text-2xl flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-gray-900 w-12 text-center">
                        {bigCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleBigPlus}
                        disabled={isAtMax || isAtMaxBigAvailable}
                        className="w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-700 text-2xl flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-5 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total Booths:
                    </span>
                    <span className="text-3xl font-bold text-red-600">
                      {totalCount}
                    </span>
                  </div>

                  {(isAtMax ||
                    (isAtMaxSmallAvailable && smallCount > 0) ||
                    (isAtMaxBigAvailable && bigCount > 0)) && (
                    <div className="text-center p-2 bg-yellow-50 text-yellow-800 rounded-md text-sm font-medium">
                      {isAtMax && "⚠️ Maximum limit of 6 booths reached."}
                      {!isAtMax &&
                        isAtMaxSmallAvailable &&
                        smallCount > 0 &&
                        "⚠️ All available Small booths selected."}
                      {!isAtMax &&
                        isAtMaxBigAvailable &&
                        bigCount > 0 &&
                        "⚠️ All available Big booths selected."}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full text-white text-lg font-bold py-4 px-6 rounded-lg shadow-md transition-all 
                  ${
                    isSubmitDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  } flex items-center justify-center`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Processing...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
              <p className="text-center mt-4">
                <a
                  href={`/user/exhibition/`}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </a>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

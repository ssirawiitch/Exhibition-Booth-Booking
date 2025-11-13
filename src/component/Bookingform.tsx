"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { createBooking } from "../libs/createBooking";

export default function BookingForm({
  session,
  exhibitionId,
  availableSmall,
  availableBig,
}: {
  session: Session | null;
  exhibitionId: string;
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

  const isSubmitDisabled = totalCount === 0 || isLoading;

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const token = session?.user.token as string | null;

    try {
      await createBooking({
        smallCount,
        bigCount,
        exhibitionId,
        token,
      });
      alert("✅ จองสำเร็จเรียบร้อย!");

      setSmallCount(0);
      setBigCount(0);
      router.push(`/user/mybooking`);
    } catch (error: any) {
      console.error("Booking Error:", error);
      alert(`เกิดข้อผิดพลาดในการจอง: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 ">
      <main>
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white  rounded-lg overflow-hidden"
          >
            <div className="p-4! sm:p-10 sm:pb-4!">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Create Your Booking
                </h2>
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

            <div className=" px-8 py-6  border-gray-200">
              <div className="flex justify-between items-center space-x-4">
                <a
                  href={`/user/exhibition/`}
                  className="flex-1 flex items-center justify-center px-6 py-4 border border-gray-300 rounded-lg shadow-sm text-lg font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </a>

                <button
                  type="submit"
                  disabled={isSubmitDisabled}
                  className={`flex-1 flex items-center justify-center text-white text-lg font-bold py-4 px-6 rounded-lg shadow-md transition-all 
        ${
          isSubmitDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        }`}
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
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      Make Reservation
                    </>
                  )}
                </button>
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                Book your space now before booths run out!
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

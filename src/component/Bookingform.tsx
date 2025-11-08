"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function BookingForm({
  exhibitionId,
  eventName,
  eventStartDate,
  eventEndDate,
  availableSmall,
  availableBig,
}: {
  exhibitionId: string;
  eventName: string;
  eventStartDate: string;
  eventEndDate: string;
  availableSmall: number;
  availableBig: number;
}) {
  const [smallCount, setSmallCount] = useState(0);
  const [bigCount, setBigCount] = useState(0);

  const MAX_TOTAL = 6;

  const [bookingPeriod, setBookingPeriod] = useState({
    startDate: "",
    endDate: "",
  });

  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
  });

  const totalCount = smallCount + bigCount;
  const isAtMax = totalCount === MAX_TOTAL;
  const isAtMinSmall = smallCount === 0;
  const isAtMinBig = bigCount === 0;

  const isAtMaxSmallAvailable = smallCount === availableSmall;
  const isAtMaxBigAvailable = bigCount === availableBig;

  const isSubmitDisabled =
    totalCount === 0 || !bookingPeriod.startDate || !bookingPeriod.endDate;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (bookingPeriod.startDate < eventStartDate.slice(0, 10)) {
      alert(`Start Date ต้องไม่ก่อนวันที่ ${eventStartDate.slice(0, 10)}`);
      return;
    }
    if (bookingPeriod.endDate > eventEndDate.slice(0, 10)) {
      alert(`End Date ต้องไม่เกินวันที่ ${eventEndDate.slice(0, 10)}`);
      return;
    }
    if (bookingPeriod.endDate < bookingPeriod.startDate) {
      alert("End Date cannot be earlier than Start Date!");
      return;
    }
    if (smallCount > availableSmall) {
      alert(`คุณจอง Small Booths ได้สูงสุด ${availableSmall} บูธ`);
      return;
    }
    if (bigCount > availableBig) {
      alert(`คุณจอง Big Booths ได้สูงสุด ${availableBig} บูธ`);
      return;
    }

    const bookingData = {
      ...contactInfo,
      ...bookingPeriod,
      smallBooths: smallCount,
      bigBooths: bigCount,
      totalBooths: totalCount,
      exhibitionId: exhibitionId,
    };
    console.log("Sending Booking Data:", bookingData);
    alert(
      `Booking confirmed for ${eventName}\nPeriod: ${bookingPeriod.startDate} to ${bookingPeriod.endDate}\nTotal Booths: ${totalCount}`
    );
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
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 border-t border-gray-200 pt-4 text-left">
                    Booking Period
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={bookingPeriod.startDate}
                        onChange={handleDateChange}
                        min={eventStartDate}
                        max={eventEndDate}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={bookingPeriod.endDate}
                        onChange={handleDateChange}
                        min={bookingPeriod.startDate || eventStartDate}
                        max={eventEndDate}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 border-t border-gray-200 pt-4 text-left">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={contactInfo.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={contactInfo.companyName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Tech Innovations Inc."
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1 text-left"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contactInfo.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="081-234-5678"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-t border-gray-200 pt-4 text-left">
                  Select Your Booths
                </h3>

                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-medium text-gray-800">
                        Small Booth{" "}
                      </span>
                      <span className="text-sm text-gray-500">
                        (Available: {availableSmall})
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={handleSmallMinus}
                        disabled={isAtMinSmall}
                        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-gray-900 w-10 text-center">
                        {smallCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleSmallPlus}
                        disabled={isAtMax || isAtMaxSmallAvailable}
                        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-medium text-gray-800">
                        Big Booth {}
                      </span>
                      <span className="text-sm text-gray-500">
                        (Available: {availableBig})
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        onClick={handleBigMinus}
                        disabled={isAtMinBig}
                        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-2xl font-bold text-gray-900 w-10 text-center">
                        {bigCount}
                      </span>
                      <button
                        type="button"
                        onClick={handleBigPlus}
                        disabled={isAtMax || isAtMaxBigAvailable}
                        className="w-10 h-10 rounded-full bg-gray-200 text-gray-700 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
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
                  {isAtMax && (
                    <p className="text-center text-red-600 font-medium">
                      Max limit (6) reached.
                    </p>
                  )}
                  {isAtMaxSmallAvailable && !isAtMax && smallCount > 0 && (
                    <p className="text-center text-red-600 font-medium">
                      All available small booths selected.
                    </p>
                  )}
                  {isAtMaxBigAvailable && !isAtMax && bigCount > 0 && (
                    <p className="text-center text-red-600 font-medium">
                      All available big booths selected.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-6">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className="w-full bg-red-600 text-white text-lg font-bold py-4 px-6 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Booking
              </button>
              <p className="text-center mt-4">
                <Link
                  href="/user/exhibition"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

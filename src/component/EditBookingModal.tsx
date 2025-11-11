"use client";

import React, { useState, useEffect } from "react";
import { X, Edit } from "lucide-react";

import editBooking from "@/libs/editBooking";
import deleteBooking from "@/libs/deleteBooking";
import getExhibition from "@/libs/getExhibition";

type Booking = {
  _id: string;
  exhibition: {
    _id: string;
    name: string;
  };
  boothType: "small" | "big";
  amount: number;
};

type ExhibitionQuota = {
  smallBoothQuota: number;
  bigBoothQuota: number;
};

interface EditBookingModalProps {
  booking: Booking;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
  otherBookingsTotal: {
    currentBookingAmount: number;
    totalSmallExcludingCurrent: number;
    totalBigExcludingCurrent: number;
  };
}

export default function EditBookingModal({
  booking,
  token,
  onClose,
  onSuccess,
  otherBookingsTotal,
}: EditBookingModalProps) {
  const [newAmount, setNewAmount] = useState(booking.amount);
  const [loading, setLoading] = useState(false);
  const [quotaLoading, setQuotaLoading] = useState(true);
  const [exhibitionQuota, setExhibitionQuota] =
    useState<ExhibitionQuota | null>(null);

  const MAX_TOTAL_LIMIT = 6;
  const boothName = booking.boothType === "small" ? "Small Booth" : "Big Booth";

  const totalSmall =
    booking.boothType === "small"
      ? otherBookingsTotal.totalSmallExcludingCurrent + newAmount
      : otherBookingsTotal.totalSmallExcludingCurrent;

  const totalBig =
    booking.boothType === "big"
      ? otherBookingsTotal.totalBigExcludingCurrent + newAmount
      : otherBookingsTotal.totalBigExcludingCurrent;

  const totalBookingsAfterEdit = totalSmall + totalBig;

  const isOverLimit = totalBookingsAfterEdit > MAX_TOTAL_LIMIT;
  const isZeroAmount = newAmount === 0;

  useEffect(() => {
    const fetchQuota = async () => {
      setQuotaLoading(true);
      try {
        const res = await getExhibition(booking.exhibition._id);
        setExhibitionQuota({
          smallBoothQuota: res.data.smallBoothQuota,
          bigBoothQuota: res.data.bigBoothQuota,
        });
      } catch (e) {
        console.error("Failed to fetch exhibition quota:", e);
      } finally {
        setQuotaLoading(false);
      }
    };
    fetchQuota();
  }, [booking.exhibition._id]);

  const relevantQuota =
    booking.boothType === "small"
      ? exhibitionQuota?.smallBoothQuota
      : exhibitionQuota?.bigBoothQuota;

  const isQuotaExceeded: boolean =
    relevantQuota !== undefined && relevantQuota !== null
      ? newAmount - booking.amount > relevantQuota
      : false;

  const isDisabled = loading || isOverLimit || isQuotaExceeded;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newAmount < 0) {
      setNewAmount(0);
      return;
    }

    if (isOverLimit) {
      alert(
        `Failed: Total Small Booths (${totalSmall}) + Big Booths (${totalBig}) must not exceed ${MAX_TOTAL_LIMIT} units.`
      );
      return;
    }

    if (isQuotaExceeded) {
      alert(`Failed: Increasing can not exceed ${relevantQuota}.`);
      return;
    }

    setLoading(true);

    try {
      if (isZeroAmount) {
        await deleteBooking(token, booking._id);
        alert("Booking successfully cancelled (Amount set to 0).");
      } else {
        const updatedData = {
          boothType: booking.boothType,
          amount: newAmount,
        };
        await editBooking(token, booking._id, updatedData);
        alert("Booking updated successfully!");
      }

      onSuccess();
    } catch (err: any) {
      console.error(err);
      alert("Failed to process booking action. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (quotaLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
        <div className="bg-white p-8 rounded-xl shadow-2xl">
          <p className="text-gray-700">Fetching current quota...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 border-b p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">Edit Booth Booking</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-blue-700 transition"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-lg font-semibold text-gray-800">
            Event: {booking.exhibition.name}
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <Edit className="w-5 h-5 text-blue-500" />
            <span>{boothName}</span>
          </div>

          <div className="space-y-2">
            {relevantQuota !== undefined && relevantQuota !== null && (
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-sm">
                {boothName} available :
                <span className="font-semibold text-yellow-800">
                  {" "}
                  {relevantQuota}
                </span>
              </div>
            )}

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-sm">
              Current Total :
              <span className="font-bold">
                {" "}
                {Number(otherBookingsTotal.totalSmallExcludingCurrent) +
                  Number(otherBookingsTotal.totalBigExcludingCurrent)}
              </span>
            </div>

            {isOverLimit && (
              <div className="bg-red-100 p-3 rounded-lg border border-red-300 text-sm font-bold text-red-700">
                ERROR: Total units can not exceed {MAX_TOTAL_LIMIT}.
              </div>
            )}

            {isQuotaExceeded && (
              <div className="bg-red-100 p-3 rounded-lg border border-red-300 text-sm font-bold text-red-700">
                ERROR: Increasing can not exceed {relevantQuota}.
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Amount of Booths
            </label>
            <input
              type="number"
              value={newAmount}
              onChange={(e) =>
                setNewAmount(
                  parseInt(e.target.value) < 0
                    ? 0
                    : parseInt(e.target.value) || 0
                )
              }
              min="0"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isDisabled}
              className={`flex-1 text-white py-3 rounded-xl font-medium transition-all disabled:opacity-50 ${
                isDisabled ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Processing..."
                : isZeroAmount
                ? "Cancel Booking"
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:border-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

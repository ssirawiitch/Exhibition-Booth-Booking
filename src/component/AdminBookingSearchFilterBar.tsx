"use client";
import React from "react";
import { ArrowUpDown } from "lucide-react";

interface AdminBookingSearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  sortBy: "none" | "date" | "amount";
  setSortBy: (v: "none" | "date" | "amount") => void;
  sortAsc: boolean;
  setSortAsc: (v: boolean) => void;
}

export default function AdminBookingSearchFilterBar({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortAsc,
  setSortAsc,
}: AdminBookingSearchFilterBarProps) {
  const getSortLabel = () => {
    switch (sortBy) {
      case "date":
        return "Booking Date";
      case "amount":
        return "Amount";
      case "none":
      default:
        return "None";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
      <input
        type="text"
        placeholder="Search by exhibition name or user email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
      />

      <button
        onClick={() => {
          if (sortBy === "none") setSortBy("date");
          else if (sortBy === "date") setSortBy("amount");
          else setSortBy("none");
        }}
        className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-50"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span>Sort: {getSortLabel()}</span>
      </button>

      <button
        onClick={() => setSortAsc(!sortAsc)}
        className="border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-50"
      >
        {sortAsc ? "⬆ Asc" : "⬇ Desc"}
      </button>
    </div>
  );
}

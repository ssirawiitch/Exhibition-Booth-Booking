'use client';
import React from 'react';
import { ArrowUpDown } from 'lucide-react';

interface AdminSearchFilterBarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  venueFilter: string;
  setVenueFilter: (v: string) => void;
  sortBy: 'none' | 'date' | 'duration' | 'booth';
  setSortBy: (v: 'none' | 'date' | 'duration' | 'booth') => void;
  sortAsc: boolean;
  setSortAsc: (v: boolean) => void;
  venues: string[];
}

export default function AdminSearchFilterBar({
  searchTerm,
  setSearchTerm,
  venueFilter,
  setVenueFilter,
  sortBy,
  setSortBy,
  sortAsc,
  setSortAsc,
  venues
}: AdminSearchFilterBarProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-8 mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
      {/* Search */}
      <input
        type="text"
        placeholder="Search exhibitions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
      />

      {/* Filter */}
      <select
        value={venueFilter}
        onChange={(e) => setVenueFilter(e.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2"
      >
        <option value="all">All Venues</option>
        {venues.map((venue) => (
          <option key={venue} value={venue}>
            {venue}
          </option>
        ))}
      </select>

      {/* Sort */}
      <button
        onClick={() => {
          if (sortBy === 'none') setSortBy('date');
          else if (sortBy === 'date') setSortBy('duration');
          else if (sortBy === 'duration') setSortBy('booth');
          else setSortBy('none');
        }}
        className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-50"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span>
          Sort:{' '}
          {sortBy === 'none'
            ? 'None'
            : sortBy === 'date'
            ? 'Start Date'
            : sortBy === 'duration'
            ? 'Duration'
            : 'Total Booths'}
        </span>
      </button>

      {/* Direction */}
      <button
        onClick={() => setSortAsc(!sortAsc)}
        className="border border-gray-300 rounded-xl px-4 py-2 hover:bg-gray-50"
      >
        {sortAsc ? '⬆ Asc' : '⬇ Desc'}
      </button>
    </div>
  );
}

// component/EditExhibitionModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import editExhibition from '@/libs/editExhibition';
import Image from 'next/image';

export default function EditExhibitionModal({
  exhibition,
  token,
  onClose,
  onSuccess,
}: {
  exhibition: any;
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    name: exhibition.name,
    description: exhibition.description,
    venue: exhibition.venue,
    startDate: exhibition.startDate.split('T')[0],
    durationDay: exhibition.durationDay,
    smallBoothQuota: exhibition.smallBoothQuota,
    bigBoothQuota: exhibition.bigBoothQuota,
    posterPicture: exhibition.posterPicture,
  });

  const [loading, setLoading] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const calculateEndDate = (startDate: string, durationDays: number) => {
    if (!startDate || !durationDays) return '';
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays - 1);
    return end.toLocaleDateString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate start date is not in the past
    if (formData.startDate && formData.startDate < getTodayDate()) {
      alert('Start date cannot be in the past!');
      return;
    }

    setLoading(true);
    try {
      await editExhibition(token, exhibition._id, formData);
      alert('Exhibition updated successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to update exhibition');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="top-0 bg-gradient-to-r from-red-600 to-red-700 border-b border-gray-200 p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">Edit Exhibition</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Exhibition Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exhibition Name *
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter exhibition name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter exhibition description"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none transition-all"
                required
              />
            </div>

            {/* Venue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue *
              </label>
              <input
                name="venue"
                type="text"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter venue location"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                required
              />
            </div>

            {/* Start Date & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={getTodayDate()}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Days) *
                </label>
                <input
                  name="durationDay"
                  type="number"
                  value={formData.durationDay}
                  onChange={handleChange}
                  min="1"
                  placeholder="1"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* End Date Preview */}
            {formData.startDate && formData.durationDay && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-sm text-blue-900">
                  <CalendarIcon className="w-4 h-4" />
                  <span>
                    <strong>End Date:</strong> {calculateEndDate(formData.startDate, Number(formData.durationDay))}
                  </span>
                </div>
              </div>
            )}

            {/* Booth Quotas */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Small Booth Quota *
                </label>
                <input
                  name="smallBoothQuota"
                  type="number"
                  value={formData.smallBoothQuota}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Big Booth Quota *
                </label>
                <input
                  name="bigBoothQuota"
                  type="number"
                  value={formData.bigBoothQuota}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Poster Picture URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Poster Picture URL *
              </label>
              <input
                name="posterPicture"
                type="text"
                value={formData.posterPicture}
                onChange={handleChange}
                placeholder="https://example.com/poster.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                Enter the URL of the exhibition poster image
              </p>
            </div>

            {/* Preview Current Poster */}
            {formData.posterPicture && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Poster Preview
                </label>
                <Image
                  src={formData.posterPicture}
                  alt="Poster preview"
                  width={800} 
                  height={400}
                  className="w-full h-48 object-cover rounded-xl border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:border-gray-400 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
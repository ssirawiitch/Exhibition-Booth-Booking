'use client';

import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Link as LinkIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

type ExhibitionForm = {
  name: string;
  description: string;
  venue: string;
  startDate: string;
  durationDay: number;
  smallBoothQuota: number;
  bigBoothQuota: number;
  posterPicture: string;
};

export default function AddExhibitionModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const token = session?.user?.token;

  const [form, setForm] = useState<ExhibitionForm>({
    name: '',
    description: '',
    venue: '',
    startDate: '',
    durationDay: 1,
    smallBoothQuota: 0,
    bigBoothQuota: 0,
    posterPicture: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  const calculateEndDate = (startDate: string, durationDays: number) => {
    if (!startDate || !durationDays) return '';
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays - 1);
    return end.toLocaleDateString();
  };

  const handleChange = (field: keyof ExhibitionForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert('You are not authorized. Please log in again.');
      return;
    }

    if (form.startDate && form.startDate < getTodayDate()) {
      alert('Start date cannot be in the past!');
      return;
    }

    if (!form.posterPicture.startsWith('http')) {
      alert('Poster Picture must be a valid image URL.');
      return;
    }

    setSubmitting(true);

    try {
      const body = {
        name: form.name,
        description: form.description,
        venue: form.venue,
        startDate: form.startDate,
        durationDay: form.durationDay,
        smallBoothQuota: form.smallBoothQuota,
        bigBoothQuota: form.bigBoothQuota,
        posterPicture: form.posterPicture,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/exhibitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errMsg = await res.text();
        console.error('Response:', errMsg);
        throw new Error('Failed to create exhibition');
      }

      alert('✅ Exhibition created successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add exhibition');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 border-b p-6 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-white">Add New Exhibition</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-red-700 transition">
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Exhibition Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exhibition Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter exhibition name"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter exhibition description"
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 resize-none"
              required
            />
          </div>

          {/* Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Venue *</label>
            <input
              type="text"
              value={form.venue}
              onChange={(e) => handleChange('venue', e.target.value)}
              placeholder="Enter venue location"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Start Date & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                min={getTodayDate()}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days) *</label>
              <input
                type="number"
                value={form.durationDay}
                onChange={(e) =>
                  handleChange('durationDay', parseInt(e.target.value) || 1)
                }
                min="1"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* End Date Preview */}
          {form.startDate && form.durationDay && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 text-sm text-blue-900">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  <strong>End Date:</strong>{' '}
                  {calculateEndDate(form.startDate, form.durationDay)}
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
                type="number"
                value={form.smallBoothQuota}
                onChange={(e) =>
                  handleChange('smallBoothQuota', parseInt(e.target.value) || 0)
                }
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Big Booth Quota *
              </label>
              <input
                type="number"
                value={form.bigBoothQuota}
                onChange={(e) =>
                  handleChange('bigBoothQuota', parseInt(e.target.value) || 0)
                }
                min="0"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          </div>

          {/* Poster Picture URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Poster Picture URL *
            </label>
            <div className="relative">
              <input
                type="url"
                value={form.posterPicture}
                onChange={(e) => handleChange('posterPicture', e.target.value)}
                placeholder="https://drive.google.com/uc?export=view&id=..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 pl-10"
                required
              />
              <LinkIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
            </div>
            {form.posterPicture && (
              <div className="mt-4">
                <Image
                  src={form.posterPicture}
                  alt="Poster Preview"
                  width={800} 
                  height={400}
                  className="w-full h-48 object-cover rounded-xl border"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-all disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Exhibition'}
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

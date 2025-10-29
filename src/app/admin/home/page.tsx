// app/admin/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, Edit, Trash2, Eye, MapPin, Search, X, Check } from 'lucide-react';
import Header from '@/component/Header';

// Mock data for exhibitions
const initialExhibitions = [
  {
    id: 1,
    name: "Tech Summit 2025",
    location: "Bangkok International Trade Center",
    startDate: "2025-03-15",
    endDate: "2025-03-18",
    price: 5000,
    size: "3x3m",
    available: 12,
    total: 20,
    type: "Technology"
  },
  {
    id: 2,
    name: "Food & Beverage Expo",
    location: "Queen Sirikit National Convention Center",
    startDate: "2025-04-05",
    endDate: "2025-04-08",
    price: 3500,
    size: "2x3m",
    available: 8,
    total: 15,
    type: "Food & Beverage"
  },
  {
    id: 3,
    name: "International Auto Show",
    location: "Impact Exhibition Center",
    startDate: "2025-05-20",
    endDate: "2025-05-25",
    price: 8000,
    size: "5x5m",
    available: 5,
    total: 10,
    type: "Automotive"
  }
];

type Exhibition = typeof initialExhibitions[0];
type ModalMode = 'add' | 'edit' | 'view' | null;

export default function AdminHomePage() {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>(initialExhibitions);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [formData, setFormData] = useState<Partial<Exhibition>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const filteredExhibitions = exhibitions.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const openModal = (mode: ModalMode, exhibition?: Exhibition) => {
    setModalMode(mode);
    if (exhibition) {
      setSelectedExhibition(exhibition);
      setFormData(exhibition);
    } else {
      setSelectedExhibition(null);
      setFormData({
        name: '',
        location: '',
        startDate: '',
        endDate: '',
        price: 0,
        size: '',
        available: 0,
        total: 0,
        type: ''
      });
    }
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedExhibition(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate start date is not in the past
    if (formData.startDate && formData.startDate < getTodayDate()) {
      alert('Start date cannot be in the past!');
      return;
    }

    if (modalMode === 'add') {
      // Ensure all required properties are present
      if (!formData.name || !formData.location || !formData.startDate || 
          !formData.endDate || !formData.price || !formData.size || 
          !formData.available || !formData.total || !formData.type) {
        alert('Please fill in all required fields');
        return;
      }

      const newExhibition: Exhibition = {
        id: Math.max(...exhibitions.map(e => e.id)) + 1,
        name: formData.name,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        price: formData.price,
        size: formData.size,
        available: formData.available,
        total: formData.total,
        type: formData.type
      };
      setExhibitions([...exhibitions, newExhibition]);
    } else if (modalMode === 'edit' && selectedExhibition) {
      setExhibitions(exhibitions.map(ex =>
        ex.id === selectedExhibition.id ? { ...ex, ...formData } : ex
      ));
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    setExhibitions(exhibitions.filter(ex => ex.id !== id));
    setDeleteConfirmId(null);
  };

  const handleInputChange = (field: keyof Exhibition, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Navigation */}
      <Header />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-12 pt-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Exhibition Management</h1>
              <p className="text-red-100">Manage all exhibitions and booths</p>
            </div>
            <button
              onClick={() => openModal('add')}
              className="bg-white text-red-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Exhibition</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-20 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">{exhibitions.length}</div>
            <div className="text-gray-600">Total Exhibitions</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">{exhibitions.reduce((sum, ex) => sum + ex.total, 0)}</div>
            <div className="text-gray-600">Total Booths</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">{exhibitions.reduce((sum, ex) => sum + ex.available, 0)}</div>
            <div className="text-gray-600">Available Booths</div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="text-3xl font-bold text-gray-900">
              {exhibitions.reduce((sum, ex) => sum + (ex.total - ex.available), 0)}
            </div>
            <div className="text-gray-600">Booked Booths</div>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search exhibitions by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div> */}

        {/* Exhibitions Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Exhibition Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Booths</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExhibitions.map((exhibition) => (
                  <tr key={exhibition.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">#{exhibition.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{exhibition.name}</div>
                      <div className="text-sm text-gray-500">{exhibition.type}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="max-w-xs truncate">{exhibition.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(exhibition.startDate).toLocaleDateString()} - {new Date(exhibition.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${exhibition.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-green-600 font-medium">{exhibition.available}</span>
                      <span className="text-gray-400"> / </span>
                      <span className="text-gray-600">{exhibition.total}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal('view', exhibition)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openModal('edit', exhibition)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(exhibition.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit/View */}
      {modalMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalMode === 'add' && 'Add New Exhibition'}
                {modalMode === 'edit' && 'Edit Exhibition'}
                {modalMode === 'view' && 'Exhibition Details'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Exhibition Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    min={getTodayDate()}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    min={formData.startDate || getTodayDate()}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <select
                    value={formData.type || ''}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="Technology">Technology</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Booth Size *</label>
                  <input
                    type="text"
                    value={formData.size || ''}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    placeholder="e.g., 3x3m"
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (USD) *</label>
                  <input
                    type="number"
                    value={formData.price || ''}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                    min="0"
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Booths *</label>
                  <input
                    type="number"
                    value={formData.total || ''}
                    onChange={(e) => handleInputChange('total', parseInt(e.target.value))}
                    min="1"
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Available Booths *</label>
                  <input
                    type="number"
                    value={formData.available || ''}
                    onChange={(e) => handleInputChange('available', parseInt(e.target.value))}
                    min="0"
                    max={formData.total || 0}
                    disabled={modalMode === 'view'}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-50"
                    required
                  />
                </div>
              </div>

              {modalMode !== 'view' && (
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-all"
                  >
                    {modalMode === 'add' ? 'Add Exhibition' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:border-gray-400 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {modalMode === 'view' && (
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all"
                >
                  Close
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Exhibition?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this exhibition? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
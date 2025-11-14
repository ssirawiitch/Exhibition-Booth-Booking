"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, MapPin, X } from "lucide-react";
import Header from "@/component/Header";
import getExhibitions from "@/libs/getExhibitions";
import StatAdminSection from "@/component/StatAdminSection";
import Image from "next/image";
import AddExhibitionModal from "@/component/AddExhibitionModal";
import deleteExhibition from "@/libs/deleteExhibition";
import { useSession } from "next-auth/react";
import EditExhibitionModal from "@/component/EditExhibitionModal";
import AdminSearchFilterBar from "@/component/AdminSearchFilterBar";
import getUserProfile from "@/libs/getUserProfile";

type Exhibition = {
  _id: string;
  name: string;
  description: string;
  venue: string;
  startDate: string;
  durationDay: number;
  smallBoothQuota: number;
  bigBoothQuota: number;
  posterPicture: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

type ModalMode = "add" | "edit" | "view" | null;

export default function AdminHomePage() {
  const { data: session } = useSession();
  const tokens = session?.user?.token as string | undefined;

  useEffect(() => {
    const checkRole = async () => {
      if (!tokens) return;

      try {
        const profile = await getUserProfile(tokens);

        if (profile.data.role !== "admin") {
          // alert("Unauthorized: Only admin can access this page");
          window.location.href = "/";
        }
      } catch (err) {
        console.error("Error checking role:", err);
        // alert("Unable to verify your role.");
        window.location.href = "/";
      }
    };

    checkRole();
  }, [tokens]);

  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedExhibition, setSelectedExhibition] =
    useState<Exhibition | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [venueFilter, setVenueFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"none" | "date" | "duration" | "booth">(
    "none"
  );
  const [sortAsc, setSortAsc] = useState(true);

  // โหลดข้อมูลเมื่อเปิดหน้า
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getExhibitions();
        // API response มีรูปแบบ { success, count, data: [...] }
        setExhibitions(res.data || []);
      } catch (err) {
        console.error("Error fetching exhibitions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (mode: ModalMode, exhibition?: Exhibition) => {
    setModalMode(mode);
    if (exhibition) setSelectedExhibition(exhibition);
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedExhibition(null);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this exhibition?"
    );
    if (!confirmDelete) return;

    try {
      if (!tokens) return alert("Not authenticated");
      await deleteExhibition(tokens, id);

      setExhibitions((prev) => prev.filter((ex) => ex._id !== id));
      alert("Exhibition deleted successfully ✅");
    } catch (err) {
      console.error("Error deleting exhibition:", err);
      alert("Failed to delete exhibition ❌");
    }
  };

  // กรอง + เรียงข้อมูลตาม search/filter/sort
  const filteredExhibitions = React.useMemo(() => {
    let result = [...exhibitions];

    // 1. Filter by search term
    if (searchTerm.trim() !== "") {
      result = result.filter((ex) =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by venue
    if (venueFilter !== "all") {
      result = result.filter((ex) => ex.venue === venueFilter);
    }

    // 3. Sort
    if (sortBy !== "none") {
      result.sort((a, b) => {
        let valueA = 0,
          valueB = 0;

        if (sortBy === "date") {
          valueA = new Date(a.startDate).getTime();
          valueB = new Date(b.startDate).getTime();
        } else if (sortBy === "duration") {
          valueA = a.durationDay;
          valueB = b.durationDay;
        } else if (sortBy === "booth") {
          valueA = a.smallBoothQuota + a.bigBoothQuota;
          valueB = b.smallBoothQuota + b.bigBoothQuota;
        }

        return sortAsc ? valueA - valueB : valueB - valueA;
      });
    }
    return result;
  }, [exhibitions, searchTerm, venueFilter, sortBy, sortAsc]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-600 text-lg">Loading exhibitions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      {/* Navigation */}
      <Header />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 py-10 pt-30">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Exhibition Management</h1>
            <p className="text-red-100">Manage all exhibitions and booths</p>
          </div>
          <button
            onClick={() => openModal("add")}
            className="bg-white text-red-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Exhibition</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <StatAdminSection exhibitions={exhibitions} />

        <AdminSearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          venueFilter={venueFilter}
          setVenueFilter={setVenueFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortAsc={sortAsc}
          setSortAsc={setSortAsc}
          venues={[...new Set(exhibitions.map((ex) => ex.venue))]}
        />

        {/* Exhibitions Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Exhibition Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Venue
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Booths
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredExhibitions.map((ex, i) => (
                  <tr
                    key={ex._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      #{i + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{ex.name}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {ex.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="max-w-xs truncate">{ex.venue}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(ex.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ex.durationDay} days
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-gray-800 font-medium">
                        {ex.smallBoothQuota + ex.bigBoothQuota}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal("view", ex)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => openModal("edit", ex)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(ex._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredExhibitions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No exhibitions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {modalMode === "view" && selectedExhibition && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-2xl font-bold">{selectedExhibition.name}</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <Image
              src={selectedExhibition.posterPicture}
              alt={selectedExhibition.name}
              width={800}
              height={400}
              className="w-full h-56 object-cover rounded-lg mb-4"
              priority={true}
            />
            <p className="text-gray-700 mb-2">
              {selectedExhibition.description}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              📍 {selectedExhibition.venue}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              📅 Start Date:{" "}
              {new Date(selectedExhibition.startDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              🏷 Duration: {selectedExhibition.durationDay} days
            </p>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {modalMode === "add" && (
        <AddExhibitionModal
          onClose={closeModal}
          onSuccess={() => {
            // reload exhibitions after adding new one
            (async () => {
              const res = await getExhibitions();
              setExhibitions(res.data || []);
            })();
          }}
        />
      )}

      {/* Edit Modal */}
      {modalMode === "edit" && selectedExhibition && (
        <EditExhibitionModal
          exhibition={selectedExhibition}
          token={tokens || ""}
          onClose={closeModal}
          onSuccess={async () => {
            const res = await getExhibitions();
            setExhibitions(res.data || []);
          }}
        />
      )}
    </div>
  );
}

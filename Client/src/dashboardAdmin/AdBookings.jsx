import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // دالة لجلب جميع الحجوزات
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/users/all`, {
        params: { status: statusFilter, page, limit: 10 }
      });
      console.log("resss",response)
      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter, page]);

  // دالة لتغيير الفلتر
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(1); // عند تغيير الفلتر نعيد الصفحة إلى الأولى
  };

  // دالة لتغيير الصفحة
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Ad Booking Requests</h2>

      {/* فلتر الحالة */}
      <div className="mb-6">
        <label className="mr-4">Filter by status:</label>
        <select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* جدول عرض الحجوزات */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-2 text-left">User Name</th>
              <th className="px-6 py-2 text-left">Influencer Name</th>
              <th className="px-6 py-2 text-left">Campaign Title</th>
              <th className="px-6 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4">{booking?.User?.name}<div></div>{booking?.User?.email}</td>
                {/* <td className="px-6 py-4">{booking?.User?.email}</td> */}
                <td className="px-6 py-4">{booking?.InfluencerRegistration?.User?.name}<div></div>{booking?.InfluencerRegistration?.User?.email}</td>
                <td className="px-6 py-4">{booking?.campaignTitle}</td>
                <td className="px-6 py-4">{booking?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Previous
        </button>
        <span className="px-4 py-2">{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdBookings;

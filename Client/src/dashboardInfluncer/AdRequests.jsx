
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BadgeCheck, XCircle, Eye, RefreshCw } from 'lucide-react';
import { useSelector } from 'react-redux';
const AdRequests = () => {
  const Influencer = useSelector((state) => state.user.currentUser);
  console.log("Influencer",Influencer)
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

 

  const fetchAdRequests = async () => {
    if (!Influencer  ) {
      console.error('Influencer data or ID is missing');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/users/influencer/${Influencer.id}`); 
     console.log("knkjh",response)
      setRequests(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setLoading(false);
    }
  };
 useEffect(() => {

    fetchAdRequests();
  },[Influencer]);
  const handleStatusChange = async (requestId, status) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/users/update-status/${requestId}`, {
        status,
        scheduledDate: `${scheduleDate}T${scheduleTime}:00`,  // دمج التاريخ مع الوقت
      });
      fetchAdRequests();  // تحديث الطلبات بعد التعديل
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleAddSchedule = async () => {
    try {
      await handleStatusChange(selectedRequest.id, 'scheduled');  
      setSelectedRequest(null);
      setScheduleDate('');
      setScheduleTime('');
    } catch (error) {
      console.error('Error adding schedule:', error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      case 'scheduled':
        return 'Scheduled';
        case 'paid':
          return 'Paid';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'accepted':
        return 'bg-blue-300 text-white';
      case 'rejected':
        return 'bg-red-600 text-white';
      case 'scheduled':
        return 'bg-blue-600 text-white';
        case 'paid':
          return 'bg-green-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const filteredRequests = requests.filter((request) => 
    filter === 'all' || request.status === filter
  );

  return (
    <div className="p-6 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Ad Requests</h2>
        <p className="text-gray-600">Manage incoming advertisement requests from brands</p>
      </div>

      {/* Filter and View Toggle */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <span className="text-gray-700">Filter by:</span>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('accepted')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Accepted
            </button>
            <button 
              onClick={() => setFilter('rejected')} 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Rejected
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setViewMode('cards')} 
            className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'cards' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <span>Card View</span>
          </button>
          <button 
            onClick={() => setViewMode('table')} 
            className={`px-3 py-1 rounded-md text-sm flex items-center ${viewMode === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <span>Table View</span>
          </button>
          <button
            onClick={fetchAdRequests}
            className="p-2 bg-purple-100 rounded-full text-purple-700 hover:bg-purple-200 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Loading or No Requests Message */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No {filter !== 'all' ? `${getStatusText(filter)} ` : ''}requests available.</p>
        </div>
      ) : viewMode === 'cards' ? (
        // Card View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-5 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">{request.campaignTitle}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusText(request.status)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{request.brief}</p>
              </div>
              <div className="p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">Budget:</span>
                  <span className="font-semibold text-purple-700">${request.proposedPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Date:</span>
                  <span className="text-sm">{new Date(request.requestedDate).toLocaleDateString()} {new Date(request.requestedDate).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="p-4 flex gap-2 bg-gray-50 border-t border-gray-100">
                {request.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(request.id, 'accepted')}
                      className="flex-1 flex justify-center items-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                    >
                      <BadgeCheck size={16} className="mr-2" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(request.id, 'rejected')}
                      className="flex-1 flex justify-center items-center py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleViewDetails(request)}
                  className="flex-1 flex justify-center items-center py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
                >
                  <Eye size={16} className="mr-2" />
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table View
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.campaignTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${request.proposedPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.requestedDate).toLocaleDateString()} {new Date(request.requestedDate).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusText(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(request.id, 'accepted')}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(request.id, 'rejected')}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="mt-2 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for viewing request details */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h3 className="text-xl font-bold mb-4">Request Details</h3>
            <p className="text-gray-700 mb-2">Title: {selectedRequest.campaignTitle}</p>
            <p className="text-gray-700 mb-2">Details: {selectedRequest.brief}</p>
            <p className="text-gray-700 mb-2">Budget: ${selectedRequest.proposedPrice}</p>
            <p className="text-gray-700 mb-2">Status: {getStatusText(selectedRequest.status)}</p>
           
            {selectedRequest.status === 'paid' && (
            <div className="mb-4">
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mt-2"
              />
            </div>

 )}

            <div className="flex justify-between gap-2">
            {selectedRequest.status === 'paid' && ( 
                 <button onClick={handleAddSchedule} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">
                Add Schedule
              </button>
           
            )}
          
              <button onClick={() => setSelectedRequest(null)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdRequests;

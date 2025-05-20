
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify'; 
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('');
  const [filterReadStatus, setFilterReadStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'

  
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/contact/getMessagesByReadStatus?status=${filterReadStatus}`
        );

        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          setMessages([]);
        }

        setLoading(false);
      } catch (error) {
        setError('Failed to load messages.');
        setLoading(false);
      }
    };

    fetchMessages();
  }, [filterReadStatus]);

 
  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/contact/messages/${id}/read`);

      // Refetch messages to update UI
      const response = await axios.get(
        `http://localhost:4000/api/contact/getMessagesByReadStatus?status=${filterReadStatus}`
      );

      if (Array.isArray(response.data)) {
        setMessages(response.data);
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
      setError("Failed to update message status.");
    }
  };


  const handleReply = async (messageId) => {
    if (!replyText.trim()) return;

    try {
      await axios.post(`http://localhost:4000/api/contact/reply/${messageId}`, {
        replyText: replyText
      });

      // Reset text and close reply form
      setReplyText('');
      setSelectedMessage(null);
      
      // Show success notification
      toast.success("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
      setError("Failed to send reply.");
    }
  };

  // Filter messages based on search
  const filteredMessages = Array.isArray(messages) ? messages.filter((msg) => {
    return msg.message?.toLowerCase().includes(filter.toLowerCase()) || 
           msg.name?.toLowerCase().includes(filter.toLowerCase()) ||
           msg.email?.toLowerCase().includes(filter.toLowerCase());
  }) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Messages</h1>
          <p className="text-gray-500">Review and respond to incoming messages</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex  space-x-2">
          {/* <span className="text-sm text-gray-500">View:</span> */}
          {/* <div className="flex bg-gray-100 rounded-lg p-1"> */}
            <button
               className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                   viewMode === 'table' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
              onClick={() => setViewMode('table')}
            >
         Table View
            </button>
            <button
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                   viewMode === 'card' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
              onClick={() => setViewMode('card')}
            >
                  Card View
            </button>
          {/* </div> */}
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto md:flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm text-gray-500 mr-2 hidden md:inline">Filter:</span>
            
            <div className="relative flex-grow">
              <select
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent cursor-pointer w-full"
                value={filterReadStatus}
                onChange={(e) => setFilterReadStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mt-2">
          Showing <span className="font-medium text-gray-700">{filteredMessages.length}</span> messages
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100 mb-8">
          {filteredMessages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((msg, index) => (
                    <React.Fragment key={msg.contact_id}>
                      <tr className={`${msg.read ? "" : "bg-purple-50"} hover:bg-gray-50`}>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          #{msg.contact_id || index + 1}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                              {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{msg.name}</div>
                              <div className="text-sm text-gray-500">{msg.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{msg.message}</div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(msg.created_at || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            msg.read ? 'bg-gray-100 text-gray-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {msg.read ? 'Read' : 'Unread'}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {!msg.read && (
                              <button 
                                onClick={() => markAsRead(msg.contact_id)}
                                className="px-2 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center text-xs"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Read
                              </button>
                            )}
                            <button
                              className="px-2 py-1 bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition-colors flex items-center text-xs"
                              onClick={() => setSelectedMessage(selectedMessage === msg.contact_id ? null : msg.contact_id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                              Reply
                            </button>
                          </div>
                        </td>
                      </tr>
                      {selectedMessage === msg.contact_id && (
                        <tr>
                          <td colSpan="6" className="px-4 py-4 bg-gray-50 border-t border-b border-gray-200">
                            <div className="mx-8">
                              <textarea
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-sm"
                                rows="3"
                                placeholder="Type your reply here..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                              ></textarea>
                              <div className="flex justify-end mt-2 space-x-2">
                                <button
                                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors text-sm"
                                  onClick={() => {
                                    setSelectedMessage(null);
                                    setReplyText('');
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                                  onClick={() => handleReply(msg.contact_id)}
                                  disabled={!replyText.trim()}
                                >
                                  Send Reply
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No messages found</h3>
              <p className="text-gray-500">
                {filterReadStatus !== 'all' 
                  ? `There are no ${filterReadStatus} messages.` 
                  : 'Try adjusting your search or filter criteria.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.contact_id}
                className="bg-white rounded-lg shadow-md border border-purple-100 hover:shadow-lg transition-all duration-200"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                        {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium text-gray-900">{msg.name}</h3>
                        <p className="text-sm text-gray-500">{msg.email}</p>
                        <p className="text-xs text-gray-400">ID: #{msg.contact_id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        msg.read ? 'bg-gray-100 text-gray-600' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {msg.read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg text-gray-800 mb-3 ${
                      msg.read ? 'bg-gray-50' : 'bg-purple-50 border-l-4 border-purple-500'
                    }`}
                    onClick={() => {
                      if (!msg.read) {
                        markAsRead(msg.contact_id);
                      }
                    }}
                  >
                    {msg.message}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(msg.created_at || Date.now()).toLocaleDateString()}
                    </span>
                    
                    <div className="flex space-x-2">
                      {!msg.read && (
                        <button 
                          onClick={() => markAsRead(msg.contact_id)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Mark as Read
                        </button>
                      )}
                      
                      <button
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded hover:bg-purple-100 transition-colors flex items-center text-sm"
                        onClick={() => setSelectedMessage(selectedMessage === msg.contact_id ? null : msg.contact_id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                  
                  {/* Reply Form */}
                  {selectedMessage === msg.contact_id && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <textarea
                        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent text-sm"
                        rows="3"
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors text-sm"
                          onClick={() => {
                            setSelectedMessage(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors text-sm"
                          onClick={() => handleReply(msg.contact_id)}
                          disabled={!replyText.trim()}
                        >
                          Send Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center border border-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No messages found</h3>
              <p className="text-gray-500">
                {filterReadStatus !== 'all' 
                  ? `There are no ${filterReadStatus} messages.` 
                  : 'Try adjusting your search or filter criteria.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
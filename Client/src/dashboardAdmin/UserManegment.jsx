import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Eye, XCircle, CheckCircle, Users } from 'lucide-react';
import axios from 'axios';
const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [viewType, setViewType] = useState('table');

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/user/users');
            if (response.data.success) {
              setUsers(response.data.users);
              console.log(response.data.users)
            }
          } catch (error) {
            console.error('Error fetching users:', error);
          } finally {
            setLoading(false);
          }
        };
    
    fetchUsers();
  }, []);

  // Apply filters
  const filteredUsers = users.filter(user => {
    const matchesQuery = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    return matchesQuery && matchesRole;
  });

  // Toggle view type between table and cards
  const toggleViewType = (type) => {
    setViewType(type);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500">Review and manage user registrations</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => toggleViewType('table')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewType === 'table' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Table View
          </button>
          <button 
            onClick={() => toggleViewType('card')}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${viewType === 'card' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Card View
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-purple-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-auto md:flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or phone..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <Filter size={18} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-500 mr-2 hidden md:inline">Filter:</span>
            <div className="relative flex-grow">
              <select
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent cursor-pointer w-full"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="influencer">Influencer</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          Showing <span className="font-medium text-gray-700">{filteredUsers.length}</span> out of <span className="font-medium text-gray-700">{users.length}</span> users
        </div>
      </div>

      {/* Table View */}
      {viewType === 'table' && (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-purple-100 mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={user.image} alt={user.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'influencer' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
{user.role === 'influencer' ? 'Influencer' : user.role === 'admin' ? 'Admin' : 'User'}
</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.adminApproved === 'approved' ? 'bg-green-100 text-green-800' :
                          user.adminApproved === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.adminApproved}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors">
                            <CheckCircle size={16} />
                          </button>
                          <button className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                            <XCircle size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center">
                        <Users size={36} className="text-gray-300 mb-2" />
                        <p className="text-gray-500">No users found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Card View */}
      {viewType === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow overflow-hidden border border-purple-100">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-100">
                      <img 
                        src={user.image} 
                        alt={user.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.location}</p>
                    </div>
                    <div className="ml-auto">
                      {/* <span className={`px-3 py-1 text-xs rounded-full ${
                        user.role === 'influencer' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span> */}
                      <span
  // className={`px-3 py-1 text-xs rounded-full ${
  //   user.role?.toLowerCase() === "influencer"
  //     ? "bg-purple-100 text-purple-800"
  //     : user.role?.toLowerCase() === "admin"
  //     ? "bg-red-100 text-red-800"
  //     : "bg-blue-100 text-blue-800"
  // }`}
>
  {user.role}
</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center my-1">
                        <span className="font-medium mr-2">Email:</span> {user.email}
                      </div>
                      <div className="flex items-center my-1">
                        <span className="font-medium mr-2">Phone:</span> {user.phone}
                      </div>
                      <div className="flex items-center my-1">
                        <span className="font-medium mr-2">Status:</span> 
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          user.adminApproved === 'approved' ? 'bg-green-100 text-green-800' :
                          user.adminApproved === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {user.adminApproved}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between border-t pt-4">
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center text-sm">
                      <Eye size={16} className="mr-1" />
                      View Details
                    </button>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors">
                        <XCircle size={16} />
                      </button>
                      <button className="p-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors">
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center border border-purple-100">
              <Users size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 mb-2">No users found</h3>
              <p className="text-gray-500">
                {roleFilter !== 'all' 
                  ? `There are no users with ${roleFilter} role.` 
                  : 'Try adjusting your search or filter criteria.'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
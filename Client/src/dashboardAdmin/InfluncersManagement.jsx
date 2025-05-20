
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Users, 
//   CheckCircle, 
//   XCircle, 
//   Clock, 
//   Filter,
//   Search,
//   ChevronDown,
//   Instagram,
//   Twitter,
//   Youtube,
//   Globe,
//   Mail,
//   Phone,
//   Download
// } from 'lucide-react';

// const InfluencersManagement = () => {
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [influencers, setInfluencers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetching influencers from the backend
//   useEffect(() => {
//     const fetchInfluencers = async () => {
//       try {
//         const params = new URLSearchParams();
//         if (searchQuery) params.append("search", searchQuery);
//         if (statusFilter !== 'all') params.append("status", statusFilter);

//         const response = await axios.get(`http://localhost:4000/api/influencer/getAllInfluencers?${params.toString()}`);
//         setInfluencers(response.data.influencers);  // Assuming the backend returns data in { influencers: [...] }
//         setLoading(false);
//         console.log(response.data.influencers);
//       } catch (error) {
//         console.error("Error fetching influencers:", error);
//         setLoading(false);
//       }
//     };
    
//     fetchInfluencers();
//   }, [searchQuery, statusFilter]);

//   const handleApprove = async (id) => {
//     try {
//       const response = await axios.put(`http://localhost:4000/api/influencer/${id}/approve`);
//       setInfluencers(prevInfluencers =>
//         prevInfluencers.map(influencer =>
//           influencer.user.id === id ? { 
//             ...influencer.user, 
//             adminApproved: 'approve',
//             updatedAt: response.data.updatedAt, 
//           } : influencer
//         )
//       );
//     } catch (error) {
//       console.error("Error approving influencer:", error);
//     }
//   };

//   const handleReject = async (id, reason = 'Content doesn\'t align with our platform guidelines') => {
//     try {
//       const response = await axios.put(`http://localhost:4000/api/influencer/${id}/reject`, { reason });
//       setInfluencers(prevInfluencers =>
//         prevInfluencers.map(influencer =>
//           influencer.user.id === id ? { 
//             ...influencer, 
//             adminApproved: 'reject',
//             updatedAt: response.data.user.updatedAt,
        
//           } : influencer
//         )
//       );
//     } catch (error) {
//       console.error("Error rejecting influencer:", error);
//     }
//   };

//   const filteredInfluencers = influencers.filter(influencer => {
//     if (statusFilter !== 'all' && influencer.influencerRegistration.status !== statusFilter) {
//       return false;
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       return (
//         influencer.user.name.toLowerCase().includes(query) ||
//         influencer.user.username.toLowerCase().includes(query) ||
//         influencer.user.email.toLowerCase().includes(query) ||
//         influencer.influencerRegistration.category.toLowerCase().includes(query)
//       );
//     }

//     return true;
//   });

//   const StatusBadge = ({ status }) => {
//     let badgeClass = '';
//     let icon = null;
//     let label = '';
    
//     switch(status) {
//       case 'approved':
//         badgeClass = 'bg-green-100 text-green-800';
//         icon = <CheckCircle size={14} className="mr-1" />;
//         label = 'Approved';
//         break;
//       case 'rejected':
//         badgeClass = 'bg-red-100 text-red-800';
//         icon = <XCircle size={14} className="mr-1" />;
//         label = 'Rejected';
//         break;
//       case 'pending':
//       default:
//         badgeClass = 'bg-yellow-100 text-yellow-800';
//         icon = <Clock size={14} className="mr-1" />;
//         label = 'Pending';
//     }
    
//     return (
//       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
//         {icon}
//         {label}
//       </span>
//     );
//   };

//   const PlatformIcon = ({ platform }) => {
//     switch(platform) {
//       case 'instagram':
//         return <Instagram size={16} className="text-pink-500" />;
//       case 'twitter':
//         return <Twitter size={16} className="text-blue-400" />;
//       case 'youtube':
//         return <Youtube size={16} className="text-red-500" />;
//       case 'website':
//       default:
//         return <Globe size={16} className="text-gray-500" />;
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Influencer Management</h1>
//           <p className="text-gray-500">Review and manage influencer applications</p>
//         </div>
//         <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
//           <Download size={16} className="mr-2" />
//           Export Data
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-purple-100">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search influencers..."
//               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Filter size={18} className="text-gray-500" />
//             <span className="text-sm text-gray-500">Filter by status:</span>
            
//             <div className="relative">
//               <select
//                 className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent cursor-pointer"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <ChevronDown size={16} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <div className="text-sm text-gray-500">
//           Showing <span className="font-medium text-gray-700">{filteredInfluencers.length}</span> out of <span className="font-medium text-gray-700">{influencers.length}</span> influencers
//         </div>
//       </div>

//       <div className="space-y-6">
//         {filteredInfluencers.map(influencer => (
//           <div key={influencer.user.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row">
//                 <div className="flex md:w-1/3 mb-4 md:mb-0">
//                   <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-purple-200">
//                     <img 
//                       src={`http://localhost:4000/${influencer.influencerRegistration.profileImage}`}  
//                       alt={influencer.user.name} 
//                       className="h-full w-full object-cover" 
//                     />
//                   </div>
//                   <div className="ml-4">
//                     <h3 className="text-lg font-semibold text-gray-800">{influencer.user.name}</h3>
//                     <p className="text-gray-500 text-sm">{influencer.user.location}</p>
//                     <div className="flex items-center mt-2">
//                       <StatusBadge status={influencer.user.adminApproved} />
//                       <span className="ml-3 text-sm text-gray-500">
//                         Applied: {influencer.user.createdAt}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="md:w-1/3 mb-4 md:mb-0">
//                   <div className="grid grid-cols-1 gap-2">
//                     <div className="flex items-center text-sm text-gray-600">
//                       <Mail size={14} className="mr-2 text-gray-400" />
//                       {influencer.user.email}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <Phone size={14} className="mr-2 text-gray-400" />
//                       {influencer.user.phone}
//                     </div>
//                     <div className="flex items-center text-sm text-gray-600">
//                       <Users size={14} className="mr-2 text-gray-400" />
//                       {influencer.influencerRegistration.followers} followers
//                     </div>
//                   </div>
//                 </div>

//                 <div className="md:w-1/3 flex flex-col justify-between">
//                   <div>
//                     <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
//                       {influencer.influencerRegistration.category}
//                     </span>
//                     <p className="text-sm text-gray-500 mt-2 line-clamp-2">{influencer.influencerRegistration.bio}</p>
//                   </div>
                  
//                   {influencer.user.adminApproved === 'pending' && (
//                     <div className="flex justify-end mt-4 space-x-2">
//                       <button 
//                         onClick={() => handleReject(influencer.user.id)}
//                         className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
//                       >
//                         Reject
//                       </button>
//                       <button 
//                         onClick={() => handleApprove(influencer.user.id)}
//                         className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
//                       >
//                         Approve
//                       </button>
//                     </div>
//                   )}

//                   {influencer.influencerRegistration.status === 'approved' && (
//                     <div className="flex justify-end mt-4">
//                       <p className="text-sm text-gray-500">
//                         Approved on: {influencer.influencer.user.updatedAt}
//                       </p>
//                     </div>
//                   )}
                  
//                   {influencer.influencerRegistration.status === 'rejected' && (
//                     <div className="flex justify-end mt-4">
//                       <p className="text-sm text-gray-500">
//                         Rejected on: {influencer.influencer.user.updatedAt}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {influencer.influencerRegistration.status === 'rejected' && (
//                 <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
//                   <strong>Rejection reason:</strong> {influencer.influencerRegistration.rejectionReason}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {filteredInfluencers.length === 0 && (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center border border-purple-100">
//             <Users size={48} className="mx-auto text-gray-300 mb-4" />
//             <h3 className="text-lg font-medium text-gray-800 mb-2">No influencers found</h3>
//             <p className="text-gray-500">
//               {statusFilter !== 'all' 
//                 ? `There are no influencers with ${statusFilter} status.` 
//                 : 'Try adjusting your search or filter criteria.'}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InfluencersManagement;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter,
  Search,
  ChevronDown,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Mail,
  Phone,
  Download,
  Eye,
  X
} from 'lucide-react';

const InfluencersManagement = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [viewType, setViewType] = useState('table');
  // Fetching influencers from the backend
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (statusFilter !== 'all') params.append("status", statusFilter);

        const response = await axios.get(`http://localhost:4000/api/influencer/getAllInfluencers?${params.toString()}`);
        setInfluencers(response.data.influencers);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching influencers:", error);
        setLoading(false);
      }
    };
    
    fetchInfluencers();
  }, [searchQuery, statusFilter]);

  const handleApprove = async (id) => {

    try {
      const response = await axios.put(`http://localhost:4000/api/influencer/${id}/status`, {
        status: 'approved',
      });
  
      setInfluencers(prevInfluencers =>
        prevInfluencers.map(influencer =>
          influencer.user.id === id
            ? {
                ...influencer,
                user: {
                  ...influencer.user,
                  adminApproved: 'approved',
                  updatedAt: response.data.influencer.updatedAt,
                },
              }
            : influencer
        )
      );
    } catch (error) {
      console.error("Error approving influencer:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/influencer/${id}/status`, {
        status: 'rejected',
      });
  
      setInfluencers(prevInfluencers =>
        prevInfluencers.map(influencer =>
          influencer.user.id === id
            ? {
                ...influencer,
                user: {
                  ...influencer.user,
                  adminApproved: 'rejected',
                  updatedAt: response.data.influencer.updatedAt,
                },
              }
            : influencer
        )
      );
    } catch (error) {
      console.error("Error rejecting influencer:", error);
    }
  };

 
  useEffect(() => {
    handleApprove();
    handleReject();
},[])
  const filteredInfluencers = influencers.filter(influencer => {
    if (statusFilter !== 'all' && influencer.user.adminApproved !== statusFilter) {
      return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        influencer.user.name?.toLowerCase().includes(query) ||
        influencer.user.email?.toLowerCase().includes(query) ||
        influencer.influencerRegistration?.contentCategories?.some(cat => 
          cat.toLowerCase().includes(query)
        )
      );
    }

    return true;
  });

  const StatusBadge = ({ status }) => {
    let badgeClass = '';
    let icon = null;
    let label = '';
    
    switch(status) {
      case 'approved':
        badgeClass = 'bg-green-100 text-green-800';
        icon = <CheckCircle size={14} className="mr-1" />;
        label = 'Approved';
        break;
      case 'rejected':
        badgeClass = 'bg-red-100 text-red-800';
        icon = <XCircle size={14} className="mr-1" />;
        label = 'Rejected';
        break;
      case 'pending':
      default:
        badgeClass = 'bg-yellow-100 text-yellow-800';
        icon = <Clock size={14} className="mr-1" />;
        label = 'Pending';
    }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}>
        {icon}
        {label}
      </span>
    );
  };

  const handleViewInfluencer = (influencer) => {
    setSelectedInfluencer(influencer);
  };

  const closeDetailView = () => {
    setSelectedInfluencer(null);
  };
  
  const toggleViewType = (type) => {
    setViewType(type);
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;


return (
  <div className="bg-gray-50 min-h-screen p-4 md:p-6">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Influencer Management</h1>
        <p className="text-gray-500">Review and manage influencer applications</p>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={() => toggleViewType('table')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            viewType === 'table' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Table View
        </button>
        <button 
          onClick={() => toggleViewType('card')}
          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
            viewType === 'card' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Card View
        </button>
        {/* <button className="flex items-center px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          <Download size={16} className="mr-1" />
          Export
        </button> */}
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
            placeholder="Search influencers..."
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
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mt-2">
        Showing <span className="font-medium text-gray-700">{filteredInfluencers.length}</span> out of <span className="font-medium text-gray-700">{influencers.length}</span> influencers
      </div>
    </div>

    {/* Table View */}
    {viewType === 'table' && (
      <div className="bg-white rounded-lg shadow overflow-hidden border border-purple-100 mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Followers</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Categories</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInfluencers.length > 0 ? (
                filteredInfluencers.map((influencer) => (
                  <tr key={influencer.user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden">
                          <img 
                            src={`http://localhost:4000/${influencer.influencerRegistration.profileImage}`} 
                            alt={influencer.user.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{influencer.user.name}</div>
                          <div className="text-sm text-gray-500 hidden sm:block">{influencer.user.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-900">{influencer.user.email}</div>
                      <div className="text-sm text-gray-500">{influencer.user.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-gray-900">
                        {influencer.influencerRegistration.stats?.followers || '0'}
                      </div>
                      <div className="text-sm text-gray-500 hidden md:block">
                        {influencer.influencerRegistration.stats?.engagementRate || '0%'} engagement
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-sm text-gray-900">
                        {influencer.influencerRegistration.contentCategories?.slice(0, 2).join(', ')}
                        {influencer.influencerRegistration.contentCategories?.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={influencer.user.adminApproved} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button 
                          onClick={() => handleViewInfluencer(influencer)}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {influencer.user.adminApproved === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleReject(influencer.influencerRegistration.id)}
                              className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                            >
                              <XCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleApprove(influencer.influencerRegistration.id)}
                              className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                            >
                              <CheckCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center">
                      <Users size={36} className="text-gray-300 mb-2" />
                      <p className="text-gray-500">No influencers found</p>
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
        {filteredInfluencers.length > 0 ? (
          filteredInfluencers.map((influencer) => (
            <div key={influencer.user.id} className="bg-white rounded-lg shadow overflow-hidden border border-purple-100">
              <div className="p-4">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-100">
                    <img 
                      src={`http://localhost:4000/${influencer.influencerRegistration.profileImage}`} 
                      alt={influencer.user.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{influencer.user.name}</h3>
                    <p className="text-sm text-gray-500">{influencer.user.location}</p>
                  </div>
                  <div className="ml-auto">
                    <StatusBadge status={influencer.user.adminApproved} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Followers</p>
                    <p className="text-sm font-medium">{influencer.influencerRegistration.stats?.followers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Engagement</p>
                    <p className="text-sm font-medium">{influencer.influencerRegistration.stats?.engagementRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Categories</p>
                    <p className="text-sm font-medium line-clamp-1">
                      {influencer.influencerRegistration.contentCategories?.join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Contact</p>
                    <p className="text-sm font-medium truncate">{influencer.user.email}</p>
                  </div>
                </div>
                
                <div className="flex justify-between border-t pt-4">
                  <button 
                    onClick={() => handleViewInfluencer(influencer)}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors flex items-center text-sm"
                  >
                    <Eye size={16} className="mr-1" />
                    View Details
                  </button>
                  
                  {influencer.user.adminApproved === 'pending' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleReject(influencer.user.id)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                      >
                        <XCircle size={16} />
                      </button>
                      <button 
                        onClick={() => handleApprove(influencer.user.id)}
                        className="px-3 py-2 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center border border-purple-100">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No influencers found</h3>
            <p className="text-gray-500">
              {statusFilter !== 'all' 
                ? `There are no influencers with ${statusFilter} status.` 
                : 'Try adjusting your search or filter criteria.'}
            </p>
          </div>
        )}
      </div>
    )}

    {/* Detail View Modal */}
    {selectedInfluencer && (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-2 md:p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-y-auto">
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-lg font-semibold">Influencer Details</h3>
            <button onClick={closeDetailView} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left column */}
              <div className="md:w-1/3">
                <div className="mb-6">
                  <div className="h-24 w-24 md:h-32 md:w-32 mx-auto rounded-full overflow-hidden border-4 border-purple-100">
                    <img 
                      src={`http://localhost:4000/${selectedInfluencer.influencerRegistration.profileImage}`} 
                      alt={selectedInfluencer.user.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <h2 className="text-xl font-bold text-center mt-4">{selectedInfluencer.user.name}</h2>
                  <p className="text-gray-500 text-center">{selectedInfluencer.user.location}</p>
                  <div className="flex justify-center mt-2">
                    <StatusBadge status={selectedInfluencer.user.adminApproved} />
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-medium mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm overflow-hidden text-ellipsis">{selectedInfluencer.user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{selectedInfluencer.user.phone}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-3 mt-4">Social Links</h3>
                  <div className="space-y-2">
                    {selectedInfluencer.influencerRegistration.socialLinks?.map((link, index) => (
                      <div key={index} className="flex items-center">
                        {link.platform === 'instagram' && <Instagram size={16} className="text-pink-500 mr-2" />}
                        {link.platform === 'twitter' && <Twitter size={16} className="text-blue-400 mr-2" />}
                        {link.platform === 'youtube' && <Youtube size={16} className="text-red-500 mr-2" />}
                        {link.platform === 'website' && <Globe size={16} className="text-gray-500 mr-2" />}
                        <span className="text-sm text-blue-600 underline overflow-hidden text-ellipsis">{link.url}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right column */}
              <div className="md:w-2/3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-purple-50 rounded-lg p-3">
                    <h3 className="text-xs font-medium text-purple-700 mb-1">Followers</h3>
                    <p className="text-lg md:text-xl font-bold">{selectedInfluencer.influencerRegistration.stats?.followers}</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-3">
                    <h3 className="text-xs font-medium text-blue-700 mb-1">Engagement</h3>
                    <p className="text-lg md:text-xl font-bold">{selectedInfluencer.influencerRegistration.stats?.engagementRate}</p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-3">
                    <h3 className="text-xs font-medium text-green-700 mb-1">Posts</h3>
                    <p className="text-lg md:text-xl font-bold">{selectedInfluencer.influencerRegistration.stats?.totalPosts}</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <h3 className="text-xs font-medium text-yellow-700 mb-1">Avg. Likes</h3>
                    <p className="text-lg md:text-xl font-bold">{selectedInfluencer.influencerRegistration.stats?.avgLikes}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Content Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedInfluencer.influencerRegistration.contentCategories?.map((category, index) => (
                      <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Bio</h3>
                  <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {selectedInfluencer.influencerRegistration.bio}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Audience Demographics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-500 mb-1">Gender Distribution</h4>
                      <p className="text-sm">{selectedInfluencer.influencerRegistration.audienceDemo?.gender}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-500 mb-1">Age Groups</h4>
                      <p className="text-sm">{selectedInfluencer.influencerRegistration.audienceDemo?.ageGroups}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="text-xs text-gray-500 mb-1">Top Locations</h4>
                      <p className="text-sm">{selectedInfluencer.influencerRegistration.audienceDemo?.topLocations}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Advertising Cost</h3>
                  <p className="text-xl font-bold text-green-600">${selectedInfluencer.influencerRegistration.advertisingcost}</p>
                </div>
                
                {selectedInfluencer.influencerRegistration.previousCampaigns?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Previous Campaigns</h3>
                    <div className="space-y-2">
                      {selectedInfluencer.influencerRegistration.previousCampaigns.map((campaign, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <h4 className="font-medium">{campaign.brand}</h4>
                          <p className="text-sm text-gray-600">{campaign.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6 flex justify-end">
              {selectedInfluencer.user.adminApproved === 'pending' && (
                <>
                  <button 
                    onClick={() => {
                      handleReject(selectedInfluencer.user.id);
                      closeDetailView();
                    }}
                    className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors mr-2"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => {
                      handleApprove(selectedInfluencer.user.id);
                      closeDetailView();
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                </>
              )}
              {selectedInfluencer.user.adminApproved !== 'pending' && (
                <button
                  onClick={closeDetailView}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
export default InfluencersManagement;





//   return (
//     <div className="bg-gray-50 min-h-screen p-6">
//       {/* <div className="flex justify-between items-center mb-8"> */}
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
  
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Influencer Management</h1>
//           <p className="text-gray-500">Review and manage influencer applications</p>
//         </div>
//         {/* <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
//           <Download size={16} className="mr-2" />
//           Export Data
//         </button> */}
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-purple-100">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Search size={18} className="text-gray-400" />
//             </div>
//             <input
//               type="text"
//               placeholder="Search influencers..."
//               className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent w-full"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Filter size={18} className="text-gray-500" />
//             <span className="text-sm text-gray-500">Filter by status:</span>
            
//             <div className="relative">
//               <select
//                 className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent cursor-pointer"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="all">All</option>
//                 <option value="pending">Pending</option>
//                 <option value="approved">Approved</option>
//                 <option value="rejected">Rejected</option>
//               </select>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                 <ChevronDown size={16} className="text-gray-400" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table View */}
//       <div className="bg-white rounded-lg shadow overflow-hidden border border-purple-100 mb-8">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categories</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredInfluencers.length > 0 ? (
//               filteredInfluencers.map((influencer) => (
//                 <tr key={influencer.user.id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center">
//                       <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden">
//                         <img 
//                           src={`http://localhost:4000/${influencer.influencerRegistration.profileImage}`} 
//                           alt={influencer.user.name} 
//                           className="h-full w-full object-cover"
//                         />
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">{influencer.user.name}</div>
//                         <div className="text-sm text-gray-500">{influencer.user.location}</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{influencer.user.email}</div>
//                     <div className="text-sm text-gray-500">{influencer.user.phone}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">
//                       {influencer.influencerRegistration.stats?.followers || '0'}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {influencer.influencerRegistration.stats?.engagementRate || '0%'} engagement
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900">
//                       {influencer.influencerRegistration.contentCategories?.slice(0, 2).join(', ')}
//                       {influencer.influencerRegistration.contentCategories?.length > 2 && '...'}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <StatusBadge status={influencer.user.adminApproved} />
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <div className="flex space-x-2 justify-end">
//                       <button 
//                         onClick={() => handleViewInfluencer(influencer)}
//                         className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
//                       >
//                         <Eye size={16} />
//                       </button>
                      
//                       {influencer.user.adminApproved === 'pending' && (
//                         <>
//                           <button 
//                             onClick={() => handleReject(influencer.user.id)}
//                             className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
//                           >
//                             <XCircle size={16} />
//                           </button>
//                           <button 
//                             onClick={() => handleApprove(influencer.user.id)}
//                             className="px-3 py-1 bg-green-50 text-green-600 rounded hover:bg-green-100 transition-colors"
//                           >
//                             <CheckCircle size={16} />
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="px-6 py-10 text-center">
//                   <div className="flex flex-col items-center">
//                     <Users size={36} className="text-gray-300 mb-2" />
//                     <p className="text-gray-500">No influencers found</p>
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Detail View Modal */}
//       {selectedInfluencer && (
//         <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-full overflow-y-auto">
//             <div className="flex justify-between items-center border-b p-4">
//               <h3 className="text-lg font-semibold">Influencer Details</h3>
//               <button onClick={closeDetailView} className="text-gray-400 hover:text-gray-600">
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-6">
//                 {/* Left column */}
//                 <div className="md:w-1/3">
//                   <div className="mb-6">
//                     <div className="h-32 w-32 mx-auto rounded-full overflow-hidden border-4 border-purple-100">
//                       <img 
//                         src={`http://localhost:4000/${selectedInfluencer.influencerRegistration.profileImage}`} 
//                         alt={selectedInfluencer.user.name} 
//                         className="h-full w-full object-cover" 
//                       />
//                     </div>
//                     <h2 className="text-xl font-bold text-center mt-4">{selectedInfluencer.user.name}</h2>
//                     <p className="text-gray-500 text-center">{selectedInfluencer.user.location}</p>
//                     <div className="flex justify-center mt-2">
//                       <StatusBadge status={selectedInfluencer.user.adminApproved} />
//                     </div>
//                   </div>
                  
//                   <div className="border rounded-lg p-4 bg-gray-50">
//                     <h3 className="font-medium mb-3">Contact Information</h3>
//                     <div className="space-y-2">
//                       <div className="flex items-center">
//                         <Mail size={16} className="text-gray-400 mr-2" />
//                         <span className="text-sm">{selectedInfluencer.user.email}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Phone size={16} className="text-gray-400 mr-2" />
//                         <span className="text-sm">{selectedInfluencer.user.phone}</span>
//                       </div>
//                     </div>
                    
//                     <h3 className="font-medium mb-3 mt-4">Social Links</h3>
//                     <div className="space-y-2">
//                       {selectedInfluencer.influencerRegistration.socialLinks?.map((link, index) => (
//                         <div key={index} className="flex items-center">
//                           {link.platform === 'instagram' && <Instagram size={16} className="text-pink-500 mr-2" />}
//                           {link.platform === 'twitter' && <Twitter size={16} className="text-blue-400 mr-2" />}
//                           {link.platform === 'youtube' && <Youtube size={16} className="text-red-500 mr-2" />}
//                           {link.platform === 'website' && <Globe size={16} className="text-gray-500 mr-2" />}
//                           <span className="text-sm text-blue-600 underline">{link.url}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Right column */}
//                 <div className="md:w-2/3">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="bg-purple-50 rounded-lg p-4">
//                       <h3 className="text-sm font-medium text-purple-700 mb-2">Followers</h3>
//                       <p className="text-2xl font-bold">{selectedInfluencer.influencerRegistration.stats?.followers}</p>
//                     </div>
                    
//                     <div className="bg-blue-50 rounded-lg p-4">
//                       <h3 className="text-sm font-medium text-blue-700 mb-2">Engagement Rate</h3>
//                       <p className="text-2xl font-bold">{selectedInfluencer.influencerRegistration.stats?.engagementRate}</p>
//                     </div>
                    
//                     <div className="bg-green-50 rounded-lg p-4">
//                       <h3 className="text-sm font-medium text-green-700 mb-2">Total Posts</h3>
//                       <p className="text-2xl font-bold">{selectedInfluencer.influencerRegistration.stats?.totalPosts}</p>
//                     </div>
                    
//                     <div className="bg-yellow-50 rounded-lg p-4">
//                       <h3 className="text-sm font-medium text-yellow-700 mb-2">Avg. Likes</h3>
//                       <p className="text-2xl font-bold">{selectedInfluencer.influencerRegistration.stats?.avgLikes}</p>
//                     </div>
//                   </div>
                  
//                   <div className="mb-6">
//                     <h3 className="font-medium mb-3">Content Categories</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedInfluencer.influencerRegistration.contentCategories?.map((category, index) => (
//                         <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
//                           {category}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
                  
//                   <div className="mb-6">
//                     <h3 className="font-medium mb-3">Bio</h3>
//                     <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
//                       {selectedInfluencer.influencerRegistration.bio}
//                     </p>
//                   </div>
                  
//                   <div className="mb-6">
//                     <h3 className="font-medium mb-3">Audience Demographics</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div className="bg-gray-50 p-3 rounded-lg">
//                         <h4 className="text-xs text-gray-500 mb-1">Gender Distribution</h4>
//                         <p className="text-sm">{selectedInfluencer.influencerRegistration.audienceDemo?.gender}</p>
//                       </div>
//                       <div className="bg-gray-50 p-3 rounded-lg">
//                         <h4 className="text-xs text-gray-500 mb-1">Age Groups</h4>
//                         <p className="text-sm">{selectedInfluencer.influencerRegistration.audienceDemo?.ageGroups}</p>
//                       </div>
//                       <div className="bg-gray-50 p-3 rounded-lg">
//                         <h4 className="text-xs text-gray-500 mb-1">Top Locations</h4>
//                         <p className="text-sm">{selectedInfluencer.influencerRegistration.audienceDemo?.topLocations}</p>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="mb-6">
//                     <h3 className="font-medium mb-3">Advertising Cost</h3>
//                     <p className="text-xl font-bold text-green-600">${selectedInfluencer.influencerRegistration.advertisingcost}</p>
//                   </div>
                  
//                   {selectedInfluencer.influencerRegistration.previousCampaigns?.length > 0 && (
//                     <div className="mb-6">
//                       <h3 className="font-medium mb-3">Previous Campaigns</h3>
//                       <div className="space-y-2">
//                         {selectedInfluencer.influencerRegistration.previousCampaigns.map((campaign, index) => (
//                           <div key={index} className="border rounded-lg p-3">
//                             <h4 className="font-medium">{campaign.brand}</h4>
//                             <p className="text-sm text-gray-600">{campaign.description}</p>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
              
//               <div className="mt-6 border-t pt-6 flex justify-end">
//                 {selectedInfluencer.user.adminApproved === 'pending' && (
//                   <>
//                     <button 
//                       onClick={() => {
//                         handleReject(selectedInfluencer.user.id);
//                         closeDetailView();
//                       }}
//                       className="px-4 py-2 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition-colors mr-2"
//                     >
//                       Reject Application
//                     </button>
//                     <button 
//                       onClick={() => {
//                         handleApprove(selectedInfluencer.user.id);
//                         closeDetailView();
//                       }}
//                       className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
//                     >
//                       Approve Application
//                     </button>
//                   </>
//                 )}
//                 {selectedInfluencer.user.adminApproved !== 'pending' && (
//                   <button
//                     onClick={closeDetailView}
//                     className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
//                   >
//                     Close
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
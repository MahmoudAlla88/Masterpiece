import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Briefcase, 
  Eye, 
  ChevronUp, 
  ChevronDown,
  BarChart2,
  MessageCircle,
  DollarSign 
} from 'lucide-react';

const AdminDashboard = () => {
  // Sample stats data
  const stats = [
    { 
      id: 1, 
      title: 'Total Influencers', 
      value: '1,247', 
      change: '+12.5%', 
      isPositive: true, 
      icon: <Users size={20} />,
      color: 'from-purple-500 to-purple-700'
    },
    { 
      id: 2, 
      title: 'Active Campaigns', 
      value: '24', 
      change: '+3.2%', 
      isPositive: true, 
      icon: <Briefcase size={20} />,
      color: 'from-pink-500 to-pink-700'
    },
    { 
      id: 3, 
      title: 'Monthly Views', 
      value: '4.8M', 
      change: '+24.3%', 
      isPositive: true, 
      icon: <Eye size={20} />,
      color: 'from-purple-400 to-pink-500'
    },
    { 
      id: 4, 
      title: 'Conversion Rate', 
      value: '3.75%', 
      change: '-0.8%', 
      isPositive: false, 
      icon: <TrendingUp size={20} />,
      color: 'from-indigo-500 to-purple-600'
    },
  ];

  // Sample upcoming campaigns
  const upcomingCampaigns = [
    { id: 1, title: 'Summer Campaign 2025', dueDate: 'Jul 15', status: 'Planning', influencers: 24 },
    { id: 2, title: 'New Product Launch', dueDate: 'Jun 02', status: 'In Progress', influencers: 12 },
    { id: 3, title: 'End of Year Sale', dueDate: 'Oct 30', status: 'Scheduled', influencers: 18 },
  ];

  // Sample top influencers
  const topInfluencers = [
    { id: 1, name: 'Sarah Ahmed', category: 'Beauty', engagement: '8.7%', followers: '1.2M', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'Mohamed Khalid', category: 'Tech', engagement: '7.5%', followers: '850K', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Layla Hassan', category: 'Fashion', engagement: '6.9%', followers: '2.5M', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, name: 'Omar Saeed', category: 'Sports', engagement: '6.2%', followers: '945K', image: 'https://randomuser.me/api/portraits/men/75.jpg' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header and Date */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
          <p className="text-gray-500">Monitor all influencer and campaign activities</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm px-4 py-2 border border-purple-100">
          <p className="text-sm font-medium text-gray-600">
            <Calendar size={16} className="inline mr-2 text-purple-500" />
            Friday, April 4, 2025
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-purple-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className={`bg-gradient-to-r ${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center ${stat.isPositive ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
                  {stat.change}
                  {stat.isPositive ? 
                    <ChevronUp size={16} className="ml-1" /> : 
                    <ChevronDown size={16} className="ml-1" />
                  }
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
            </div>
            <div className={`h-1 bg-gradient-to-r ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Campaign Performance</h2>
            <div className="flex space-x-2">
              <select className="text-sm border border-gray-200 rounded-md px-3 py-1 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <BarChart2 size={48} className="mx-auto text-purple-200" />
              <p className="mt-4 text-sm text-gray-500">Chart visualization will appear here</p>
              <p className="text-xs text-gray-400">The chart will display campaign performance metrics</p>
            </div>
          </div>
        </div>

        {/* Upcoming Campaigns */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Campaigns</h2>
            <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
          </div>
          <div className="space-y-4">
            {upcomingCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border border-gray-100 rounded-lg hover:border-purple-200 transition-colors">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800">{campaign.title}</h3>
                  <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">{campaign.status}</span>
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <div className="text-gray-500">
                    <Calendar size={14} className="inline mr-1" />
                    Due: {campaign.dueDate}
                  </div>
                  <div className="text-gray-500">
                    <Users size={14} className="inline mr-1" />
                    {campaign.influencers} influencers
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-colors">
            Create New Campaign
          </button>
        </div>
      </div>

      {/* Top Influencers */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6 border border-purple-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Top Performing Influencers</h2>
          <button className="text-sm text-purple-600 hover:text-purple-800">View All Influencers</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influencer</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                <th className="pb-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topInfluencers.map((influencer) => (
                <tr key={influencer.id} className="hover:bg-purple-50">
                  <td className="py-4 pr-6">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-200">
                        <img src={influencer.image} alt={influencer.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-800">{influencer.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{influencer.category}</td>
                  <td className="py-4 text-sm text-gray-600">{influencer.followers}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full">
                      {influencer.engagement}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
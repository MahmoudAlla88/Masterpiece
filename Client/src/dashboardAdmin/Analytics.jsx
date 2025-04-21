import React, { useState } from 'react';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronDown, 
  Filter,
  Download
} from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');

  // بيانات وهمية للرسوم البيانية
  const performanceData = {
    campaigns: 16,
    campaignsGrowth: 12.5,
    influencers: 47,
    influencersGrowth: 8.3,
    engagement: 36.8,
    engagementGrowth: -2.4,
    revenue: 24500,
    revenueGrowth: 15.7
  };

  // بيانات وهمية للحملات
  const topCampaigns = [
    { id: 1, name: 'Summer Collection', influencers: 12, impressions: '1.2M', engagement: '5.8%', roi: 3.2 },
    { id: 2, name: 'New Product Launch', influencers: 8, impressions: '950K', engagement: '4.6%', roi: 2.8 },
    { id: 3, name: 'Holiday Special', influencers: 15, impressions: '2.1M', engagement: '7.2%', roi: 4.5 },
    { id: 4, name: 'Brand Awareness', influencers: 6, impressions: '780K', engagement: '3.9%', roi: 1.9 }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-6 overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm">Monitor your marketing campaigns performance</p>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center px-4 py-2 text-sm border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 text-sm border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-50">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-1">
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${timeRange === 'weekly' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${timeRange === 'monthly' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${timeRange === 'quarterly' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('quarterly')}
          >
            Quarterly
          </button>
          <button 
            className={`px-4 py-2 text-sm rounded-lg ${timeRange === 'yearly' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('yearly')}
          >
            Yearly
          </button>
        </div>
        <div className="relative">
          <button className="flex items-center px-4 py-2 text-sm border border-purple-200 rounded-lg bg-white">
            <Calendar size={16} className="mr-2 text-purple-600" />
            <span className="text-gray-700">Apr 05, 2025 - May 05, 2025</span>
            <ChevronDown size={16} className="ml-2 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 border-b border-gray-200">
        <button 
          className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-purple-700'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium ${activeTab === 'campaigns' ? 'text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-purple-700'}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium ${activeTab === 'influencers' ? 'text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-purple-700'}`}
          onClick={() => setActiveTab('influencers')}
        >
          Influencers
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium ${activeTab === 'content' ? 'text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-purple-700'}`}
          onClick={() => setActiveTab('content')}
        >
          Content Performance
        </button>
        <button 
          className={`px-4 py-3 text-sm font-medium ${activeTab === 'audience' ? 'text-purple-700 border-b-2 border-purple-500' : 'text-gray-600 hover:text-purple-700'}`}
          onClick={() => setActiveTab('audience')}
        >
          Audience Insights
        </button>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Campaigns */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 size={22} className="text-purple-600" />
            </div>
            <div className={`rounded-full px-2 py-1 text-xs font-medium flex items-center ${performanceData.campaignsGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {performanceData.campaignsGrowth >= 0 ? (
                <ArrowUpRight size={12} className="mr-1" />
              ) : (
                <ArrowDownRight size={12} className="mr-1" />
              )}
              {Math.abs(performanceData.campaignsGrowth)}%
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Active Campaigns</h3>
          <p className="text-2xl font-bold text-gray-800">{performanceData.campaigns}</p>
          <div className="mt-4 h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>

        {/* Influencers */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users size={22} className="text-purple-600" />
            </div>
            <div className={`rounded-full px-2 py-1 text-xs font-medium flex items-center ${performanceData.influencersGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {performanceData.influencersGrowth >= 0 ? (
                <ArrowUpRight size={12} className="mr-1" />
              ) : (
                <ArrowDownRight size={12} className="mr-1" />
              )}
              {Math.abs(performanceData.influencersGrowth)}%
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Active Influencers</h3>
          <p className="text-2xl font-bold text-gray-800">{performanceData.influencers}</p>
          <div className="mt-4 h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>

        {/* Engagement */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp size={22} className="text-purple-600" />
            </div>
            <div className={`rounded-full px-2 py-1 text-xs font-medium flex items-center ${performanceData.engagementGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {performanceData.engagementGrowth >= 0 ? (
                <ArrowUpRight size={12} className="mr-1" />
              ) : (
                <ArrowDownRight size={12} className="mr-1" />
              )}
              {Math.abs(performanceData.engagementGrowth)}%
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Avg. Engagement</h3>
          <p className="text-2xl font-bold text-gray-800">{performanceData.engagement}%</p>
          <div className="mt-4 h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign size={22} className="text-purple-600" />
            </div>
            <div className={`rounded-full px-2 py-1 text-xs font-medium flex items-center ${performanceData.revenueGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {performanceData.revenueGrowth >= 0 ? (
                <ArrowUpRight size={12} className="mr-1" />
              ) : (
                <ArrowDownRight size={12} className="mr-1" />
              )}
              {Math.abs(performanceData.revenueGrowth)}%
            </div>
          </div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">${performanceData.revenue.toLocaleString()}</p>
          <div className="mt-4 h-1 bg-gray-100 rounded-full">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart - Takes up two-thirds of the space */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Performance Overview</h2>
              <p className="text-sm text-gray-500">Campaign engagement and impressions analysis</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex items-center px-3 py-1.5 text-xs rounded-lg bg-purple-100 text-purple-700">
                <LineChart size={14} className="mr-1" />
                Engagement
              </button>
              <button className="flex items-center px-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                <BarChart3 size={14} className="mr-1" />
                Impressions
              </button>
              <button className="flex items-center px-3 py-1.5 text-xs rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                <PieChart size={14} className="mr-1" />
                Conversion
              </button>
            </div>
          </div>
          <div className="h-64 w-full">
            {/* هنا يمكن إضافة مكتبة رسم بياني حسب متطلبات المشروع */}
            <div className="h-full w-full bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="flex flex-col items-center">
                <LineChart size={48} className="text-purple-300 mb-2" />
                <p className="text-gray-400 text-sm">Engagement chart would render here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Campaigns - Takes up one-third of the space */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Top Campaigns</h2>
            <button className="text-sm text-purple-600 hover:text-purple-800">View All</button>
          </div>
          <div className="space-y-4">
            {topCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-3 border border-gray-100 rounded-lg hover:bg-purple-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{campaign.name}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">ROI {campaign.roi}x</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{campaign.influencers} influencers</span>
                  <span>•</span>
                  <span>{campaign.impressions} impressions</span>
                  <span>•</span>
                  <span>{campaign.engagement} engagement</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
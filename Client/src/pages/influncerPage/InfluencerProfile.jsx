import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const InfluencerProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams(); 
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/influencer/get/${id}`
        );
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching influencer:", error);
      }
    };

    fetchData();
  }, [id]); // Add id as a dependency
  console.log(profileData);


  const handleAdRequest = () => {
    if(currentUser!=null){
    console.log("nn?",profileData.advertisingcost)
    navigate(`/adbooking-request/${profileData.userId}`, {
      state: {
        influencerPrice: profileData.advertisingcost*(1.1), // أو أي اسم عندك للسعر
        influncerName:profileData.User.name
      },
    }
    );}
    else {
      toast(
        ({ closeToast }) => (
          <div>
            <p className="font-semibold mb-2">
              You need to log in before continuing
            </p>
  
            <div className="flex gap-2">
              <button
                onClick={() => {
                  closeToast();          // close the toast
                  navigate("/login");    // go to login page
                }}
                className="rounded bg-purple-500 px-3 py-1 text-white"
              >
                Log In
              </button>
  
              <button
                onClick={closeToast}
                className="rounded border px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        {
          autoClose: false,     // keep toast open until user chooses
          closeOnClick: false,
          position: "top-center",
          theme: "colored",
        }
      );
    }
  };

  // Social media icons (simple version)
  const getSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
          </svg>
        );
      case "youtube":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div
        className="h-64 w-full bg-gradient-to-r from-blue-600 to-purple-600 relative"
        style={{
          backgroundImage: profileData?.coverImage 
          ? `url(http://localhost:4000/${profileData?.coverImage.replace(/\\/g, '/')})`
          : undefined,   backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        
        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8">
          <div className="rounded-full h-32 w-32 border-4 border-white overflow-hidden bg-white">
            {profileData?.profileImage && (
              <img
                src={`http://localhost:4000/${profileData?.profileImage}`}
                alt={profileData.User?.name}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 pt-20 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {profileData?.User?.name}
            </h1>
            <p className="text-gray-600 flex items-center mt-1">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              {profileData?.User?.location}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
          {/* <span className="relative font-bold text-gray-900 right-2"> { profileData.advertisingcost*(1.1)}JD</span> */}
            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium mr-2 hover:bg-purple-600 transition"
               onClick={handleAdRequest}
            >
      { profileData?.advertisingcost*(1.1)}JD      Request Ad

            </button>
         
            {/* <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-pink-700 transition">
              Hire for Campaign
            </button> */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Followers</p>
            <p className="text-2xl font-bold text-purple-500">
              {profileData?.stats?.followers ?? "No data"}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Engagement Rate</p>
            <p className="text-2xl font-bold text-purple-500">
              {profileData?.stats?.engagementRate}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Total Posts</p>
            <p className="text-2xl font-bold text-purple-500">
              {profileData?.stats?.totalPosts}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-500">Avg. Likes</p>
            <p className="text-2xl font-bold text-purple-500">
              {profileData?.stats?.avgLikes}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "text-purple-500 border-purple-500"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "content"
                  ? "text-purple-500 border-purple-500"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("audience")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "audience"
                  ? "text-purple-500 border-purple-500"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Audience
            </button>
            <button
              onClick={() => setActiveTab("campaigns")}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === "campaigns"
                  ? "text-purple-500 border-purple-500"
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Campaigns
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700">{profileData?.bio}</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  Content Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData?.contentCategories.map((category) => (
                    <span
                      key={category}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Social Media
                </h2>
                <div className="space-y-4">
                  {profileData?.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center">
                        <span className="bg-gray-100 p-2 rounded-full text-gray-600 mr-3">
                          {getSocialIcon(social.platform)}
                        </span>
                        <span className="capitalize">{social.platform}</span>
                      </div>
                      <span className="text-purple-500 font-medium">
                        {social.followers}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Content
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Mock content posts - in a real app these would be fetched from an API */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded-lg overflow-hidden bg-gray-200 relative"
                >
                  <img
                    src={`/api/placeholder/400/400?text=Post ${item}`}
                    alt={`Content ${item}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="flex items-center text-white">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">
                        {Math.floor(Math.random() * 10) + 1}K
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audience Tab */}
        {activeTab === "audience" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Audience Demographics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-gray-500 text-sm mb-2">
                  Gender Distribution
                </h3>
                <p className="text-lg font-medium">
                  {profileData.audienceDemo.gender}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-gray-500 text-sm mb-2">Age Groups</h3>
                <p className="text-lg font-medium">
                  {profileData.audienceDemo.ageGroups}
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-gray-500 text-sm mb-2">Top Locations</h3>
                <p className="text-lg font-medium">
                  {profileData.audienceDemo.topLocations}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Engagement by Time
              </h3>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  Engagement chart would appear here
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === "campaigns" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Previous Campaigns
            </h2>
            <div className="overflow-hidden shadow-sm rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {profileData.previousCampaigns.map((campaign, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {campaign.brand}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {campaign.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {campaign.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfluencerProfile;

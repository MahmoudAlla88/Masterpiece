
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Instagram,
  Youtube,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AiInfluencer from "../home/AiInfluncer";
export default function InfluencerListPage() {
  const currentUser = useSelector((state) => state.user.currentUser);

    const expiryDate = new Date(currentUser?.subscriptionexpiry);
  const now        = new Date();

  // 2. Check that the user has an active (not-expired) subscription
  const isActive   = expiryDate > now;
  const [influencers, setInfluencers] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [brandData, setBrandData] = useState({
    brandName: '',
    brandDescription: '',
    minAdPrice:'',
    maxAdPrice: ''
  });
  const [allInfluencers, setAllInfluencers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]); // IDs اللي رجعولي من الـ API
  const [filteredInfluencers1, setFilteredInfluencers1] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
const [message, setMessage] = useState(null);
const handleBrandChange = (e) => {
  setBrandData({ ...brandData, [e.target.name]: e.target.value });
};
const handleSubmitBrand = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    const response = await axios.post(
      `http://localhost:4000/api/external/send-influencers`,
      brandData 
    );
    setMessage(response.data.message);

    // ✅ استخراج IDs من الاستجابة
    // const influencerIds = response.data.influencerIds;
    // setSelectedIds(influencerIds);
console.log(response.data);

    // فلترة المؤثرين
    const receivedInfluencers = response.data.influencers;
    setFilteredInfluencers(receivedInfluencers);
console.log(receivedInfluencers)
  } catch (err) {
    console.error(err);
    setMessage('Failed to send request');
  } finally {
    setIsSubmitting(false);
  }
};

  const navigate = useNavigate();
  const availableCategories = [
    "Fashion",
    "Lifestyle",
    "Beauty",
    "Travel",
    "Food",
    "Fitness",
    "Tech",
    "Gaming",
    "Parenting",
    "Business",
    "Education",
    "Entertainment",
  ];
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/influencer/get",
          {}
        );

        // Transform the API response to match your component's expected structure
        const transformedData = response.data.influencers.map((influencer) => ({
          id: influencer.InfluencerRegistration.id,
          name: influencer.name,
          email: influencer.email,
          phone: influencer.phone,
          // Add other fields with default values if they don't exist in the API response
          profileImage:
            influencer.InfluencerRegistration.profileImage ||
            "/default-profile.png",
            advertisingcost:influencer.InfluencerRegistration.advertisingcost*(1 + 0.1),
          location: influencer.location || "Location not specified",
          bio: influencer.InfluencerRegistration.bio || "No bio available",
          contentCategories:
            influencer.InfluencerRegistration.contentCategories || [],
          socialLinks:
            influencer.InfluencerRegistration?.socialLinks?.filter(
              (link) => link.url
            ) || [],
          stats: {
            followers:
              influencer.InfluencerRegistration?.stats?.followers || "N/A",
            engagementRate:
              influencer.InfluencerRegistration?.stats?.engagementRate || "N/A",
          },
        }));
        console.log(response.data.influencers);
        setInfluencers(transformedData);
       
      } catch (err) {
        setError("Failed to load influencers. Please try again later.");
        console.error("Error fetching influencers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  useEffect(() => {
    let results = influencers;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (influencer) =>
          influencer.name.toLowerCase().includes(term) ||
          (influencer.location &&
            influencer.location.toLowerCase().includes(term))
      );
    }

    // if (selectedCategories.length > 0) {
    //   results = results.filter((influencer) =>
    //     influencer.contentCategories.some((category) =>
    //       selectedCategories.includes(category)
    //     )
    //   );
    // }
if (selectedCategories.length > 0) {
  results = results.filter((influencer) =>
    // يجب أن تتحقّق كل فئة مختارة داخل فئات المؤثّر
    selectedCategories.every((cat) =>
      influencer.contentCategories.includes(cat)
    )
  );
}
    setFilteredInfluencers(results);
    console.log("vv",filteredInfluencers)
  }, [searchTerm, selectedCategories, influencers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };
const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredInfluencers.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredInfluencers, searchTerm, selectedCategories]);
 const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredInfluencers.slice(startIndex, startIndex + itemsPerPage);

  // Helper function to get social media icon
  const getSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-5 h-5 text-purple-600" />;
      case "youtube":
        return <Youtube className="w-5 h-5 text-red-600" />;
      case "tiktok":
        return <span className="text-lg">📱</span>;
      case "facebook":
        return <span className="text-lg text-blue-600">📘</span>;
      case "twitter":
        return <span className="text-lg text-blue-400">🐦</span>;
      default:
        return null;
    }
  };

  // Generate demo data for presentation
  const generateDemoData = () => {
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        location: "Dubai, UAE",
        bio: "Lifestyle and fashion content creator sharing my journey and style tips",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "245K",
          engagementRate: "3.8%",
        },
        contentCategories: ["Fashion", "Lifestyle", "Beauty"],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/sarahjohnson" },
          { platform: "youtube", url: "https://youtube.com/sarahjohnson" },
        ],
      },
      {
        id: 2,
        name: "Ahmed Hassan",
        location: "Riyadh, Saudi Arabia",
        bio: "Food blogger and culinary expert showcasing Middle Eastern cuisine",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "189K",
          engagementRate: "4.2%",
        },
        contentCategories: ["Food", "Lifestyle"],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/ahmedhassan" },
          { platform: "tiktok", url: "https://tiktok.com/@ahmedhassan" },
        ],
      },
      {
        id: 3,
        name: "Leila Al-Farsi",
        location: "Muscat, Oman",
        bio: "Travel enthusiast documenting hidden gems across the Middle East",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "320K",
          engagementRate: "5.1%",
        },
        contentCategories: ["Travel", "Lifestyle"],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/leilaalfarsi" },
          { platform: "youtube", url: "https://youtube.com/leilaalfarsi" },
        ],
      },
      {
        id: 4,
        name: "Tariq Khan",
        location: "Doha, Qatar",
        bio: "Tech reviewer focusing on the latest gadgets and digital trends",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "410K",
          engagementRate: "3.5%",
        },
        contentCategories: ["Tech", "Gaming"],
        socialLinks: [
          { platform: "youtube", url: "https://youtube.com/tariqkhan" },
          { platform: "twitter", url: "https://twitter.com/tariqkhan" },
        ],
      },
      {
        id: 5,
        name: "Fatima Zaidi",
        location: "Kuwait City, Kuwait",
        bio: "Fitness coach and wellness advocate inspiring healthy lifestyles",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "178K",
          engagementRate: "6.3%",
        },
        contentCategories: ["Fitness", "Lifestyle"],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/fatimazaidi" },
          { platform: "tiktok", url: "https://tiktok.com/@fatimazaidi" },
        ],
      },
      {
        id: 6,
        name: "Omar Abdullah",
        location: "Abu Dhabi, UAE",
        bio: "Business mentor sharing entrepreneurship insights and strategies",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "132K",
          engagementRate: "4.7%",
        },
        contentCategories: ["Business", "Education"],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/omarabdullah" },
          { platform: "youtube", url: "https://youtube.com/omarabdullah" },
        ],
      },
      {
        id: 7,
        name: "Yasmin Ali",
        location: "Manama, Bahrain",
        bio: "Beauty expert specializing in skincare routines and makeup tutorials",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "215K",
          engagementRate: "5.8%",
        },
        contentCategories: ["Beauty", "Lifestyle"],
        socialLinks: [
          { platform: "instagram", url: "https://instagram.com/yasminali" },
          { platform: "tiktok", url: "https://tiktok.com/@yasminali" },
        ],
      },
      {
        id: 8,
        name: "Malik Rahman",
        location: "Jeddah, Saudi Arabia",
        bio: "Entertainment creator focusing on comedy sketches and interviews",
        profileImage: "/api/placeholder/400/400",
        stats: {
          followers: "520K",
          engagementRate: "7.2%",
        },
        contentCategories: ["Entertainment", "Lifestyle"],
        socialLinks: [
          { platform: "youtube", url: "https://youtube.com/malikrahman" },
          { platform: "instagram", url: "https://instagram.com/malikrahman" },
        ],
      },
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">
        <div className="text-xl text-purple-600 font-medium">
          Loading influencers...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-red-600 text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <><AiInfluencer/> 
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-500 mb-2">
            Our Influencer Network
          </h1>
          <p className="text-lg text-gray-600">
            Discover talented content creators for your next campaign
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
          <div className="p-5 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-grow max-w-3xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoFocus
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Search by name or location"
                />
              </div>


              {/* Filter Toggle Button */}
              <button
               type="button"  
                onClick={toggleFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <span>Filter</span>
                {filtersOpen ? (
                  <ChevronUp className="ml-2 h-5 w-5" />
                ) : (
                  <ChevronDown className="ml-2 h-5 w-5" />
                )}
              </button>
{isActive&&
              <button
    onClick={() => setShowBrandForm(!showBrandForm)}
    className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
  >
    {showBrandForm ? "Close Brand Form" : "Send Brand Info to API"}
  </button>
}
            </div>
          </div>
{showBrandForm && (
  <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-6 rounded-2xl shadow-xl border border-slate-200/50 max-w-2xl mx-auto mb-10">
    <form onSubmit={handleSubmitBrand} className="space-y-6">
      {/* Header Section */}
      <div className="text-center pb-6 border-b border-slate-200">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Brand Information</h2>
        <p className="text-slate-600">Tell us about your brand to find the perfect influencers</p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Brand Name */}
        <div className="md:col-span-2">
          <label className="block text-slate-700 font-medium mb-2 text-sm tracking-wide">
            Brand Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="brandName"
              value={brandData.brandName}
              onChange={handleBrandChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
              placeholder="Enter your brand name"
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Description */}
        <div className="md:col-span-2">
          <label className="block text-slate-700 font-medium mb-2 text-sm tracking-wide">
            Brand Description
          </label>
          <textarea
            name="brandDescription"
            value={brandData.brandDescription}
            onChange={handleBrandChange}
            rows={4}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none"
            placeholder="Describe your brand, target audience, and campaign goals..."
            required
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-slate-700 font-medium mb-2 text-sm tracking-wide">
            Minimum Budget (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-500 text-sm">$</span>
            </div>
            <input
              type="number"
              step="0.01"
              name="minAdPrice"
              value={brandData.minAdPrice}
              onChange={handleBrandChange}
              className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-700 font-medium mb-2 text-sm tracking-wide">
            Maximum Budget (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-slate-500 text-sm">$</span>
            </div>
            <input
              type="number"
              step="0.01"
              name="maxAdPrice"
              value={brandData.maxAdPrice}
              onChange={handleBrandChange}
              className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
              placeholder="0.00"
              required
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-slate-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center space-x-2">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Finding Influencers...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Find Perfect Influencers</span>
              </>
            )}
          </div>
        </button>
      </div>

      {/* Message Display */}
      {message && (
        <div className={`p-4 rounded-xl border ${
          message.includes('Failed') || message.includes('Error')
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <div className="flex items-center space-x-2">
            {message.includes('Failed') || message.includes('Error') ? (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span className="font-medium">{message}</span>
          </div>
        </div>
      )}
    </form>
  </div>
)}
          {/* {showBrandForm && (
  <form
    onSubmit={handleSubmitBrand}
    className="bg-white shadow-lg rounded-xl p-6 max-w-xl mx-auto mb-10"
  >
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Brand Info</h2>


    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">Brand Name</label>
      <input
        type="text"
        name="brandName"
        value={brandData.brandName}
        onChange={handleBrandChange}
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">Brand Description</label>
      <textarea
        name="brandDescription"
        value={brandData.brandDescription}
        onChange={handleBrandChange}
        className="w-full px-4 py-2 border rounded-lg"
      />
    </div>
  

   <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-1">Minimum Ad Price (USD)</label>
    <input
      type="number"
      step="0.01"
      name="minAdPrice"
      value={brandData.minAdPrice}
      onChange={handleBrandChange}
      className="w-full px-4 py-2 border rounded-lg"
    />
  </div>

 
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-1">Maximum Ad Price (USD)</label>
    <input
      type="number"
      step="0.01"
      name="maxAdPrice"
      value={brandData.maxAdPrice}
      onChange={handleBrandChange}
      className="w-full px-4 py-2 border rounded-lg"
    />
  </div>
    <button
      type="submit"
      disabled={isSubmitting}
      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
    >
      {isSubmitting ? "Sending..." : "Submit to API"}
    </button>

    {message && (
      <p className="mt-4 text-sm text-gray-700">{message}</p>
    )}
  </form>
)} 
*/}

          {/* Filter Options */}
          {filtersOpen && (
            <div className="p-5 bg-gray-50 border-b border-gray-200">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Content Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <button
                    type="button"
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`py-1 px-3 rounded-full text-sm font-medium transition-colors
                        ${
                          selectedCategories.includes(category)
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                type="button"
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-purple-600"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-medium">{filteredInfluencers.length}</span>{" "}
            influencers
            {(searchTerm || selectedCategories.length > 0) &&
              " matching your filters"}
          </p>
        </div>

        {/* Influencer Cards Grid */}
        {pageItems.length> 0 ? (
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageItems.map((influencer) => (
              <div
                key={influencer.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 flex flex-col justify-between"
              >
                <div className="h-36 bg-gradient-to-r from-purple-400 to-pink-500 relative">
                  {/* Profile Image */}
                  <div className="absolute -bottom-12 left-6">
                    <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                      <img
                        src={`http://localhost:4000/${influencer.profileImage}`}
                        alt={`${influencer.name}'s profile`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                  </div>
                </div>

                <div className="pt-14 px-6 pb-6">
                  {/* Name and Location */}
                  {/* <div className="flex mb-4">

                    <h3 className="text-xl font-bold text-gray-800">
                      {influencer.name}
                    </h3>
                    <p className="text-gray-600">{influencer.location}</p>
                  
                
                   <div className="text-sm text-gray-500">advertisingcost</div>
                   <div className="text-lg font-bold text-gray-800">
                        {influencer.advertisingcost}JD
                      </div>
                      {/* <div className="text-xs text-green-600">   Per ad</div> */}
                 {/* </div> */} 
                 <div className="flex justify-between items-center mb-4">
  {/* جهة اليسار: تكلفة الإعلان */}
  <div className="flex flex-col">
    <div className="text-lg font-bold text-gray-800"> {influencer.name}</div>
    <div className="text-sm text-gray-500">
    {influencer.location}
    </div>
  </div>

  {/* جهة اليمين: الاسم والموقع */}
  <div className="flex flex-col items-end">
    <h3 className="text-gray-600">
    Advertising cost
    </h3>
    <p className="text-xl font-bold text-gray-800">
       {influencer.advertisingcost}JD
    </p>
  </div>
</div>
                  {/* Categories */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {influencer.contentCategories.map((category, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-800 text-xs font-medium py-1 px-2 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                    {influencer.bio}
                  </p>

                  {influencer.rankingExplanation &&
  searchTerm === "" &&
  selectedCategories.length === 0 && (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm p-3 rounded mb-4">
      {influencer.rankingExplanation}
    </div>
)}
                  {/* Stats and Social Links */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-sm text-gray-500">Followers</div>
                      <div className="text-lg font-bold text-gray-800">
                        {influencer.stats.followers}
                      </div>
                      <div className="text-xs text-green-600">
                        {influencer.stats.engagementRate} engagement
                      </div>
                    </div>
                  
                    <div className="flex gap-2">
                      {influencer.socialLinks.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <button
                    onClick={() =>
                      navigate(`/InfluencerProfile/${influencer.id}`)
                    }
                    className="w-full mt-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    View Full Profile
                  </button>
                </div>
              </div>
            
            ))}
         
    
          
          </div>
       
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No influencers found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Clear all filters
            </button>
          </div>
        )}
               <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
               </div>
      </div>
    </div></>
  );
}

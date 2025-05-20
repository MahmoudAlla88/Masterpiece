

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaTag, FaUsers, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
const FeaturedInfluencers = () => {
  // const influencers = [
  //   { id: 1, name: "Leen Doe", expertise: "Fashion", followers: "1M+", img: "src/assets/img/pexels-photo-6953586.webp" },
  //   { id: 2, name: "Deep Smith", expertise: "Beauty", followers: "500K+", img: "src/assets/img/pexels-photo-19172451.webp" },
  //   { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "src/assets/img/pexels-photo-19172451.webp" },
  //   { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "src/assets/img/pexels-photo-6635041.webp" },
  //   { id: 5, name: "Alex Wong", expertise: "Tech", followers: "1.2M+", img: "src/assets/img/pexels-photo-6953586.webp" },
  //   { id: 6, name: "Emma Davis", expertise: "Lifestyle", followers: "950K+", img: "src/assets/img/pexels-photo-19172451.webp" }
  // ];
 const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
useEffect(() => {
    const controller = new AbortController();
    const fetchInfluencers = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/influencer/features", {
          signal: controller.signal,
        });
         console.log(data);
        setInfluencers(data.influencers); 
       
      } catch (err) {
        if (!axios.isCancel(err)) console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfluencers();
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else if (window.innerWidth < 1280) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(influencers.length / cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= totalSlides ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 < 0 ? totalSlides - 1 : prevIndex - 1));
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center relative">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D63384] bg-clip-text text-transparent mb-10">
        Most Popular Influencers
      </h2>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
        Discover the tools that make influencer marketing simple and effective.
      </p>

      <div className="relative max-w-7xl mx-auto">
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-100"
          style={{ color: "#D63384" }}
        >
          <FaChevronLeft />
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-100"
          style={{ color: "#D63384" }}
        >
          <FaChevronRight />
        </button>

        {/* Slider Container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
          >
            {influencers.map((influencer) => (
              <motion.div 
                key={influencer.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl w-[calc(100%/4)] min-w-[250px] mx-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={`http://localhost:4000/${influencer.InfluencerRegistration.profileImage}`}
                    alt={influencer.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{influencer.name}</h3>
                  <div className="flex justify-between mt-2">

                    <div className="flex items-center">
                      <FaTag className="mr-2 text-[#D63384]" />
                      <span className="text-gray-700 text-sm ">{influencer.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-2 text-[#D63384]" />
                      <span className="text-gray-700 text-sm">{influencer.InfluencerRegistration.stats.followers}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    className="mt-5 w-full py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r from-[#D63384] to-[#6F42C1] hover:brightness-110 transition"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedInfluencers;

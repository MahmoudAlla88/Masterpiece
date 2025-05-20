import React, { useRef } from "react";
import ReactDOM from "react-dom/client";


import { ArrowUp } from "lucide-react";
import HeroSection from "./herosection";
import HowItWorks from "./HowItWorks";
import FeaturedInfluencers from "./featuredInfluncers";
import MostPopularInfluencers from "./MostPopularInfluencers";
import Categories from "./categories";
import { FrequentlyQ } from "./FrequentlyQ";
import FeaturesSection from "./FeaturesSection";
import Testimoneal from "./Testimoneal";
import AiInfluencer from "./AiInfluncer";

function Home() {


  return (
    <>
      <HeroSection/>
           <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="
          fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg
          bg-purple-600 text-white hover:bg-purple-700
        "
      >
      <ArrowUp/>
      </button>
      <FeaturesSection/>
      <HowItWorks/>
      <Categories/>
      {/* <MostPopularInfluencers/> */}
      <FeaturedInfluencers/>
      {/* <AiInfluencer/> */}
      <Testimoneal/>
      <FrequentlyQ/>
    </>
  )
}

export default Home

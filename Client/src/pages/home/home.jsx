import React from "react";
import ReactDOM from "react-dom/client";



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
      <FeaturesSection/>
      <HowItWorks/>
      <Categories/>
      <MostPopularInfluencers/>
      <FeaturedInfluencers/>
      <AiInfluencer/>
      <Testimoneal/>
      <FrequentlyQ/>
    </>
  )
}

export default Home

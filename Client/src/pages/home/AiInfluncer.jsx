
import React, { useState, useEffect } from 'react';
import axios from 'axios';

 
 
const AiInfluencer = () => {  
  const [topInfluencers, setTopInfluencers] = useState([]);

  useEffect(() => {
    // جلب أعلى 3 مؤثرين باستخدام axios
    axios
      .get('http://localhost:4000/api/users/top', { params: { limit: 3 } })
      .then(({ data }) => {
        console.log('fetched top influencers:', data);
        setTopInfluencers(data);
      })
      .catch(err => {
        console.error('error fetching top influencers:', err);
      });
  }, []);

  // لمراقبة المتغيّر بعد التحديث
  useEffect(() => {
    console.log('topInfluencers state updated:', topInfluencers);
  }, [topInfluencers]);
 const maxCount =
    topInfluencers.reduce((max, inf) => (inf.bookingCount > max ? inf.bookingCount : max), 0) || 1;

return (
  <div className="bg-gradient-to-br from-blue-50 to-purple-100 py-10 md:py-16 flex justify-center items-center">
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-8 px-4">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="mb-3 md:mb-4">
          <span className="bg-purple-200 text-purple-800 text-xs font-medium px-3 py-1 rounded-full flex items-center w-fit">
            <span className="mr-1">⚡</span> Launching Soon in Jordan & Globally
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Perfect Matches
          </span>{' '}
          <span className="text-black">Between</span>
          <br />
          <span className="text-black">Brands & Influencers</span>
        </h1>

        <p className="text-gray-600 mb-6 md:mb-8">
          Our AI-powered platform identifies the ideal audience match,
          connecting brands with the perfect influencers for their campaigns
          and helping influencers find opportunities aligned with their
          authentic voice.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center justify-center">
            Find Your Perfect Match
            <span className="ml-2">→</span>
          </button>

          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full">
            How It Works
          </button>
        </div>

        <div className="flex items-center">
          <div className="flex -space-x-2 mr-3">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs"
              >
                {num}
              </div>
            ))}
          </div>
          <span className="text-gray-600 text-sm">
            Trusted by 500+ brands & influencers
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative mt-8 md:mt-0">
        <div className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-pink-100 right-0 bottom-0 -z-10" />

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 w-full max-w-md">
          <div className="flex items-center mb-5">
            <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-xl">◎</span>
            </div>
            <div>
              <h3 className="font-bold">Audience Matching</h3>
              <p className="text-gray-500 text-sm">AI-powered precision</p>
            </div>
            <span className="ml-auto text-green-500 text-xs font-medium">
              Live
            </span>
          </div>

          {/* Progress bars */}
          <div className="mb-5">
            <span className="text-sm font-medium">
              Target Audience Analysis
            </span>

            <div className="space-y-3 mt-2">
              {[78, 92, 64].map((val) => (
                <div key={val} className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${val}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>78%</span>
              <span>92%</span>
              <span>64%</span>
            </div>
          </div>

          {/* Top Matches */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold">Top Matches</h3>
              <a href="#" className="text-purple-500 text-xs">
                View all
              </a>
            </div>

            {topInfluencers.length > 0 ? (
              <div className="space-y-4">
                {topInfluencers.map((inf, idx) => {
                  const pct = Math.round(
                    (inf.bookingCount / maxCount) * 100
                  );
                  return (
                    <div key={inf.influencerId} className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-500 text-xs">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <span className="text-sm">{inf.user.name}</span>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                      <span className="text-green-500 text-xs ml-3">
                        {pct}% match
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                لا توجد بيانات لعرضها حالياً.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
  // return (
  //   <div className="bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen  flex justify-center items-center">
  //     <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
  //       {/* Left Section */}
  //       <div className="w-full md:w-1/2 flex flex-col justify-center">
  //         <div className="mb-4">
  //           <span className="bg-purple-200 text-purple-800 text-xs font-medium px-3 py-1 rounded-full flex items-center w-fit">
  //             <span className="mr-1">⚡</span> Launching Soon in Jordan & Globally
  //           </span>
  //         </div>
          
  //         <h1 className="text-5xl font-bold mb-4">
  //           <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Perfect Matches</span> 
  //           <span className="text-black"> Between</span>
  //           <br />
  //           <span className="text-black">Brands & Influencers</span>
  //         </h1>
          
  //         <p className="text-gray-600 mb-8">
  //           Our AI-powered platform identifies the ideal audience match,
  //           connecting brands with the perfect influencers for their
  //           campaigns and helping influencers find opportunities aligned
  //           with their authentic voice.
  //         </p>
          
  //         <div className="flex gap-4 mb-8">
  //           <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full flex items-center">
  //             Find Your Perfect Match
  //             <span className="ml-2">→</span>
  //           </button>
          
  //           <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full">
  //             How It Works
  //           </button>
  //         </div>
          
  //         <div className="flex items-center">
  //           <div className="flex -space-x-2 mr-4">
  //             {[1, 2, 3, 4].map((num) => (
  //               <div key={num} className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white text-xs">
  //                 {num}
  //               </div>
  //             ))}
  //           </div>
  //           <span className="text-gray-600 text-sm">Trusted by 500+ brands & influencers</span>
  //         </div>
  //       </div>
        
  //       {/* Right Section */}
  //       <div className="w-full md:w-1/2 flex justify-center items-center relative">
  //         <div className="absolute w-64 h-64 rounded-full bg-pink-100 right-0 bottom-0 -z-10"></div>
          
  //         <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
  //           <div className="flex items-center mb-6">
  //             <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mr-3">
  //               <span className="text-white text-xl">◎</span>
  //             </div>
  //             <div>
  //               <h3 className="font-bold">Audience Matching</h3>
  //               <p className="text-gray-500 text-sm">AI-powered precision</p>
  //             </div>
  //             <span className="ml-auto text-green-500 text-xs font-medium">Live</span>
  //           </div>
            
  //           <div className="mb-6">
  //             <div className="flex justify-between items-center mb-2">
  //               <span className="text-sm font-medium">Target Audience Analysis</span>
  //             </div>
              
  //             <div className="space-y-3">
  //               <div className="w-full bg-gray-200 rounded-full h-2">
  //                 <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '78%'}}></div>
  //               </div>
  //               <div className="w-full bg-gray-200 rounded-full h-2">
  //                 <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '92%'}}></div>
  //               </div>
  //               <div className="w-full bg-gray-200 rounded-full h-2">
  //                 <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '64%'}}></div>
  //               </div>
  //             </div>
              
  //             <div className="flex justify-between items-center text-xs mt-2">
  //               <span className="text-gray-500">78%</span>
  //               <span className="text-gray-500">92%</span>
  //               <span className="text-gray-500">64%</span>
  //             </div>
  //           </div>
            
  //           <div>
  //             <div className="flex justify-between items-center mb-4">
  //               <h3 className="font-bold">Top Matches</h3>
  //               <a href="#" className="text-purple-500 text-xs">View all</a>
  //             </div>
              
  //             <div className="space-y-4">
  //              {topInfluencers.map((inf, idx) => {
  //                 const pct = Math.round((inf.bookingCount / maxCount) * 100);
  //                 return (
  //                   <div key={inf.influencerId} className="flex items-center">
  //                     <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
  //                       <span className="text-purple-500 text-xs">{idx + 1}</span>
  //                     </div>
  //                     <div className="flex-1">
  //                       <span className="text-sm">{inf.user.name}</span>
  //                       <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
  //                         <div
  //                           className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
  //                           style={{ width: `${pct}%` }}
  //                         />
  //                       </div>
  //                     </div>
  //                     <span className="text-green-500 text-xs ml-3">{pct}% match</span>
  //                   </div>
  //                 );
  //               })}
  //               {topInfluencers.length === 0 && (
  //                 <p className="text-gray-500 text-sm">لا توجد بيانات لعرضها حالياً.</p>
  //               )}
  //             </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   // </div>
  // );
};

export default AiInfluencer;
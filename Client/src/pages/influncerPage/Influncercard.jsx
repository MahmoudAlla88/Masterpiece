import { useState } from "react";

const influencersData = [
  { id: 1, name: "Deep Smith", expertise: "Fashion", followers: "1M+", img: "img/pexels-photo-10412892.jpeg", category: "fashion" },
  { id: 2, name: "Jane Smith", expertise: "Beauty", followers: "500K+", img: "img/pexels-photo-6953586.webp", category: "beauty" },
  { id: 3, name: "Mike Johnson", expertise: "Fitness", followers: "2M+", img: "img/pexels-photo-1486064.jpeg", category: "fitness" },
  { id: 4, name: "Sarah Lee", expertise: "Travel", followers: "800K+", img: "img/istockphoto-1437816897-2048x2048.jpg", category: "travel" },
  { id: 5, name: "David Wilson", expertise: "Tech", followers: "1.5M+", img: "img/istockphoto-1309328823-2048x2048.jpg", category: "tech" },
  { id: 6, name: "Laura Martinez", expertise: "Food", followers: "700K+", img: "img/istockphoto-1476170969-2048x2048.jpg", category: "food" }
];

const InfluencersPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filteredInfluencers = influencersData.filter((influencer) => {
    return (
      (category === "all" || influencer.category === category) &&
      influencer.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-blue-50 to-purple-100 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">Our Influencers</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA0054]"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="fashion">Fashion</option>
          <option value="beauty">Beauty</option>
          <option value="fitness">Fitness</option>
          <option value="travel">Travel</option>
          <option value="tech">Tech</option>
          <option value="food">Food</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredInfluencers.map((influencer) => (
          <div key={influencer.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:shadow-xl">
            <div className="h-48 w-full overflow-hidden rounded-lg">
              <img src={influencer.img} alt={influencer.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">{influencer.name}</h3>
            <p className="text-gray-700 text-sm mt-2">Expertise: {influencer.expertise}</p>
            <p className="text-gray-700 text-sm">Followers: {influencer.followers}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfluencersPage;

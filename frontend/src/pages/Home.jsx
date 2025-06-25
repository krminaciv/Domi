import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import HomeCard from "../components/HomeCard";

function Home() {

  const [homes, setHomes] = useState([]);

   useEffect(() => {
    const fetchHomes = async () => {
      try {
        const res = await api.get("/homes");
        setHomes(res.data);
      } catch (err) {
        console.error("Error fetching homes:", err);
      }
    };

    fetchHomes();
  }, []);

  const latestHomes = [];
  for (let i = 0; i < 3; i++) {
    const home = homes[i];
    if (!home) continue
    latestHomes.push(
      <HomeCard
        key={home.id}
        image={home.image_url}
        title={home.title}
        description={home.description}
        price={home.price}
        id={home.id}
      />
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-[70vh] text-center px-4
                        bg-[url('https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1167&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h2 className="relative z-10 text-4xl font-bold text-white mb-4">
          Find a House That Suits You 🏡
        </h2>
        <p className="relative z-10 text-lg text-white mb-6 max-w-xl">
          Want to find a home? We are ready to help you find one that suits your lifestyle and needs.
        </p>
        <button className="relative z-10 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Get Started
        </button>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto -mt-15 bg-white p-6 shadow-md rounded-lg flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
        <input
          type="text"
          placeholder="Location"
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Property Type"
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Budget"
          className="border border-gray-300 p-2 rounded w-full md:w-1/3"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto">
          Search
        </button>
      </div>

      {/* Popular Homes */}
      <section className="bg-white py-10 px-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Popular Homes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {latestHomes}
        </div>
      </section>
    </div>
  );
}

export default Home;

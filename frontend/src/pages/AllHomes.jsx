import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function AllHomes() {
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Homes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {homes.map((home) => (
          <div key={home.id} className="border rounded shadow p-4">
            <img
              src={home.image_url}
              alt={home.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold">{home.title}</h2>
            <p className="text-gray-600 mb-2">{home.location}</p>
            <p className="text-gray-600 mb-2">{home.owner_name}</p>
            <p className="text-lg font-bold mb-2">{home.price} €</p>
            <Link
              to={`/homes/${home.id}`}
              className="text-blue-600 hover:underline"
            >
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllHomes;

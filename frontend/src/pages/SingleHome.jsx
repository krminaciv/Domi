import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { MapPin, Euro, Home } from "lucide-react"; 

function SingleHouse() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/homes/${id}`);
        setHouse(res.data);
      } catch (err) {
        console.error("Error fetching house:", err);
      }
    };

    fetchHouse();
  }, [id]);

  if (!house) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="w-full h-[450px] mb-8">
        <img
          src={house.image_url}
          alt={house.title}
          className="w-full h-full object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Home className="w-7 h-7 text-blue-600" />
            {house.title}
          </h1>

          <p className="text-gray-600 flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            {house.location}
          </p>

          <p className="text-gray-800 mt-6 text-lg leading-relaxed">
            {house.description}
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-md h-fit">
          <p className="text-gray-700 mb-2 text-sm">Price:</p>
          <p className="text-3xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <Euro className="w-6 h-6" />
            {house.price}
          </p>

          <p className="text-gray-700 mb-2">Listed by:</p>
          <p className="text-lg font-medium mb-6">{house.owner_name}</p>

          <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleHouse;

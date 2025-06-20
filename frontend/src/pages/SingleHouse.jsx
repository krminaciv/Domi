import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="max-w-5xl mx-auto p-6">
      <img
        src={house.image_url}
        alt={house.title}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{house.title}</h1>
      <p className="text-gray-600 mb-4">{house.location}</p>
      <div className="flex gap-4 mb-4 text-sm text-gray-700">
        <span>{house.bedrooms} beds</span>
        <span>{house.bathrooms} baths</span>
        <span>{house.area} m²</span>
      </div>
      <p className="text-blue-600 font-bold text-xl mb-4">₦{house.price}</p>
      <p className="text-gray-700 mb-6">{house.description}</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
        Contact Seller
      </button>
    </div>
  );
}

export default SingleHouse;

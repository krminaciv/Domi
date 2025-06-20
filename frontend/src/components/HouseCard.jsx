import { Link } from "react-router-dom";

function HouseCard({ image, title, description, price, id }) {
  return (
    <Link to={`/homes/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold">{price}</span>
            <button className="bg-blue-600 text-white px-4 py-1 rounded text-sm">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HouseCard;

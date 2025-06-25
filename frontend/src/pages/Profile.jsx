import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProfileData(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data?.error || err.message);
      }
    };

    fetchProfile();
  }, [user.token]);

  if (!profileData) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-10">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <img
          src="https://freesvg.org/img/abstract-user-flat-4.png"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow"
        />
        <h1 className="text-3xl font-bold text-gray-800">{profileData.name}</h1>
        <p className="text-gray-600">{profileData.email}</p>
      </div>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Your Listings</h2>

        {profileData.homes.length === 0 ? (
          <p className="text-gray-600">You have no listings yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profileData.homes.map((home) => (
              <div
                key={home._id}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <img
                  src={home.image_url}
                  alt={home.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Link to={`/homes/${home.id}`}>
                    <h3 className="text-xl font-semibold text-gray-800">{home.title}</h3>
                  </Link>
                  <p className="text-gray-500 text-sm mb-1">{home.location}</p>
                  <p className="text-blue-600 font-bold mb-4">€{home.price}</p>

                  <div className="flex gap-3">
                    <Link
                      to={`/edit-home/${home.id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => alert("Delete logic coming soon...")}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

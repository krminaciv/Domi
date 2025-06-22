import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import api from "../api/axios";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null)

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
    <div className="min-h-screen w-full bg-blue-50 px-6 pt-20">
      <h1 className="text-2xl font-bold">Your Profile</h1>
      <p><strong>Name:</strong> {profileData.name}</p>
      <p><strong>Email:</strong> {profileData.email}</p>
    </div>
  );
};

export default Profile;

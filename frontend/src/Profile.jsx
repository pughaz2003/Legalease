import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", { withCredentials: true })
      .then((res) => {
        setUserData(res.data.account);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch profile data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg  p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">User Profile</h1>
      <div className="flex gap-10">
      <div className="w-1/4 ">
      <img className="rounded-full"
              alt="Tailwind CSS Navbar component"
              src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_1280.png" />
      </div>

      <div className="space-y-4 w-1/2 ">
        <div className="flex gap-1">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-900">{userData.name}</span>
        </div>

        <div className="flex gap-1">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-900">{userData.email}</span>
        </div>

        <div className="flex ">
          <span className="font-semibold text-gray-700">Role:</span>
          <span className="capitalize text-gray-900">{userData.role}</span>
        </div>
        <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
      </div>

      
      </div>
    </div>
  );
};

export default Profile;

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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">User Profile</h1>

      <div className="space-y-4">
        <div className="flex gap-10">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-900">{userData.name}</span>
        </div>

        <div className="flex gap-11">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-900">{userData.email}</span>
        </div>

        <div className="flex gap-13">
          <span className="font-semibold text-gray-700">Role:</span>
          <span className="capitalize text-gray-900">{userData.role}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", { withCredentials: true })
      .then((res) => {
        setUserData(res.data.account);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch profile data.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-700 shadow-2xl rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Profile Details</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          className="rounded-full w-20 h-20 border-2 border-white bg-white"
          src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
          alt="Profile"
        />
      </div>

      <form className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            value={userData.name}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white">Role</label>
          <input
            type="text"
            value={userData.role}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 p-2 capitalize"
          />
        </div>

        <div className="text-center mt-6">
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;

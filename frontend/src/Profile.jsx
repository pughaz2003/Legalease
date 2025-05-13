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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl  p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-black">User Profile</h1>
      <div className="flex flex-col items-center ">
      <div className="">
      <img className="rounded-full  w-28 h-28"
              alt="Tailwind CSS Navbar component"
              src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg?ga=GA1.1.32881981.1746974500&semt=ais_hybrid&w=740" />
      </div>

      <div className="space-y-2 mt-3 font-semibold  text-base">
        <div className="flex gap-1 ">
          <span className="font-semibold text-blue-800 ">Name:</span>
          <span className="text-gray-800">{userData.name}</span>
        </div>

        <div className="flex gap-1 ">
          <span className="font-semibold text-blue-800">Email:</span>
          <span className="text-gray-800">{userData.email}</span>
        </div>

        <div className="flex gap-2">
          <span className="font-semibold text-blue-800">Role:</span>
          <span className="capitalize text-gray-800">{userData.role}</span>
        </div>
        <div className="mb-6 mt-6  text-center">
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

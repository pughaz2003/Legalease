import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/';

  const handleLogout = async () => {
  try {
    await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  } catch (err) {
    console.error("Logout failed", err);
  }
};


  return (
    <div className="navbar bg-gray-600 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl text-white">LegalEase</Link>
      </div>

      <div className="flex gap-2">
        {user && !isAuthPage && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User"
                  src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_1280.png"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/dash">Dashboard</Link></li>
              <li><Link to="/pro">Probono-Register</Link></li>
              <li><Link to="/messages">Messages</Link></li>
             <li> <Link to="/my-cases">View My Cases</Link></li>
            <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>

            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

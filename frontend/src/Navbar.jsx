import React from 'react'
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div><div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">LegalEase</a>
    </div>
    <div className="flex gap-2">
      
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331257_1280.png" />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a className="justify-between">
              <Link to="/profile">Profile</Link>
              
            </a>
          </li>
          <li><a><Link to="/dash">Dashboard</Link></a></li>
          <li><a><Link to="/pro">Probono-Register</Link></a></li>
          
          <li><a>Logout</a></li>
          
   
  
        </ul>
      </div>
    </div>
  </div></div>
  )
}

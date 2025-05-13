
import React, { useState } from "react";

const ProBonoRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    licenseNumber: "",
    specialization: "",
    latitude: "",
    longitude: "",
    proBono: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register/lawyer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful");
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          licenseNumber: "",
          specialization: "",
          latitude: "",
          longitude: "",
          proBono: false,
        });
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Pro Bono Lawyer Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input bg-gray-500 " required />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" required />
        <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} className="input" required />

        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input" required />

        <input name="licenseNumber" type="text" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} className="input" required />

        <input name="specialization" type="text" placeholder="Specialization" value={formData.specialization} onChange={handleChange} className="input" required />

        <div className="flex gap-2">
          <input name="latitude" type="number" placeholder="Latitude" value={formData.latitude} onChange={handleChange} className="input" required />
          <input name="longitude" type="number" placeholder="Longitude" value={formData.longitude} onChange={handleChange} className="input" required />
        </div>
        <label className="flex items-center space-x-2">
          <input name="proBono" type="checkbox" checked={formData.proBono} onChange={handleChange} />
          <span className="text-blue-600">Available for Pro Bono cases</span>
        </label>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
          Register
        </button>
      </form>
    </div>
  );
};

export default ProBonoRegistration;

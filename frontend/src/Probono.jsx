import React, { useState } from "react";

const ProBonoRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    licenseNumber: "",
    specialization: "",
    address: "",
    proBono: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/probono", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Pro bono registration successful");
        setFormData({
          name: "",
          email: "",
          licenseNumber: "",
          specialization: "",
          address: "",
          proBono: true,
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
    <div className="max-w-xl mx-auto p-6 bg-gray-700 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">
        Pro Bono Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="licenseNumber"
          type="text"
          placeholder="License Number"
          value={formData.licenseNumber}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="specialization"
          type="text"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
        >
          Submit as Pro Bono Lawyer
        </button>
      </form>
    </div>
  );
};

export default ProBonoRegistration;

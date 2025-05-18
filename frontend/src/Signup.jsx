import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    phone: '',
    specialization: '',
    licenseNumber: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async () => {
    try {
      const endpoint = formData.role === 'lawyer'
        ? 'http://localhost:5000/register/lawyer'
        : 'http://localhost:5000/register/user';

      // prepare body
      let bodyData = { ...formData };
      if (formData.role === 'lawyer') {
        bodyData.location = {
          type: 'Point',
          coordinates: [
            parseFloat(formData.longitude),
            parseFloat(formData.latitude)
          ]
        };
        delete bodyData.latitude;
        delete bodyData.longitude;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const contentType = res.headers.get('content-type');
      let data = contentType?.includes('application/json') ? await res.json() : await res.text();

      if (res.ok) {
        alert("Signup successful");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <div className="card bg-gray-600 w-96 shadow-md mx-auto mt-14">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-white">Sign-up</h2>
          <div className='space-y-1'>

            <fieldset className="fieldset">
              <input type="text" className="input w-64" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </fieldset>

            <fieldset className="fieldset">
              <input type="text" className="input w-64" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </fieldset>

            <fieldset className="fieldset">
              <input type="text" className="input w-64" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </fieldset>

            <fieldset className="fieldset">
              <select name="role" className="select select-bordered w-64" onChange={handleChange}>
                <option value="user">User</option>
                <option value="lawyer">Lawyer</option>
              </select>
            </fieldset>

            {formData.role === 'lawyer' && (
              <div className='space-y-1'>
                <fieldset className="fieldset">
                  <input type="text" className="input w-64" name="phone" placeholder="Phone" onChange={handleChange} />
                </fieldset>

                <fieldset className="fieldset">
                  <select name="specialization" className="select select-bordered w-64" onChange={handleChange}>
                    <option value="">Select Specialization</option>
                    <option value="criminal">Criminal</option>
                    <option value="corporate">Corporate</option>
                    <option value="civil">Civil</option>
                    <option value="family">Family</option>
                    <option value="tax">Tax</option>
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <input type="text" className="input w-64" name="licenseNumber" placeholder="License Number" onChange={handleChange} />
                </fieldset>

                {/* Location Inputs for Lawyers */}
                <fieldset className="fieldset">
                  <input type="text" className="input w-64" name="latitude" placeholder="Latitude" onChange={handleChange} />
                </fieldset>

                <fieldset className="fieldset">
                  <input type="text" className="input w-64" name="longitude" placeholder="Longitude" onChange={handleChange} />
                </fieldset>
              </div>
            )}

          </div>

          <div>
            <p className='font-bold text-white'>
              Already signed up? Go to <Link to="/login" className='text-cyan-300'>Login</Link>
            </p>
          </div>

          <div className="card-actions mt-6">
            <button className="btn bg-blue-600 w-24 text-white" onClick={handleSignup}>Signup</button>
          </div>
        </div>
      </div>
    </div>
  );
}


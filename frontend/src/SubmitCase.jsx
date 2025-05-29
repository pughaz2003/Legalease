import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SubmitCase = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    userId: JSON.parse(localStorage.getItem("user"))._id,
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("userId", formData.userId);
    data.append("lawyerId", lawyerId);

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    try {
      await axios.post("http://localhost:5000/api/cases/submit", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Case submitted successfully");
      navigate("/messages");
    } catch (err) {
      console.error(err);
      alert("Failed to submit case");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto space-y-4 bg-white shadow rounded mt-12">
      <h2 className="text-xl font-bold">Submit Legal Case</h2>
      <input name="title" onChange={handleChange} className="input input-bordered w-full" placeholder="Case Title" required />
      <textarea name="description" onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Description" required />
      <input name="category" onChange={handleChange} className="input input-bordered w-full" placeholder="Category (e.g. land, accident)" required />
      <input type="file" multiple onChange={handleFileChange} className="file-input file-input-bordered w-full" />
      <button type="submit" className="btn btn-success w-full">Submit Case</button>
    </form>
  );
};

export default SubmitCase;

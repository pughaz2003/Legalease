import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCases = () => {
  const [cases, setCases] = useState([]);
  const lawyer = JSON.parse(localStorage.getItem("user")); // logged-in lawyer

  useEffect(() => {
    if (!lawyer || lawyer.role !== "lawyer") return;

    axios.get(`http://localhost:5000/api/cases/lawyer/${lawyer._id}`)
      .then(res => setCases(res.data.cases))
      .catch(err => console.error("Failed to fetch cases", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Cases Submitted To You</h2>
      {cases.length === 0 ? (
        <p>No cases submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {cases.map((c) => (
            <li key={c._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p><strong>From:</strong> {c.userId.name} ({c.userId.email})</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Category:</strong> {c.category}</p>
              {c.files && c.files.length > 0 && (
                <div className="mt-2">
                  <p><strong>Files:</strong></p>
                  <ul className="list-disc ml-6">
                    {c.files.map((file, idx) => (
                      <li key={idx}>
                        <a
                          href={`http://localhost:5000/${file}`}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          Download File {idx + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyCases;

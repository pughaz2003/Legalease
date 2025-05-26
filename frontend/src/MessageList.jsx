import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MessageList = () => {
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || !storedUser._id) {
      navigate("/login");
      return;
    }

    const url =
      storedUser.role === "user"
        ? `/api/messages/inbox/user/${storedUser._id}`
        : `/api/messages/inbox/lawyer/${storedUser._id}`;

    axios
      .get(`http://localhost:5000${url}`)
      .then((res) => setChatList(res.data.partners))
      .catch((err) => console.error("Failed to load inbox", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Message Inbox</h2>
      {chatList.length === 0 ? (
        <p>No conversations yet.</p>
      ) : (
        <ul className="space-y-3">
          {chatList.map((person) => (
            <li
              key={person._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <span>{person.name}</span>
              <Link
                to={`/chat/${person._id}`}
                className="text-blue-600 underline"
              >
                Continue Chat
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;

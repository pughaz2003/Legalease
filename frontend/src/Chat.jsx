import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]); // ✅ this must be []
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (!userData) {
      console.error("User not found in localStorage.");
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);
      console.log("[Chat] Parsed user:", user);

      if (!user._id) {
        console.error("User _id is missing.");
        navigate("/login");
        return;
      }

      setUserId(user._id);

     axios.get(`http://localhost:5000/api/messages/${user._id}/${lawyerId}`, {
  withCredentials: true,
}).then((res) => {
          console.log("[Chat] Fetched messages:", res.data);
          setMessages(res.data?.messages || []); // ✅ defensive fallback
        })
        .catch((err) => {
          console.error("Failed to fetch messages", err);
          setMessages([]); // fallback
        });

    } catch (err) {
      console.error("Error parsing user:", err);
      navigate("/login");
    }
  }, [lawyerId, navigate]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const msg = {
      senderId: userId,
      receiverId: lawyerId,
      senderModel: "User",
      receiverModel: "Lawyer",
      message: newMessage,
    };

    try {
      const res = await await axios.post("http://localhost:5000/api/messages/send", msg, {
  withCredentials: true,
});

      setMessages((prev) => [...prev, res.data.message]);
      setNewMessage("");
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (!userId) {
    return <div className="text-center mt-10 text-red-500">Please log in to continue chat.</div>;
  }

return (
  <div className="flex flex-col h-screen bg-gray-100 p-4">
    <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Chat with Lawyer</h2>

    {/* Chat area */}
    <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-4">
      {Array.isArray(messages) && messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet. Start the conversation below.</p>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            ref={index === messages.length - 1 ? scrollRef : null}
            className={`flex mb-2 ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs text-white text-sm ${
                msg.senderId === userId ? "bg-blue-600" : "bg-gray-600"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))
      )}
    </div>

    {/* ✅ Always show this input box */}
    <div className="flex items-center gap-2 mt-2">
      <input
        type="text"
        className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  </div>
);

};

export default Chat;

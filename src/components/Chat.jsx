import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7111/chatHub")
      .build();

    setConnection(newConnection);

    newConnection.on("ReceiveMessage", (user, message, sentAt) => {
      const formattedTime = new Date(sentAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((messages) => [
        ...messages,
        { user, message, sentAt: formattedTime },
      ]);
    });

    newConnection
      .start()
      .then(() => {
        console.log("Connection established");
      })
      .catch((err) => console.error(err.toString()));
  }, []);

  const sendMessage = async () => {
    if (connection) {
      try {
        await connection.invoke("SendMessage", user, message);
        setMessage("");
      } catch (err) {
        console.error(err.toString());
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <label className="w-20">User</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="flex-1 border rounded p-2"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="w-20">Message</label>
          <input
            type="text"
            className="flex-1 border rounded p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={sendMessage}
            disabled={!connection}
          >
            Send Message
          </button>
        </div>
        <hr />
        <ul className="list-disc text-left pl-5 space-y-1">
          {messages.map((msg, index) => (
            <li key={index} className="text-gray-700">
              <span className="text-gray-400 text-sm">{msg.sentAt} </span>
              {msg.user}: {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;

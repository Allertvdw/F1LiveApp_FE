import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

function Chat() {
  const [connection, setConnection] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7111/chatHub")
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceiveMessage", (user, message) => {
      console.log("messageReceived");
      setMessages((prevMessages) => [...prevMessages, `${user}: ${message}`]);
    });

    newConnection
      .start()
      .then(() => {
        setConnection(newConnection);
      })
      .catch((error) => console.error(error));
  }, []);

  function closeSignalRConnection() {
    if (connection) {
      connection.stop();
    }
  }

  function sendMessage(event) {
    console.log("sendMessage");
    event.preventDefault();
    if (connection && userInput && messageInput) {
      connection
        .invoke("SendMessage", userInput, messageInput)
        .then(() => setMessageInput(""))
        .catch((error) => console.error());
    }
  }

  return (
    <div className="container">
      <div className="row p-1">
        <div className="col-1">User</div>
        <div className="col-5">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>
      </div>
      <div className="row p-1">
        <div className="col-1">Message</div>
        <div className="col-5">
          <input
            type="text"
            className="w-100"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
        </div>
      </div>
      <div className="row p-1">
        <div className="col-6 text-end">
          <button onClick={sendMessage} disabled={!connection}>
            Send Message
          </button>
        </div>
      </div>
      <div className="row p-1">
        <div className="col-6">
          <hr />
        </div>
      </div>
      <div className="row p-1">
        <div className="col-6">
          <ul id="messagesList">
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Chat;

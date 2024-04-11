import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

let connection;

let backendUrl = "https://localhost:7111";

export function startConnection(backendUrl) {
  connection = new HubConnectionBuilder()
    .withUrl(`${backendUrl}/chatHub`, {})
    .withAutomaticReconnect()
    .build();

  return connection.start();
}

export function startListen(callback) {
  connection.on("ReceiveMessage", (message) => {
    console.log("Received message", message);
    callback(message);
  });
}

export function stopListen() {
  connection.off("ReceiveMessage");
}

export default connection;

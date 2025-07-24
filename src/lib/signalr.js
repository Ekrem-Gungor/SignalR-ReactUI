import * as signalR from "@microsoft/signalr";

let connection;

const API_URL = import.meta.env.VITE_API_URL;

export const createConnection = (userName) => {
  const accessToken = localStorage.getItem("AccessToken");
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${API_URL}/chatHub`, {
      accessTokenFactory: () => accessToken,
    })
    .configureLogging(signalR.LogLevel.Error)
    .withAutomaticReconnect()
    .build();

  connection.onreconnected((connectionId) => {
    console.log("Reconnected", connectionId);
    connection.invoke("Join", userName);
  });

  if (connection.state === signalR.HubConnectionState.Disconnected) {
    connection.start().then(() => {
      console.log("SignalR API connected.");
      connection.invoke("Join", userName);
    });
  }

  return connection;
};

export const getConnection = () => connection;

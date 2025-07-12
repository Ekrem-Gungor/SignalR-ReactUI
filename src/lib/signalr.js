import * as signalR from "@microsoft/signalr";

let connection;

export const createConnection = (user) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(import.meta.env.VITE_SIGNALR_URL)
    .withAutomaticReconnect()
    .build();

  connection.start().then(() => {
    console.log("SignalR API connected.");
    connection.invoke("Join", user);
  });

  return connection;
};

export const getConnection = () => connection;

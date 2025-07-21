import * as signalR from "@microsoft/signalr";

let connection;

const API_URL = import.meta.env.VITE_API_URL;

export const createConnection = (userName) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${API_URL}/chatHub`)
    .withAutomaticReconnect()
    .build();

  connection.start().then(() => {
    console.log("SignalR API connected.");
    connection.invoke("Join", userName);
  });

  return connection;
};

export const getConnection = () => connection;

import { useEffect, useState, useRef } from "react";
import { createConnection } from "../lib/signalr";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MessageBubble from "./MessageBubble";
import UserSidebar from "./UserSidebar";
import api from "@/lib/axios";
import ChatRoomSidebar from "./ChatRoomSidebar";

export default function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const connectionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get("/Chat/messages");
      setMessages(response.data);
    } catch (error) {
      console.log("Mesajlar alınırken hata : ", error);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const storedUserName = localStorage.getItem("currentUserName");
    const conn = createConnection(storedUserName);

    if (!conn) return;

    connectionRef.current = conn;

    conn.on("ReceiveMessage", (chatMessage) => {
      setMessages((prev) => [...prev, chatMessage]);
    });

    conn.on("ReceiveSystemMessage", (systemMessage) => {
      setMessages((prev) => [...prev, systemMessage]);
    });

    if (connectionRef.current) {
      fetchMessages();
    }

    return () => {
      conn.off("ReceiveMessage");
      conn.stop();
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      const storedUserName = localStorage.getItem("currentUserName");
      await connectionRef.current.invoke(
        "SendMessage",
        storedUserName,
        message
      );
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SOL TARAF ileride ChatRoomsSidebar için ayrıldı */}
      {/* <div className="w-0 md:w-64 hidden md:block bg-gray-100 border-r" /> */}
      <ChatRoomSidebar />

      {/* ORTA KISIM */}
      <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto p-4">
        <Card className="w-full max-w-6xl shadow-lg rounded-2xl">
          <CardContent className="p-4 space-y-4">
            <div className="h-[670px] overflow-y-auto bg-muted p-4 rounded-xl space-y-2">
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Mesaj yaz..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button onClick={sendMessage}>Gönder</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SAĞ TARAFTA SABİT KULLANICI LİSTESİ */}
      <UserSidebar />
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { getConnection } from "../lib/signalr";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MessageBubble from "./MessageBubble";

export default function ChatRoom({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const connectionRef = useRef(null);

  useEffect(() => {
    const conn = getConnection();

    if (!conn) return;

    connectionRef.current = conn;

    conn.on("ReceiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      conn.off("ReceiveMessage");
    };
  }, []);

  const sendMessage = async () => {
    if (message.trim()) {
      await connectionRef.current.invoke("SendMessage", user, message);
      setMessage("");
    }
  };

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 shadow-lg rounded-2xl">
      <CardContent className="p-4 space-y-4">
        <div className="h-[600px] overflow-y-auto bg-muted p-4 rounded-xl space-y-2">
          {messages.map((msg, index) => (
            <MessageBubble key={index} message={msg} currentUser={user} />
          ))}
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
  );
}

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatRoom from "../components/ChatRoom";
import { createConnection } from "@/lib/signalr";

export default function ChatPage() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("chatUser");
    if (!storedUser) {
      navigate("/");
    } else {
      setUser(storedUser);
      createConnection(storedUser);
    }
  }, []);

  return user ? <ChatRoom user={user} /> : null;
}

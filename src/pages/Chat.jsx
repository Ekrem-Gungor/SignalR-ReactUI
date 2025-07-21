import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatRoom from "../components/ChatRoom";
import { createConnection } from "@/lib/signalr";

export default function ChatPage() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("currentUserName");
    if (!storedUserName) {
      navigate("/");
    } else {
      setUser((prev) => [...prev, storedUserName]);
    }
  }, []);

  return user ? <ChatRoom user={user} /> : null;
}

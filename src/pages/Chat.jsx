import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ChatRoom from "../components/ChatRoom";
import { isTokenExpired } from "@/utils/jwt";

export default function ChatPage() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("currentUserName");
    const jwtToken = localStorage.getItem("AccessToken");
    if (!jwtToken || isTokenExpired(jwtToken)) {
      navigate("/", { replace: true });
    } else {
      setUser(storedUserName);
    }
  }, []);

  return user ? <ChatRoom /> : null;
}

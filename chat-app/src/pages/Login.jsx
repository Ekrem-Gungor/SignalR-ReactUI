import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConnection } from "../lib/signalr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("chatUser", username);
      createConnection(username);
      navigate("/chat");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Kullanıcı Adı</h1>
      <Input
        placeholder="Adınızı girin"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        className="max-w-sm"
      />
      <Button onClick={handleLogin}>Sohbete Başla</Button>
    </div>
  );
}

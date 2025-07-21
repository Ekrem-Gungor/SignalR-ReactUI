import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConnection } from "../lib/signalr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginApi } from "@/api/loginUser";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userName.trim() || password.trim()) {
      const response = await loginApi(userName, password);
      localStorage.setItem("currentUserName", response.userName);
      createConnection(response.userName);
      navigate("/chat");
    } else {
      console.log("Login başarısız.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Giriş Yapın</h1>
      <form onSubmit={handleLogin} className="flex flex-col items-center gap-4">
        <Input
          placeholder="Kullanıcı Adınızı girin"
          onChange={(e) => setUserName(e.target.value)}
          className="max-w-sm"
          type="text"
        />
        <Input
          placeholder="Şifrenizi girin"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          className="max-w-sm"
          type="password"
        />
        <Button variant="outline" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

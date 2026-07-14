import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import RegisterModal from "./RegisterModal";

import { authService } from "../../services/authService";

export default function LoginCard() {
  const navigate = useNavigate();

  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authService.signIn({
        email,
        password,
      });

      if (error) throw error;

      console.log(data.session.access_token);

      navigate("/workspace");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Welcome Back 👋</h2>

        <p className="text-slate-500 mt-2">
          Login untuk melanjutkan ke NoteFlow.
        </p>

        <div className="mt-6 sm:mt-8 space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full h-11"
            loading={loading}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Belum punya akun?
          <button
            onClick={() => setShowRegister(true)}
            className="ml-1 font-semibold text-blue-600 hover:underline"
          >
            Daftar
          </button>
        </p>
      </Card>

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
      />
    </>
  );
}

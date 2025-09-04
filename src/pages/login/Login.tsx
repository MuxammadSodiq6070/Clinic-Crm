// src/pages/login/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");       // faqat signup uchun
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        const newUser = await signup(username, email, password);
        setUser(newUser);
        navigate("/admin"); // xohlasangiz bosh sahifaga yo‘naltiring
      } else {
        const u = await login(username, password);
        if (!u) {
          setError("Login yoki parol noto‘g‘ri");
        } else {
          setUser(u);
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isSignup ? "Sign Up" : "Login"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        {isSignup && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        )}

        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
        >
          {loading ? "Yuklanmoqda..." : isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isSignup ? "Account bormi?" : "Account yo‘qmi?"}{" "}
          <button
            type="button"
            className="text-blue-600"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </form>
    </div>
  );
}

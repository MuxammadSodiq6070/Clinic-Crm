// src/components/Navbar.tsx
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow">
      <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold text-2xl">Clinic CRM</Link>
        <Link to="/cards" className="">Kartalar</Link>
        <Link to="/clients" className="">Mijozlar</Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
            <div className="text-right">
              <div className="font-medium">{user.username}</div>
              <div className="text-xs text-gray-500">{(user as any).email || ""}</div>
            </div>
            <button onClick={() => setUser(null)} className="ml-4 text-sm text-red-500">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="text-sm text-gray-600">Login</Link>
        )}
      </div>
    </nav>
  );
}


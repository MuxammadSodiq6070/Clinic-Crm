import { Routes, Route, Navigate } from "react-router-dom";
import AdminCardPage from "./pages/AdminCardPage/AdminCardPage";
import ClientsPage from "./pages/ClientPage/ClientPage"; // 👈 Mijozlar paneli
import LoginPage from "./pages/login/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/cards" />} /> {/* Default sahifa */}
        <Route path="/cards" element={<AdminCardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;

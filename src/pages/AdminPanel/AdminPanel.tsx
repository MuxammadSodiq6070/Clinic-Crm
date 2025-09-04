import { useNavigate } from "react-router-dom";
import ClientForm from "../../components/ClientForm";
import ClientTable from "../../components/ClientTable";

export default function AdminPanel() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isAuth");
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-slate-700">
                        🏥 Klinik CRM
                    </h1>
                </div>
                <nav className="flex-1 p-4">
                    
                </nav>
                <div className="p-4 border-t">
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
                    <h2 className="text-xl font-semibold text-slate-700">
                        Admin Panel
                    </h2>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    <div className="container max-w-screen-xl grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <section className="md:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-700 mb-4 text-center">
                                ➕ Add New Client
                            </h2>
                            <ClientForm />
                        </section>

                        {/* Table Section */}
                        <section className="md:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                            <h2 className="text-xl font-semibold text-slate-700 mb-4 text-center">
                                📋 Client List
                            </h2>
                            <ClientTable />
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

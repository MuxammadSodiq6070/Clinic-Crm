import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Client {
    id: number;
    name: string;
    phone: string;
    address: string;
    disease: string;
}

export default function ClientTable() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: async () => (await axios.get("http://localhost:8000/clients")).data,
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: number) => await axios.delete(`http://localhost:8000/clients/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["clients"] }),
    });

    if (isLoading) return <p className="text-center text-slate-500">Yuklanmoqda...</p>;
    if (error) return <p className="text-center text-red-500">❌ Ma’lumot olishda xatolik!</p>;

    return (
        <div className="overflow-x-auto p-6 ">
            <h2 className="text-2xl font-bold text-slate-700 mb-4">Mijozlar Ro'yxati</h2>
            <table className="w-full border border-slate-200 bg-white rounded-lg overflow-hidden">
                <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Ism Familiya</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Telefon</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Manzil</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Kasallik turi</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">Amallar</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((client, index) => (
                        <tr
                            key={client.id}
                            className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-slate-50 transition-colors duration-200`}
                        >
                            <td className="px-6 py-4 text-sm text-slate-700">{client.id}</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{client.name}</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{client.phone}</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{client.address}</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{client.disease}</td>
                            <td className="px-6 py-4 flex justify-center gap-4">
                                <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-200">
                                    Tahrirlash
                                </button>
                                <button
                                    onClick={() => deleteMutation.mutate(client.id)}
                                    className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors duration-200"
                                >
                                    O'chirish
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

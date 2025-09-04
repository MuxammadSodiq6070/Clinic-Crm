import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Client {
  id?: number;
  name: string;
  phone: string;
  address?: string;
  disease: string;
}

export default function ClientForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<Client>({
    name: "",
    phone: "",
    address: "",
    disease: "",
  });

  const [err, setErr] = useState<string>("");

  const addClient = useMutation({
    mutationFn: async (newClient: Client) => {
      return axios.post("http://localhost:8000/clients", newClient);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const updateAdminCard = useMutation({
    mutationFn: async (amount: number) => {
      const res = await axios.get("http://localhost:8000/admin");
      const admin = res.data;

      const updated = {
        ...admin,
        cards: admin.cards.map((c: any) => ({
          ...c,
          balance: c.balance + amount,
        })),
      };

      return axios.put("http://localhost:8000/admin", updated);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  function calculateProfit(disease: string): number {
    switch (disease) {
      case "Diabet":
        return 200000;
      case "Gipertoniya":
        return 300000;
      case "Allergiya":
        return 150000;
      default:
        return 100000;
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.disease) {
      setErr("Iltimos, majburiy maydonlarni to‘ldiring!");
      return;
    }

    setErr("");

    try {
      await addClient.mutateAsync(form);

      const profit = calculateProfit(form.disease);
      await updateAdminCard.mutateAsync(profit);

      setForm({ name: "", phone: "", address: "", disease: "" });
    } catch (error) {
      setErr("Xatolik yuz berdi!");
    }
  };

  return (
    <form
      onSubmit={submit}
      className=" bg-white  rounded-2xl p-8 mx-auto mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Yangi Mijoz Qo‘shish
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Ism Familiya
          </label>
          <input
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ism Familiya"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Telefon raqami
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+998..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Manzil (ixtiyoriy)
          </label>
          <input
            name="address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Manzil"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Kasallik turi
          </label>
          <select
            name="disease"
            value={form.disease}
            onChange={(e) => setForm({ ...form, disease: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Kasallik turini tanlang</option>
            <option value="Diabet">Diabet</option>
            <option value="Gipertoniya">Gipertoniya</option>
            <option value="Allergiya">Allergiya</option>
            <option value="Boshqasi">Boshqasi</option>
          </select>
        </div>
      </div>

      {err && <p className="text-red-500 text-sm">{err}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Qo‘shish va Foyda qo‘shish
      </button>
    </form>
  );
}

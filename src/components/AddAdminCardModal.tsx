import React, { useState } from "react";
import { detectCardType } from "../utils/detectCardType";
import type { CardInput } from "../types";

interface Props {
  onClose: () => void;
  onAdd: (card: CardInput) => void;
}

export default function AddAdminCardModal({ onClose, onAdd }: Props) {
  const [cardNumber, setCardNumber] = useState("");
  const [balance, setBalance] = useState<number>(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: CardInput = {
      cardNumber,
      type: detectCardType(cardNumber),
      balance,
    };
    onAdd(newCard);    // <-- aniq tiplangan
    setCardNumber("");
    setBalance(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Yangi Karta Qo‘shish</h2>
        <form onSubmit={submit} className="space-y-4">
          <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card number" required className="w-full border px-3 py-2 rounded" />
          <input value={balance} onChange={(e) => setBalance(Number(e.target.value))} placeholder="Balance" type="number" required className="w-full border px-3 py-2 rounded" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Bekor</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  );
}

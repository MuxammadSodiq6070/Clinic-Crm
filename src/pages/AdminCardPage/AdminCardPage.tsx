import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import AddAdminCardModal from "../../components/AddAdminCardModal";
import type { CardInput, User } from "../../types/admin";

const BASE = "http://localhost:8000";

export default function AdminCardPage() {
  const { user, setUser } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);

  if (!user) return <p>Login qiling</p>;

  const addCardMutation = useMutation({
    mutationFn: async (newCard: CardInput) => {
      const cardWithId = { id: Date.now().toString(), ...newCard };
      const updatedCards = [...(user.cards ?? []), cardWithId];
      const res = await axios.patch<User>(`${BASE}/users/${user.id}`, { cards: updatedCards });
      return res.data;
    },
    onSuccess: (serverUser) => {
      // sanitize — olib tashlash mumkin bo‘lgan maydonlar
      const { password, ...safe } = serverUser as any;
      // DEBUG: console.log("serverUser", serverUser);
      setUser(safe as User);            // <-- bu yerda xato bo'lmasligi uchun safe yuboramiz
      qc.invalidateQueries({ queryKey: ["user", user.id] });
    },
    onError: (err) => {
      console.error("addCard error:", err);
    },
  });

  const handleAddCard = (card: CardInput) => {
    addCardMutation.mutate(card);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>+ Yangi karta</button>
      {open && (
        <AddAdminCardModal
          onClose={() => setOpen(false)}
          onAdd={(card) => { handleAddCard(card); setOpen(false); }}
        />
      )}
    </div>
  );
}

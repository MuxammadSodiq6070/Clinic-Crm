import type { Card as CardType } from "../types/admin";

interface Props {
  card: CardType;
}

export default function AdminCard({ card }: Props) {
  const bg =
    card.type === "UZCARD"
      ? "from-green-500 to-green-700"
      : card.type === "HUMO"
      ? "from-blue-500 to-blue-700"
      : card.type === "MASTERCARD"
      ? "from-red-500 to-yellow-500"
      : "from-gray-500 to-gray-700";

  return (
    <div className={`p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${bg}`}>
      <h2 className="text-lg font-semibold">{card.type}</h2>
      <p className="tracking-widest text-sm mt-2">
        {card.cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
      </p>
      <p className="mt-4 text-xl font-bold">{card.balance.toLocaleString()} so‘m</p>
    </div>
  );
}

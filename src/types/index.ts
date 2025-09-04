export interface Card {
  id: string;
  cardNumber: string;
  type: string;
  balance: number;
}

export type CardInput = Omit<Card, "id">;

export interface User {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  password?: string;
  cards: Card[];
}


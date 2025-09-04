// src/types.ts
export interface Card {
  id: number;
  cardNumber: string;
  type: string;
  balance: number;
}

export type CardInput = Omit<Card, "id">;

export interface User {
  id: number;
  username: string;
  password: string;
  avatar: string;
  cards: Card[];
}

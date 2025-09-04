// src/api/adminApi.ts
import axios from "axios";
import type { User } from "../types/admin";

export const BASE = "http://localhost:8000";

export const getAdmins = async (): Promise<User[]> => {
  const res = await axios.get<User[]>(`${BASE}/admins`);
  return res.data;
};

export const updateAdmin = async (id: string, admin: User): Promise<User> => {
  // json-server uchun PUT ishlatamiz (yoki siz patch ishlatmoqchi bo'lsangiz o'zgartiring)
  const res = await axios.put<User>(`${BASE}/admins/${id}`, admin);
  return res.data;
};

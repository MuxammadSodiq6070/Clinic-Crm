// src/api/authApi.ts
import axios from "axios";
import type { User } from "../types/admin";

const API_URL = "http://localhost:8000/users";

export async function login(username: string, password: string): Promise<User | null> {
  const res = await axios.get<User[]>(`${API_URL}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
  return res.data.length > 0 ? res.data[0] : null;
}

export async function signup(username: string, email: string, password: string): Promise<User> {
  const newUser = {
    // json-server avtomatik id beradi agar bermasangiz — lekin biz uuid bera olamiz ham
    // id: crypto.randomUUID(),
    username,
    email,
    password,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}`,
    cards: []
  };
  const res = await axios.post<User>(API_URL, newUser);
  return res.data;
}

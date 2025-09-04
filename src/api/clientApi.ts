import axios from "axios";
import type { Client } from "../types/client";

const BASE = "http://localhost:8000";

export const getClients = async () => (await axios.get(`${BASE}/clients`)).data;
export const addClient = async (client: Client) => (await axios.post(`${BASE}/clients`, client)).data;

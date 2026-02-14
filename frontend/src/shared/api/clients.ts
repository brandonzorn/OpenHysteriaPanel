import { Client } from "../types/client";
import { CLIENTS_API_BASE, requestJson } from "./apiBase";

export async function getClients(signal?: AbortSignal): Promise<Client[]> {
  const options = {
    method: "GET",
  }
  const rawJson = await requestJson(CLIENTS_API_BASE, options, signal);
  return rawJson.map((c: any) => new Client(c));
}

export async function getClientById(id: string, signal?: AbortSignal): Promise<Client> {
  const options = {
    method: "GET",
  }
  const rawJson = await requestJson(`${CLIENTS_API_BASE}${id}/`, options, signal);
  return new Client(rawJson);
}

export async function updateClientActiveById(id: string, isActive: boolean, signal?: AbortSignal): Promise<Client> {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: { is_active: isActive },
  }
  const rawJson = await requestJson(`${CLIENTS_API_BASE}${id}/`, options, signal);
  return new Client(rawJson);
}

export async function deleteClientById(id: string, signal?: AbortSignal): Promise<void> {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }
  await requestJson(`${CLIENTS_API_BASE}${id}/`, options, signal);
}
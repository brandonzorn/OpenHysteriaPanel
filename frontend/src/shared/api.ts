import { DashboardStats } from "./types/dashboardStats";

export async function fetchDashboardStats(signal?: AbortSignal): Promise<DashboardStats> {
  const res = await fetch("/api/dashboard/", {
    method: "GET",
    credentials: "include",
    headers: { "Accept": "application/json" },
    signal,
  });

  if (!res.ok) {
    throw new Error(`Dashboard API error: HTTP ${res.status}`);
  }

  const raw = await res.json();
  return new DashboardStats(raw);
}
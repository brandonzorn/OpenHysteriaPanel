import { DashboardStats } from "../types/dashboardStats";
import { DASHBOARD_API_BASE, requestJson } from "./apiBase";

export async function fetchDashboardStats(signal?: AbortSignal): Promise<DashboardStats> {
  const options = {
    method: "GET",
  }
  const rawJson = await requestJson(DASHBOARD_API_BASE, options, signal);
  return new DashboardStats(rawJson);
}
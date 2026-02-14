export class NetStats {
  netRxBytes: number;
  netTxBytes: number;

  constructor(rxBytes: number, txBytes: number) {
    this.netRxBytes = rxBytes;
    this.netTxBytes = txBytes;
  }

  private static bytesToMbps(deltaBytes: number, deltaSeconds: number): number {
    if (!Number.isFinite(deltaBytes) || !Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return 0;
    return (deltaBytes * 8) / 1_000_000 / deltaSeconds;
  }

  public calcRxMbps(lastRxBytes: number, deltaSeconds: number): number {
    const delta = Math.max(0, this.netRxBytes - lastRxBytes);
    return NetStats.bytesToMbps(delta, deltaSeconds);
  }

  public calcTxMbps(lastTxBytes: number, deltaSeconds: number): number {
    const delta = Math.max(0, this.netTxBytes - lastTxBytes);
    return NetStats.bytesToMbps(delta, deltaSeconds);
  }
}

export class DashboardStats {
  cpuPercent: number;
  cpuCores: number;
  cpuThreads: number;

  ramPercent: number;
  ramText: string;

  diskPercent: number;
  diskText: string;

  swapPercent: number;
  swapText: string;

  activeClients: number;
  uptimeText: string;

  netStats: NetStats;

  hysteriaStatus: string;

  constructor(raw: any) {
    this.cpuPercent = raw.cpu ?? 0;
    this.cpuCores = raw.cpu_cores ?? 0;
    this.cpuThreads = raw.cpu_threads ?? 0;

    this.ramPercent = raw.ram ?? 0;
    this.ramText = DashboardStats.formatUsage(raw.ram_used, raw.ram_total);

    this.diskPercent = raw.disk ?? 0;
    this.diskText = DashboardStats.formatUsage(raw.disk_used, raw.disk_total);

    this.swapPercent = raw.swap ?? 0;
    this.swapText = DashboardStats.formatUsage(raw.swap_used, raw.swap_total);

    this.activeClients = raw.active_clients_count ?? 0;

    this.uptimeText = DashboardStats.formatUptime(raw.uptime ?? 0);

    this.netStats = new NetStats(
      raw.network_rx_bytes ?? 0, 
      raw.network_tx_bytes ?? 0
    );
    
    this.hysteriaStatus = raw.hysteria_status ?? "loading";
  }

  private static formatBytesToGb(bytes: number): string {
    if (!Number.isFinite(bytes)) return "";
    return `${(bytes / (1024 ** 3)).toFixed(1)} GB`;
  }

  private static formatUsage(used: number, total: number): string {
    if (!Number.isFinite(used) || !Number.isFinite(total)) return "";
    return `${this.formatBytesToGb(used)} / ${this.formatBytesToGb(total)}`;
  }

  private static formatUptime(seconds: number): string {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    return (d > 0 ? `${d}d ` : "") + `${h}h ${m}m`;
  }
}

export class Client {
    id: string;
    title: string;
    username: string;
    password?: string;
    uploadLimitMbps: number;
    downloadLimitMbps: number;
    trafficLimitGb: number;
    trafficUsedGb: number;
    expiresAt: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(raw: any) {
        this.id = raw.id;
        this.title = raw.title;
        this.username = raw.username;
        this.password = raw.password;
        this.uploadLimitMbps = raw.upload_limit_mbps;
        this.downloadLimitMbps = raw.download_limit_mbps;
        this.trafficLimitGb = raw.traffic_limit_gb;
        this.trafficUsedGb = raw.traffic_used_gb;
        this.expiresAt = raw.expires_at ? new Date(raw.expires_at) : null;
        this.isActive = raw.is_active;
        this.createdAt = new Date(raw.created_at);
        this.updatedAt = new Date(raw.updated_at);
    }

    get trafficPercent(): number {
        if (!this.trafficLimitGb || this.trafficLimitGb === 0) return 0;
            return Math.min(100, Math.round((this.trafficUsedGb / this.trafficLimitGb) * 100)
        );
    }

    get trafficText(): string {
        if (!this.trafficLimitGb || this.trafficLimitGb === 0) {
            return `${this.trafficUsedGb} GB / ∞`;
        }
        return `${this.trafficUsedGb} GB / ${this.trafficLimitGb} GB`;
    }

    get uploadText(): string {
        return this.uploadLimitMbps === 0 ? "∞" : `${this.uploadLimitMbps} Mbps`;
    }

    get downloadText(): string {
        return this.downloadLimitMbps === 0 ? "∞" : `${this.downloadLimitMbps} Mbps`;
    }

    get isExpired(): boolean {
        if (!this.expiresAt) return false;
        return new Date() > this.expiresAt;
    }

    get statusText(): string {
        if (!this.isActive) return "Disabled";
        if (this.isExpired) return "Expired";
        return "Active";
    }

    get statusType(): "ok" | "warn" | "off" {
        if (!this.isActive) return "off";
        if (this.isExpired) return "warn";
        return "ok";
    }
}
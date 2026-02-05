import os
import time

import psutil


def get_system_stats():
    net_io = psutil.net_io_counters()
    ram = psutil.virtual_memory()
    system_drive = os.getenv("SystemDrive", "C:") + "\\"
    disk = psutil.disk_usage(system_drive)
    swap = psutil.swap_memory()
    return {
        "cpu": psutil.cpu_percent(),
        "cpu_cores": psutil.cpu_count(logical=False),
        "cpu_threads": psutil.cpu_count(logical=True),
        "ram": ram.percent,
        "ram_used": int(ram.used),
        "ram_total": int(ram.total),
        "disk": disk.percent,
        "disk_used": int(disk.used),
        "disk_total": int(disk.total),
        "swap": swap.percent,
        "swap_used": int(swap.used),
        "swap_total": int(swap.total),
        "uptime": int(time.time() - psutil.boot_time()),
        "net_rx_bytes": int(net_io.bytes_recv),
        "net_tx_bytes": int(net_io.bytes_sent),
    }


def get_hysteria_status():
    return "running"

from django.db import models


class Client(models.Model):
    username = models.CharField(max_length=64, unique=True)
    password = models.CharField(max_length=128)
    upload_limit_mbps = models.PositiveIntegerField(default=0)
    download_limit_mbps = models.PositiveIntegerField(default=0)
    traffic_limit_gb = models.PositiveIntegerField(default=0)
    traffic_used_gb = models.PositiveIntegerField(default=0)
    expires_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

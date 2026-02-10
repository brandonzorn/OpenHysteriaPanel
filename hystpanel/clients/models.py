from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.validators import alnum_validator


class Client(models.Model):
    title = models.CharField(
        _("Title"),
        max_length=64,
        blank=True,
        default=_("Config"),
        help_text=_("Display name for this configuration."),
    )
    username = models.CharField(
        _("Username"),
        max_length=64,
        unique=True,
        validators=[alnum_validator, MinLengthValidator(4)],
        help_text=_("Letters and digits only."),
    )
    password = models.CharField(
        _("Password"),
        max_length=128,
        validators=[alnum_validator, MinLengthValidator(8)],
        help_text=_("Letters and digits only."),
    )
    upload_limit_mbps = models.PositiveIntegerField(
        _("Upload limit (Mbps)"),
        default=0,
        help_text=_("0 means unlimited upload speed."),
    )
    download_limit_mbps = models.PositiveIntegerField(
        _("Download limit (Mbps)"),
        default=0,
        help_text=_("0 means unlimited download speed."),
    )
    traffic_limit_gb = models.PositiveIntegerField(
        _("Traffic limit (GB)"),
        default=0,
        help_text=_("0 means unlimited traffic."),
    )
    traffic_used_gb = models.PositiveIntegerField(
        _("Traffic used (GB)"),
        default=0,
        help_text=_("Total traffic used by the client."),
    )
    expires_at = models.DateField(
        _("Expires at"),
        null=True,
        blank=True,
        help_text=_("Leave empty for no expiration."),
    )
    is_active = models.BooleanField(
        _("Active"),
        default=True,
        help_text=_("Inactive clients cannot connect."),
    )
    created_at = models.DateTimeField(
        _("Created at"),
        auto_now_add=True,
        help_text=_("Creation time."),
    )
    updated_at = models.DateTimeField(
        _("Updated at"),
        auto_now=True,
        help_text=_("Last update time."),
    )

    class Meta:
        verbose_name = _("Client")
        verbose_name_plural = _("Clients")

    def __str__(self):
        return self.username

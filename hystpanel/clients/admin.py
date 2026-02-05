from django.contrib import admin
from django.utils.formats import date_format
from django.utils.timezone import localtime
from django.utils.translation import gettext_lazy as _

from clients.models import Client


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = (
        Client.username.field.name,
        Client.is_active.field.name,
        "expires_at_display",
        "created_at_display",
        "updated_at_display",
    )
    list_filter = (
        Client.is_active.field.name,
        Client.expires_at.field.name,
        Client.created_at.field.name,
        Client.updated_at.field.name,
    )
    search_fields = (f"^{Client.username.field.name}",)
    ordering = (f"-{Client.created_at.field.name}",)
    date_hierarchy = Client.created_at.field.name
    readonly_fields = (
        Client.created_at.field.name,
        Client.updated_at.field.name,
    )
    fieldsets = (
        (
            _("Credentials"),
            {
                "fields": (
                    Client.username.field.name,
                    Client.password.field.name,
                ),
            },
        ),
        (
            _("Speed limits"),
            {
                "fields": (
                    Client.upload_limit_mbps.field.name,
                    Client.download_limit_mbps.field.name,
                ),
            },
        ),
        (
            _("Traffic"),
            {
                "fields": (
                    Client.traffic_limit_gb.field.name,
                    Client.traffic_used_gb.field.name,
                ),
            },
        ),
        (
            _("Access"),
            {
                "fields": (
                    Client.expires_at.field.name,
                    Client.is_active.field.name,
                ),
            },
        ),
        (
            _("Timestamps"),
            {
                "fields": (
                    Client.created_at.field.name,
                    Client.updated_at.field.name,
                ),
            },
        ),
    )

    @admin.display(description=_("Created at"), ordering="created_at")
    def created_at_display(self, obj: Client) -> str:
        return date_format(localtime(obj.created_at), "DATETIME_FORMAT")

    @admin.display(description=_("Updated at"), ordering="updated_at")
    def updated_at_display(self, obj: Client) -> str:
        return date_format(localtime(obj.updated_at), "DATETIME_FORMAT")

    @admin.display(description=_("Expires at"), ordering="expires_at")
    def expires_at_display(self, obj: Client) -> str:
        if not obj.expires_at:
            return "—"
        return date_format(localtime(obj.expires_at), "DATETIME_FORMAT")

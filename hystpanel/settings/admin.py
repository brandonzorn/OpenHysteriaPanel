from django.contrib import admin
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.translation import gettext_lazy as _

from settings.models import PanelSettings


@admin.register(PanelSettings)
class PanelSettingsAdmin(admin.ModelAdmin):
    list_display = (
        PanelSettings.domain.field.name,
        PanelSettings.panel_port.field.name,
        PanelSettings.hysteria_port.field.name,
        PanelSettings.masquerade_url.field.name,
        PanelSettings.updated_at.field.name,
    )

    fieldsets = (
        (
            _("General"),
            {
                "fields": (PanelSettings.domain.field.name,),
            },
        ),
        (
            _("Ports"),
            {
                "fields": (
                    PanelSettings.panel_port.field.name,
                    PanelSettings.hysteria_port.field.name,
                ),
            },
        ),
        (
            _("Masquerade"),
            {
                "fields": (PanelSettings.masquerade_url.field.name,),
            },
        ),
        (
            _("Metadata"),
            {
                "fields": (PanelSettings.updated_at.field.name,),
            },
        ),
    )

    readonly_fields = (PanelSettings.updated_at.field.name,)

    def has_add_permission(self, request):
        return not PanelSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = PanelSettings.get_solo()
        return redirect(
            reverse(
                "admin:settings_panelsettings_change",
                args=(obj.pk,),
            ),
        )

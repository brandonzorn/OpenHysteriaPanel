from django import forms

from core.mixins import WidgetClassMixin
from core.validators import PORT_MAX, PORT_MIN
from settings.models import PanelSettings


class PanelSettingsForm(WidgetClassMixin, forms.ModelForm):
    class Meta:
        model = PanelSettings
        fields = (
            PanelSettings.domain.field.name,
            PanelSettings.panel_port.field.name,
            PanelSettings.hysteria_port.field.name,
            PanelSettings.masquerade_url.field.name,
        )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in ("panel_port", "hysteria_port"):
            field = self.fields.get(field_name)
            if not field:
                continue
            field.widget.attrs.update(
                {
                    "min": PORT_MIN,
                    "max": PORT_MAX,
                },
            )

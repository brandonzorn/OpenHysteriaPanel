from django import forms

from clients.models import Client
from core.mixins import WidgetClassMixin


class ClientForm(WidgetClassMixin, forms.ModelForm):
    class Meta:
        model = Client

        fields = (
            Client.title.field.name,
            Client.username.field.name,
            Client.password.field.name,
            Client.upload_limit_mbps.field.name,
            Client.download_limit_mbps.field.name,
            Client.traffic_limit_gb.field.name,
            Client.expires_at.field.name,
        )

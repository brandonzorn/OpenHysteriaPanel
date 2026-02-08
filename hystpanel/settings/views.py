from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.core.exceptions import PermissionDenied
from django.urls import reverse_lazy
from django.views.generic.edit import UpdateView

from settings.forms import PanelSettingsForm
from settings.models import PanelSettings


class SettingsView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    template_name = "settings/settings.html"
    form_class = PanelSettingsForm
    model = PanelSettings
    success_url = reverse_lazy("panel-settings")

    def get_object(self, queryset=None):
        return PanelSettings.get_solo()

    def test_func(self):
        return self.request.user.is_superuser

    def handle_no_permission(self):
        raise PermissionDenied

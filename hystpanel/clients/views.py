from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView

from clients.forms import ClientForm
from clients.models import Client


class ClientsView(TemplateView):
    template_name = "clients/clients.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["form"] = ClientForm()
        context["clients"] = Client.objects.all()
        return context

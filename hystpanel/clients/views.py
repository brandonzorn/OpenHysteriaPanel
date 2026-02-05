from django.views.generic import TemplateView


class ClientsView(TemplateView):
    template_name = "clients/clients.html"

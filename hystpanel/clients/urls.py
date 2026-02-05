from django.urls import path

from clients.views import ClientsView

app_name = "clients"

urlpatterns = [
    path("", ClientsView.as_view(), name="clients-list"),
]

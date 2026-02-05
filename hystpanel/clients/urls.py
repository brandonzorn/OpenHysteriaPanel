from django.urls import path

from clients.views import ClientsView

urlpatterns = [
    path("", ClientsView.as_view(), name="clients"),
]

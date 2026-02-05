from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    ClientViewSet,
    DashboardStatsView,
    HysteriaAuthView,
    ServerControlView,
)

router = DefaultRouter()
router.register(r"clients", ClientViewSet, basename="clients")

urlpatterns = [
    path(
        "dashboard/",
        DashboardStatsView.as_view(),
        name="dashboard-stats",
    ),
    path(
        "server/<str:action>/",
        ServerControlView.as_view(),
        name="server-control",
    ),
    path(
        "hysteria/auth/",
        HysteriaAuthView.as_view(),
        name="hysteria-auth",
    ),
    path(
        "",
        include(router.urls),
    ),
]

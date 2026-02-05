from django.utils import timezone
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from clients.models import Client
from dashboard.services import get_hysteria_status, get_system_stats

from .serializers import ClientSerializer


class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        stats = get_system_stats()
        stats["hysteria_status"] = get_hysteria_status()
        stats["active_clients_count"] = Client.objects.filter(
            is_active=True,
        ).count()
        return Response(stats)


class ServerControlView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, action):
        if action not in ["start", "stop", "restart", "reload"]:
            return Response(
                {"error": "Invalid action"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response({"status": f"Command {action} sent", "success": True})


class HysteriaAuthView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        auth_value = request.data.get("auth")
        if not auth_value:
            return Response({"ok": False})

        client = Client.objects.filter(
            password=auth_value,
            is_active=True,
        ).first()
        if not client:
            return Response({"ok": False})

        if client.expires_at and client.expires_at < timezone.now():
            return Response({"ok": False})

        return Response({"ok": True, "id": client.username})

from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path("api/", include("api.urls")),
    path("clients/", include("clients.urls")),
    path("settings/", include("settings.urls")),
    path("", include("dashboard.urls")),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns.append(path("__debug__/", include(debug_toolbar.urls)))

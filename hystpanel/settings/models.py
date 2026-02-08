from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.validators import PORT_MAX, PORT_MIN, validate_safe_port


class PanelSettings(models.Model):
    domain = models.CharField(
        _("Domain"),
        max_length=255,
        help_text=_("Primary domain for the panel."),
    )
    panel_port = models.PositiveIntegerField(
        _("Panel port"),
        validators=[
            MinValueValidator(PORT_MIN),
            MaxValueValidator(PORT_MAX),
            validate_safe_port,
        ],
        help_text=_("External port where the panel is available."),
    )
    hysteria_port = models.PositiveIntegerField(
        _("Hysteria port"),
        validators=[
            MinValueValidator(PORT_MIN),
            MaxValueValidator(PORT_MAX),
            validate_safe_port,
        ],
        help_text=_("Port used by the Hysteria server."),
    )
    masquerade_url = models.URLField(
        _("Masquerade site"),
        help_text=_("Site URL used for Hysteria masquerade."),
    )
    updated_at = models.DateTimeField(
        _("Updated at"),
        auto_now=True,
    )

    class Meta:
        verbose_name = _("Panel settings")
        verbose_name_plural = _("Panel settings")

    def __str__(self):
        return self.domain or _("Panel settings")

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj

    def clean(self):
        super().clean()
        if self.panel_port == self.hysteria_port:
            raise ValidationError(
                _("Panel port and Hysteria port must be different."),
            )

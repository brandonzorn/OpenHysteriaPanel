from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

PORT_MIN = 1024
PORT_MAX = 65535
RESERVED_PORTS = {}

alnum_validator = RegexValidator(
    r"^[A-Za-z0-9]+$",
    _("Only letters and digits are allowed."),
)


def validate_safe_port(value):
    if value in RESERVED_PORTS:
        raise ValidationError(
            _("Port %(port)s is reserved. Choose another port."),
            params={"port": value},
        )
    if value < PORT_MIN or value > PORT_MAX:
        raise ValidationError(
            _("Port must be between %(min)s and %(max)s."),
            params={"min": PORT_MIN, "max": PORT_MAX},
        )


__all__ = [
    "alnum_validator",
    "PORT_MIN",
    "PORT_MAX",
    "RESERVED_PORTS",
    "validate_safe_port",
]

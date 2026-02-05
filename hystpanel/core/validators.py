from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

alnum_validator = RegexValidator(
    r"^[A-Za-z0-9]+$",
    _("Only letters and digits are allowed."),
)


__all__ = ["alnum_validator"]

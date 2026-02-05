from allauth.account.forms import LoginForm

from core.mixins import WidgetClassMixin


class StyledLoginForm(WidgetClassMixin, LoginForm):
    pass

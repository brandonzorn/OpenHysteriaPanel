from allauth.account.models import EmailAddress
from decouple import config
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db.models import Q


class Command(BaseCommand):
    help = "Create a superuser"

    def handle(self, *args, **options):
        superuser_name = config("SUPERUSER_NAME", cast=str)
        superuser_email = config("SUPERUSER_EMAIL", cast=str)
        superuser_password = config("SUPERUSER_PASSWORD", cast=str)

        if (
            not get_user_model()
            .objects.filter(
                Q(username=superuser_name) | Q(email=superuser_email),
            )
            .exists()
        ):
            superuser = get_user_model().objects.create_superuser(
                username=superuser_name,
                email=superuser_email,
                password=superuser_password,
            )
            EmailAddress.objects.create(
                user=superuser,
                email=superuser_email,
                primary=True,
                verified=True,
            )

            self.stdout.write(
                self.style.SUCCESS("Superuser created successfully!"),
            )
        else:
            self.stdout.write(
                self.style.SUCCESS("Superuser already exists!"),
            )


__all__ = []

FROM python:3.14-alpine

RUN apk add --no-cache gettext

COPY ./requirements /requirements
RUN pip install --no-cache-dir -r requirements/dev.txt
RUN rm -rf requirements

COPY ./hystpanel /hystpanel/
WORKDIR /hystpanel

CMD python manage.py migrate \
 && python manage.py compilemessages \
 && python manage.py collectstatic --no-input \
 && python manage.py init_superuser \
 && python manage.py init_site \
 && python manage.py runserver 0.0.0.0:8888
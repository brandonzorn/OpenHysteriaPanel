FROM python:3.14-alpine

COPY ./requirements /requirements
RUN pip install --no-cache-dir -r requirements/prod.txt
RUN rm -rf requirements

COPY ./hystpanel /hystpanel
WORKDIR /hystpanel

CMD ["python", "-m", "bot.main"]
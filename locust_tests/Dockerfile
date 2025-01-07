FROM python:3.13

WORKDIR /locust_tests

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["locust", "-f", "locustfile.py", "-H", "http://localhost:5001"]

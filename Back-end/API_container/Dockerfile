FROM python:3.11

WORKDIR /app

# Copy requirements first (to not reinstall dependencies on every code change)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the apps code
COPY . .

CMD ["uvicorn", "API_service.app:app", "--host", "0.0.0.0", "--port", "8001"]

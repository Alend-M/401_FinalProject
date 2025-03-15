FROM python:3.11

WORKDIR /app

# Copy requirements first (to not reinstall dependencies on every code change)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the apps code
COPY . .

# Expose the port for gateway service
# the rest of the services will be reached through a bridge network
EXPOSE 8000

CMD ["uvicorn", "Gateway_service.app:app", "--host", "0.0.0.0", "--port", "8000"]

# Use a lightweight Python image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Set working directory inside the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the entire backend code
COPY . .

# Expose port 8000 for FastAPI
EXPOSE 8000

# Run database initialization before starting the app
RUN chmod +x start.sh  # Ensure start.sh is executable

# Start the application
CMD ["./start.sh"]

# Use a lightweight Python image
FROM python:3.9-slim  

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1  

# Set working directory inside the container
WORKDIR /app  

# Copy requirements first (better for Docker layer caching)
COPY requirements.txt .  

# Force install dependencies (including Uvicorn)
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && pip install --no-cache-dir uvicorn  

# Copy the entire backend code
COPY . .  

# Ensure start.sh is executable
RUN chmod +x start.sh  

# Expose FastAPI port
EXPOSE 10000

# Start the application
CMD ["bash", "./start.sh"]

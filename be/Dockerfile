# Use an official Python runtime as a parent image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.11

WORKDIR .

COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8080

# Run Uvicorn without Gunicorn for simplicity
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]



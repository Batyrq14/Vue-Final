FROM golang:1.21-alpine

WORKDIR /app

# Install dependencies
COPY go.mod go.sum* ./
RUN go mod download

# Copy source code
COPY . .

# Expose port
EXPOSE 8083

# Run the application
CMD ["go", "run", "main.go"]

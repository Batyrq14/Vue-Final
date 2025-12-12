.PHONY: up down logs init clean

# Start all services
up:
	docker-compose up -d

# Stop all services
down:
	docker-compose down

# View logs from all services
logs:
	docker-compose logs -f

# Install dependencies for both frontend and backend
init:
	@echo "Installing backend dependencies..."
	cd backend && go mod download
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "Dependencies installed successfully!"

# Clean up everything including volumes
clean:
	docker-compose down -v
	rm -rf backend/vendor
	rm -rf frontend/node_modules

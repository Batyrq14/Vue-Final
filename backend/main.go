package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	gorillaHandlers "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	appHandlers "github.com/unievents/backend/handlers"
)

var db *sql.DB

func main() {
	// Get database URL from environment
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		databaseURL = "postgres://postgres:postgres@localhost:5431/unievents?sslmode=disable"
	}

	// Connect to database
	var err error
	db, err = sql.Open("postgres", databaseURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Test database connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Failed to ping database:", err)
	}
	log.Println("Successfully connected to database")

	// Initialize database (create tables and seed data)
	if err := initDatabase(db); err != nil {
		log.Printf("Warning: Database initialization failed: %v", err)
	}

	// Set database connection for handlers
	appHandlers.DB = db

	// Initialize router
	router := mux.NewRouter()

	// Register routes
	router.HandleFunc("/api/events", appHandlers.GetEvents).Methods("GET")

	// Get port from environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "8083"
	}

	// Configure CORS
	corsHandler := gorillaHandlers.CORS(
		gorillaHandlers.AllowedOrigins([]string{"http://localhost:5173", "http://localhost:5174"}),
		gorillaHandlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		gorillaHandlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(router)

	// Start server
	addr := fmt.Sprintf(":%s", port)
	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(addr, corsHandler); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}

func initDatabase(db *sql.DB) error {
	// Read SQL file
	sqlBytes, err := os.ReadFile("init.sql")
	if err != nil {
		return fmt.Errorf("failed to read init.sql: %w", err)
	}

	// Execute SQL
	_, err = db.Exec(string(sqlBytes))
	if err != nil {
		return fmt.Errorf("failed to execute init.sql: %w", err)
	}

	log.Println("Database initialized successfully")
	return nil
}

package handlers

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/unievents/backend/models"
)

var DB *sql.DB

// GetEvents returns a list of events from the database
func GetEvents(w http.ResponseWriter, r *http.Request) {
	rows, err := DB.Query("SELECT id, title, date, description FROM events ORDER BY date ASC")
	if err != nil {
		log.Printf("Error querying events: %v", err)
		http.Error(w, "Failed to fetch events", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	events := []models.Event{}
	for rows.Next() {
		var event models.Event
		err := rows.Scan(&event.ID, &event.Title, &event.Date, &event.Description)
		if err != nil {
			log.Printf("Error scanning event: %v", err)
			continue
		}
		events = append(events, event)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(events)
}

package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/unievents/backend/models"
)

// GetEvents returns a list of events
// TODO: Implement database query to fetch actual events
func GetEvents(w http.ResponseWriter, r *http.Request) {
	// Placeholder: return empty list
	events := []models.Event{}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(events)
}

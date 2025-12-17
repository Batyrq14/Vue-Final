package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/unievents/backend/models"
)

// CreateRSVP handles RSVP creation
func CreateRSVP(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	eventID := vars["id"]

	var req models.RSVPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.UserEmail == "" {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}

	// Insert RSVP
	var rsvpID int
	err := DB.QueryRow(
		"INSERT INTO rsvps (event_id, user_email) VALUES ($1, $2) RETURNING id",
		eventID, req.UserEmail,
	).Scan(&rsvpID)

	if err != nil {
		log.Printf("Error creating RSVP: %v", err)
		http.Error(w, "Failed to create RSVP. You may have already RSVPed.", http.StatusConflict)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "RSVP successful",
		"rsvp_id": rsvpID,
	})
}

// DeleteRSVP handles RSVP cancellation
func DeleteRSVP(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	eventID := vars["id"]

	var req models.RSVPRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	result, err := DB.Exec(
		"DELETE FROM rsvps WHERE event_id = $1 AND user_email = $2",
		eventID, req.UserEmail,
	)

	if err != nil {
		log.Printf("Error deleting RSVP: %v", err)
		http.Error(w, "Failed to cancel RSVP", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "RSVP not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "RSVP cancelled successfully",
	})
}

// GetRSVPCount returns the count of RSVPs for an event
func GetRSVPCount(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	eventID := vars["id"]

	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM rsvps WHERE event_id = $1", eventID).Scan(&count)
	if err != nil {
		log.Printf("Error getting RSVP count: %v", err)
		http.Error(w, "Failed to get RSVP count", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{
		"count": count,
	})
}

// CheckUserRSVP checks if a user has RSVPed to an event
func CheckUserRSVP(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	eventID := vars["id"]
	userEmail := r.URL.Query().Get("email")

	if userEmail == "" {
		http.Error(w, "Email parameter is required", http.StatusBadRequest)
		return
	}

	var exists bool
	err := DB.QueryRow(
		"SELECT EXISTS(SELECT 1 FROM rsvps WHERE event_id = $1 AND user_email = $2)",
		eventID, userEmail,
	).Scan(&exists)

	if err != nil {
		log.Printf("Error checking RSVP: %v", err)
		http.Error(w, "Failed to check RSVP status", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{
		"is_rsvped": exists,
	})
}

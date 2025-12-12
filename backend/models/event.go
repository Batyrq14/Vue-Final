package models

import "time"

// Event represents a campus event
type Event struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Date        time.Time `json:"date"`
	Description string    `json:"description"`
}

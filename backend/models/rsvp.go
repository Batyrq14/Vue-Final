package models

import "time"

// RSVP represents an event RSVP
type RSVP struct {
	ID        int       `json:"id"`
	EventID   int       `json:"event_id"`
	UserEmail string    `json:"user_email"`
	CreatedAt time.Time `json:"created_at"`
}

// RSVPRequest represents an RSVP creation request
type RSVPRequest struct {
	UserEmail string `json:"user_email"`
}

// RSVPCount represents the count of RSVPs for an event
type RSVPCount struct {
	EventID int `json:"event_id"`
	Count   int `json:"count"`
}

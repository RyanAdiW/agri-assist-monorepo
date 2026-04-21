package domain

import (
	"errors"
	"strings"
	"time"
)

var ErrDiagnosisIDRequired = errors.New("diagnosis id is required")

type Submission struct {
	DiagnosisID string `json:"diagnosis_id"`
	IsHelpful   bool   `json:"is_helpful"`
	Notes       string `json:"notes,omitempty"`
}

type Result struct {
	Status      string     `json:"status"`
	SubmittedAt string     `json:"submitted_at"`
	Payload     Submission `json:"payload"`
}

type Record struct {
	ID          string
	DiagnosisID string
	IsHelpful   bool
	Notes       string
	SubmittedAt time.Time
}

func (s Submission) Normalize() Submission {
	return Submission{
		DiagnosisID: strings.TrimSpace(s.DiagnosisID),
		IsHelpful:   s.IsHelpful,
		Notes:       strings.TrimSpace(s.Notes),
	}
}

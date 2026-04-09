package domain

import (
	"errors"
	"strings"
	"time"
)

var ErrDiagnosisIDRequired = errors.New("diagnosis id is required")

type Submission struct {
	DiagnosisID string `json:"diagnosisId"`
	IsHelpful   bool   `json:"isHelpful"`
	Notes       string `json:"notes,omitempty"`
}

type Result struct {
	Status      string     `json:"status"`
	SubmittedAt string     `json:"submittedAt"`
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

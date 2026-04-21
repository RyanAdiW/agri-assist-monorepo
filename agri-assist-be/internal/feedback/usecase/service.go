package usecase

import (
	"context"
	"time"

	"agri-assist-be/internal/feedback/domain"
	"github.com/google/uuid"
)

type Service struct {
	repository domain.Repository
	now        func() time.Time
}

func NewService(repository domain.Repository) *Service {
	return &Service{
		repository: repository,
		now:        time.Now,
	}
}

func (s *Service) Save(ctx context.Context, submission domain.Submission) (domain.Result, error) {
	normalized := submission.Normalize()
	if normalized.DiagnosisID == "" {
		return domain.Result{}, domain.ErrDiagnosisIDRequired
	}

	submittedAt := s.now().UTC()
	record := domain.Record{
		ID:          uuid.NewString(),
		DiagnosisID: normalized.DiagnosisID,
		IsHelpful:   normalized.IsHelpful,
		Notes:       normalized.Notes,
		SubmittedAt: submittedAt,
	}

	if err := s.repository.Save(ctx, record); err != nil {
		return domain.Result{}, err
	}

	return domain.Result{
		Status:      "saved",
		SubmittedAt: submittedAt.Format(time.RFC3339),
		Payload:     normalized,
	}, nil
}

package postgres

import (
	"context"
	"fmt"

	"agri-assist-be/internal/feedback/domain"
	postgresplatform "agri-assist-be/internal/platform/postgres"
	"gorm.io/gorm"
)

type Repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) Save(ctx context.Context, record domain.Record) error {
	model := postgresplatform.FeedbackModel{
		ID:          record.ID,
		DiagnosisID: record.DiagnosisID,
		IsHelpful:   record.IsHelpful,
		Notes:       record.Notes,
		SubmittedAt: record.SubmittedAt,
	}

	if err := r.db.WithContext(ctx).Create(&model).Error; err != nil {
		return fmt.Errorf("save feedback: %w", err)
	}

	return nil
}

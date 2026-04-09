package memory

import (
	"context"
	"sync"

	"agri-assist-be/internal/feedback/domain"
)

type Repository struct {
	mu      sync.Mutex
	records []domain.Record
}

func NewRepository() *Repository {
	return &Repository{
		records: make([]domain.Record, 0),
	}
}

func (r *Repository) Save(_ context.Context, record domain.Record) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	r.records = append(r.records, record)
	return nil
}

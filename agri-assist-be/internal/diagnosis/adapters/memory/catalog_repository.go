package memory

import (
	"context"

	"agri-assist-be/internal/diagnosis/domain"
	"agri-assist-be/internal/seed"
)

type CatalogRepository struct {
	dataset seed.Dataset
}

func NewCatalogRepository(dataset seed.Dataset) *CatalogRepository {
	return &CatalogRepository{dataset: dataset}
}

func (r *CatalogRepository) GetCrop(_ context.Context, cropID string) (domain.Crop, error) {
	if cropID != r.dataset.Crop.ID {
		return domain.Crop{}, domain.ErrCropNotFound
	}

	return r.dataset.Crop, nil
}

func (r *CatalogRepository) ListSymptomsByCrop(_ context.Context, cropID string) ([]domain.Symptom, error) {
	if cropID != r.dataset.Crop.ID {
		return nil, domain.ErrCropNotFound
	}

	symptoms := make([]domain.Symptom, len(r.dataset.Symptoms))
	copy(symptoms, r.dataset.Symptoms)

	return symptoms, nil
}

func (r *CatalogRepository) ListDiseasesByCrop(_ context.Context, cropID string) ([]domain.Disease, error) {
	if cropID != r.dataset.Crop.ID {
		return nil, domain.ErrCropNotFound
	}

	diseases := make([]domain.Disease, len(r.dataset.Diseases))
	copy(diseases, r.dataset.Diseases)

	return diseases, nil
}

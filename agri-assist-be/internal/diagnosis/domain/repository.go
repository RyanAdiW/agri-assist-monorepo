package domain

import "context"

type CatalogRepository interface {
	GetCrop(ctx context.Context, cropID string) (Crop, error)
	ListSymptomsByCrop(ctx context.Context, cropID string) ([]Symptom, error)
	ListDiseasesByCrop(ctx context.Context, cropID string) ([]Disease, error)
}

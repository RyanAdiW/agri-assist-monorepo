package postgres

import (
	"context"
	"errors"
	"fmt"

	"agri-assist-be/internal/diagnosis/domain"
	postgresplatform "agri-assist-be/internal/platform/postgres"
	"gorm.io/gorm"
)

type CatalogRepository struct {
	db *gorm.DB
}

func NewCatalogRepository(db *gorm.DB) *CatalogRepository {
	return &CatalogRepository{db: db}
}

func (r *CatalogRepository) GetCrop(ctx context.Context, cropID string) (domain.Crop, error) {
	var model postgresplatform.CropModel
	err := r.db.WithContext(ctx).
		Where("id = ?", cropID).
		First(&model).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return domain.Crop{}, domain.ErrCropNotFound
	}
	if err != nil {
		return domain.Crop{}, fmt.Errorf("get crop: %w", err)
	}

	return domain.Crop{
		ID:   model.ID,
		Name: model.Name,
	}, nil
}

func (r *CatalogRepository) ListSymptomsByCrop(ctx context.Context, cropID string) ([]domain.Symptom, error) {
	if _, err := r.GetCrop(ctx, cropID); err != nil {
		return nil, err
	}

	var models []postgresplatform.SymptomModel
	if err := r.db.WithContext(ctx).
		Where("crop_id = ?", cropID).
		Order("sort_order ASC").
		Find(&models).Error; err != nil {
		return nil, fmt.Errorf("list symptoms by crop: %w", err)
	}

	symptoms := make([]domain.Symptom, 0, len(models))
	for _, model := range models {
		symptoms = append(symptoms, domain.Symptom{
			ID:       model.ID,
			Name:     model.Name,
			Category: domain.SymptomCategory(model.Category),
			Hint:     model.Hint,
		})
	}

	return symptoms, nil
}

func (r *CatalogRepository) ListDiseasesByCrop(ctx context.Context, cropID string) ([]domain.Disease, error) {
	if _, err := r.GetCrop(ctx, cropID); err != nil {
		return nil, err
	}

	var models []postgresplatform.DiseaseModel
	if err := r.db.WithContext(ctx).
		Where("crop_id = ?", cropID).
		Order("sort_order ASC").
		Preload("SymptomRules", func(db *gorm.DB) *gorm.DB {
			return db.Order("sort_order ASC")
		}).
		Preload("Treatments", func(db *gorm.DB) *gorm.DB {
			return db.Order("sort_order ASC")
		}).
		Find(&models).Error; err != nil {
		return nil, fmt.Errorf("list diseases by crop: %w", err)
	}

	diseases := make([]domain.Disease, 0, len(models))
	for _, model := range models {
		rules := make([]domain.DiseaseSymptom, 0, len(model.SymptomRules))
		for _, rule := range model.SymptomRules {
			rules = append(rules, domain.DiseaseSymptom{
				SymptomID: rule.SymptomID,
				Weight:    rule.Weight,
			})
		}

		treatments := make([]domain.Treatment, 0, len(model.Treatments))
		for _, treatment := range model.Treatments {
			treatments = append(treatments, domain.Treatment{
				Category: domain.TreatmentCategory(treatment.Category),
				Content:  treatment.Content,
			})
		}

		diseases = append(diseases, domain.Disease{
			ID:           model.ID,
			CropID:       model.CropID,
			Name:         model.Name,
			Description:  model.Description,
			SymptomRules: rules,
			Treatments:   treatments,
		})
	}

	return diseases, nil
}

package postgres

import (
	"fmt"

	"agri-assist-be/internal/seed"
	"gorm.io/gorm"
)

func MigrateAndSeed(db *gorm.DB, dataset seed.Dataset) error {
	if err := db.AutoMigrate(
		&CropModel{},
		&SymptomModel{},
		&DiseaseModel{},
		&DiseaseSymptomModel{},
		&TreatmentModel{},
		&FeedbackModel{},
	); err != nil {
		return fmt.Errorf("auto migrate postgres schema: %w", err)
	}

	if err := seedDataset(db, dataset); err != nil {
		return fmt.Errorf("seed postgres catalog: %w", err)
	}

	return nil
}

func seedDataset(db *gorm.DB, dataset seed.Dataset) error {
	var count int64
	if err := db.Model(&CropModel{}).
		Where("id = ?", dataset.Crop.ID).
		Count(&count).Error; err != nil {
		return fmt.Errorf("check seeded crop: %w", err)
	}

	if count > 0 {
		return nil
	}

	return db.Transaction(func(tx *gorm.DB) error {
		crop := CropModel{
			ID:   dataset.Crop.ID,
			Name: dataset.Crop.Name,
		}
		if err := tx.Create(&crop).Error; err != nil {
			return fmt.Errorf("create crop: %w", err)
		}

		symptoms := make([]SymptomModel, 0, len(dataset.Symptoms))
		for index, symptom := range dataset.Symptoms {
			symptoms = append(symptoms, SymptomModel{
				ID:        symptom.ID,
				CropID:    dataset.Crop.ID,
				SortOrder: index + 1,
				Name:      symptom.Name,
				Category:  string(symptom.Category),
				Hint:      symptom.Hint,
			})
		}
		if len(symptoms) > 0 {
			if err := tx.Create(&symptoms).Error; err != nil {
				return fmt.Errorf("create symptoms: %w", err)
			}
		}

		diseases := make([]DiseaseModel, 0, len(dataset.Diseases))
		rules := make([]DiseaseSymptomModel, 0)
		treatments := make([]TreatmentModel, 0)

		for diseaseIndex, disease := range dataset.Diseases {
			diseases = append(diseases, DiseaseModel{
				ID:          disease.ID,
				CropID:      disease.CropID,
				SortOrder:   diseaseIndex + 1,
				Name:        disease.Name,
				Description: disease.Description,
			})

			for ruleIndex, rule := range disease.SymptomRules {
				rules = append(rules, DiseaseSymptomModel{
					DiseaseID: disease.ID,
					SymptomID: rule.SymptomID,
					SortOrder: ruleIndex + 1,
					Weight:    rule.Weight,
				})
			}

			for treatmentIndex, treatment := range disease.Treatments {
				treatments = append(treatments, TreatmentModel{
					DiseaseID: disease.ID,
					SortOrder: treatmentIndex + 1,
					Category:  string(treatment.Category),
					Content:   treatment.Content,
				})
			}
		}

		if len(diseases) > 0 {
			if err := tx.Create(&diseases).Error; err != nil {
				return fmt.Errorf("create diseases: %w", err)
			}
		}

		if len(rules) > 0 {
			if err := tx.Create(&rules).Error; err != nil {
				return fmt.Errorf("create disease symptoms: %w", err)
			}
		}

		if len(treatments) > 0 {
			if err := tx.Create(&treatments).Error; err != nil {
				return fmt.Errorf("create treatments: %w", err)
			}
		}

		return nil
	})
}

package postgres

import (
	"fmt"

	"agri-assist-be/internal/seed"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

func MigrateAndSeed(db *gorm.DB, dataset seed.Dataset) error {
	if err := ensurePostgresExtensions(db); err != nil {
		return fmt.Errorf("enable postgres extensions: %w", err)
	}

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

	if err := migrateFeedbackIDsToUUID(db); err != nil {
		return fmt.Errorf("migrate feedback ids to uuid: %w", err)
	}

	if err := db.AutoMigrate(&FeedbackModel{}); err != nil {
		return fmt.Errorf("sync feedback schema after uuid migration: %w", err)
	}

	if err := seedDataset(db, dataset); err != nil {
		return fmt.Errorf("seed postgres catalog: %w", err)
	}

	return nil
}

func ensurePostgresExtensions(db *gorm.DB) error {
	return db.Exec(`CREATE EXTENSION IF NOT EXISTS pgcrypto`).Error
}

func migrateFeedbackIDsToUUID(db *gorm.DB) error {
	if !db.Migrator().HasTable(&FeedbackModel{}) {
		return nil
	}

	var dataType string
	if err := db.Raw(`
		SELECT data_type
		FROM information_schema.columns
		WHERE table_schema = current_schema()
		  AND table_name = 'feedbacks'
		  AND column_name = 'id'
	`).Scan(&dataType).Error; err != nil {
		return err
	}

	if dataType == "" || dataType == "uuid" {
		return nil
	}

	return db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Exec(`
			ALTER TABLE feedbacks
			ADD COLUMN IF NOT EXISTS id_uuid uuid DEFAULT gen_random_uuid()
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			UPDATE feedbacks
			SET id_uuid = gen_random_uuid()
			WHERE id_uuid IS NULL
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			ALTER TABLE feedbacks
			ALTER COLUMN id_uuid SET NOT NULL
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			ALTER TABLE feedbacks
			DROP CONSTRAINT IF EXISTS feedbacks_pkey
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			ALTER TABLE feedbacks
			DROP COLUMN id
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			ALTER TABLE feedbacks
			RENAME COLUMN id_uuid TO id
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			ALTER TABLE feedbacks
			ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id)
		`).Error; err != nil {
			return err
		}

		if err := tx.Exec(`
			ALTER TABLE feedbacks
			ALTER COLUMN id SET DEFAULT gen_random_uuid()
		`).Error; err != nil {
			return err
		}

		return nil
	})
}

func seedDataset(db *gorm.DB, dataset seed.Dataset) error {
	return db.Transaction(func(tx *gorm.DB) error {
		crop := CropModel{
			ID:   dataset.Crop.ID,
			Name: dataset.Crop.Name,
		}
		if err := tx.Clauses(clause.OnConflict{
			Columns:   []clause.Column{{Name: "id"}},
			DoUpdates: clause.AssignmentColumns([]string{"name"}),
		}).Create(&crop).Error; err != nil {
			return fmt.Errorf("upsert crop: %w", err)
		}

		diseaseIDs := tx.Model(&DiseaseModel{}).
			Select("id").
			Where("crop_id = ?", dataset.Crop.ID)

		if err := tx.Where("disease_id IN (?)", diseaseIDs).
			Delete(&DiseaseSymptomModel{}).Error; err != nil {
			return fmt.Errorf("delete previous disease symptoms: %w", err)
		}

		if err := tx.Where("disease_id IN (?)", diseaseIDs).
			Delete(&TreatmentModel{}).Error; err != nil {
			return fmt.Errorf("delete previous treatments: %w", err)
		}

		if err := tx.Where("crop_id = ?", dataset.Crop.ID).
			Delete(&DiseaseModel{}).Error; err != nil {
			return fmt.Errorf("delete previous diseases: %w", err)
		}

		if err := tx.Where("crop_id = ?", dataset.Crop.ID).
			Delete(&SymptomModel{}).Error; err != nil {
			return fmt.Errorf("delete previous symptoms: %w", err)
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

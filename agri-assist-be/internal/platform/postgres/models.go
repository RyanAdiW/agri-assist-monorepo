package postgres

import "time"

type CropModel struct {
	ID       string         `gorm:"primaryKey;size:100"`
	Name     string         `gorm:"size:255;not null"`
	Symptoms []SymptomModel `gorm:"foreignKey:CropID;references:ID;constraint:OnDelete:CASCADE"`
	Diseases []DiseaseModel `gorm:"foreignKey:CropID;references:ID;constraint:OnDelete:CASCADE"`
}

func (CropModel) TableName() string {
	return "crops"
}

type SymptomModel struct {
	ID        string `gorm:"primaryKey;size:100"`
	CropID    string `gorm:"size:100;not null;index"`
	SortOrder int    `gorm:"not null"`
	Name      string `gorm:"size:255;not null"`
	Category  string `gorm:"size:100;not null"`
	Hint      string `gorm:"type:text;not null"`
}

func (SymptomModel) TableName() string {
	return "symptoms"
}

type DiseaseModel struct {
	ID           string                `gorm:"primaryKey;size:100"`
	CropID       string                `gorm:"size:100;not null;index"`
	SortOrder    int                   `gorm:"not null"`
	Name         string                `gorm:"size:255;not null"`
	Description  string                `gorm:"type:text;not null"`
	SymptomRules []DiseaseSymptomModel `gorm:"foreignKey:DiseaseID;references:ID;constraint:OnDelete:CASCADE"`
	Treatments   []TreatmentModel      `gorm:"foreignKey:DiseaseID;references:ID;constraint:OnDelete:CASCADE"`
}

func (DiseaseModel) TableName() string {
	return "diseases"
}

type DiseaseSymptomModel struct {
	DiseaseID string `gorm:"primaryKey;size:100"`
	SymptomID string `gorm:"primaryKey;size:100"`
	SortOrder int    `gorm:"not null"`
	Weight    int    `gorm:"not null"`
}

func (DiseaseSymptomModel) TableName() string {
	return "disease_symptoms"
}

type TreatmentModel struct {
	ID        uint   `gorm:"primaryKey"`
	DiseaseID string `gorm:"size:100;not null;index"`
	SortOrder int    `gorm:"not null"`
	Category  string `gorm:"size:100;not null"`
	Content   string `gorm:"type:text;not null"`
}

func (TreatmentModel) TableName() string {
	return "treatments"
}

type FeedbackModel struct {
	ID          string    `gorm:"primaryKey;size:50"`
	DiagnosisID string    `gorm:"size:100;not null;index"`
	IsHelpful   bool      `gorm:"not null"`
	Notes       string    `gorm:"type:text"`
	SubmittedAt time.Time `gorm:"not null;index"`
}

func (FeedbackModel) TableName() string {
	return "feedbacks"
}

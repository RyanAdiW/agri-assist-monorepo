package domain

import "errors"

type SymptomCategory string

const (
	SymptomCategoryLeaf   SymptomCategory = "daun"
	SymptomCategoryStem   SymptomCategory = "batang"
	SymptomCategoryFruit  SymptomCategory = "buah"
	SymptomCategoryRoot   SymptomCategory = "akar"
	SymptomCategoryCommon SymptomCategory = "umum"
)

type TreatmentCategory string

const (
	TreatmentCategoryNatural    TreatmentCategory = "alami"
	TreatmentCategoryPrevention TreatmentCategory = "pencegahan"
	TreatmentCategoryOrganic    TreatmentCategory = "organik"
	TreatmentCategoryChemical   TreatmentCategory = "kimia"
)

type ConfidenceLabel string

const (
	ConfidenceHigh   ConfidenceLabel = "tinggi"
	ConfidenceMedium ConfidenceLabel = "sedang"
	ConfidenceLow    ConfidenceLabel = "rendah"
)

var ErrCropNotFound = errors.New("crop not found")

type Crop struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Symptom struct {
	ID       string          `json:"id"`
	Name     string          `json:"name"`
	Category SymptomCategory `json:"category"`
	Hint     string          `json:"hint"`
}

type DiseaseSymptom struct {
	SymptomID string `json:"symptomId"`
	Weight    int    `json:"weight"`
}

type Treatment struct {
	Category TreatmentCategory `json:"category"`
	Content  string            `json:"content"`
}

type Disease struct {
	ID           string           `json:"id"`
	CropID       string           `json:"cropId"`
	Name         string           `json:"name"`
	Description  string           `json:"description"`
	SymptomRules []DiseaseSymptom `json:"symptoms"`
	Treatments   []Treatment      `json:"treatments"`
}

type SymptomsResponse struct {
	CropID   string    `json:"cropId"`
	CropName string    `json:"cropName"`
	Symptoms []Symptom `json:"symptoms"`
}

type DiagnosisRequest struct {
	CropID     string   `json:"cropId"`
	SymptomIDs []string `json:"symptomIds"`
}

type TreatmentPillar struct {
	Category TreatmentCategory `json:"category"`
	Title    string            `json:"title"`
	Items    []string          `json:"items"`
}

type DiagnosisCandidate struct {
	ID                string            `json:"id"`
	Name              string            `json:"name"`
	Description       string            `json:"description"`
	Score             float64           `json:"score"`
	ConfidenceLabel   ConfidenceLabel   `json:"confidenceLabel"`
	MatchedSymptomIDs []string          `json:"matchedSymptomIds"`
	TreatmentPillars  []TreatmentPillar `json:"treatmentPillars"`
}

type DiagnosisResponse struct {
	CropID                string               `json:"cropId"`
	CropName              string               `json:"cropName"`
	HasConfidentDiagnosis bool                 `json:"hasConfidentDiagnosis"`
	Message               string               `json:"message"`
	SelectedSymptomIDs    []string             `json:"selectedSymptomIds"`
	GeneratedAt           string               `json:"generatedAt"`
	Candidates            []DiagnosisCandidate `json:"candidates"`
}

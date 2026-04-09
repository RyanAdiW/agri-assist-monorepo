package usecase

import (
	"context"
	"math"
	"sort"
	"time"

	"agri-assist-be/internal/diagnosis/domain"
)

const diagnosisThreshold = 0.6

var treatmentTitles = map[domain.TreatmentCategory]string{
	domain.TreatmentCategoryNatural:    "Penanganan alami",
	domain.TreatmentCategoryPrevention: "Langkah pencegahan",
	domain.TreatmentCategoryOrganic:    "Penggunaan pupuk organik",
	domain.TreatmentCategoryChemical:   "Penggunaan obat kimia",
}

var treatmentOrder = []domain.TreatmentCategory{
	domain.TreatmentCategoryNatural,
	domain.TreatmentCategoryPrevention,
	domain.TreatmentCategoryOrganic,
	domain.TreatmentCategoryChemical,
}

type UnknownSymptomsError struct {
	SymptomIDs []string
}

func (e UnknownSymptomsError) Error() string {
	return "one or more symptom ids are unknown"
}

type Service struct {
	catalog domain.CatalogRepository
	now     func() time.Time
}

func NewService(catalog domain.CatalogRepository) *Service {
	return &Service{
		catalog: catalog,
		now:     time.Now,
	}
}

func (s *Service) ListSymptoms(ctx context.Context, cropID string) (domain.SymptomsResponse, error) {
	if cropID == "" {
		cropID = "cabai"
	}

	crop, err := s.catalog.GetCrop(ctx, cropID)
	if err != nil {
		return domain.SymptomsResponse{}, err
	}

	symptoms, err := s.catalog.ListSymptomsByCrop(ctx, cropID)
	if err != nil {
		return domain.SymptomsResponse{}, err
	}

	return domain.SymptomsResponse{
		CropID:   crop.ID,
		CropName: crop.Name,
		Symptoms: symptoms,
	}, nil
}

func (s *Service) Diagnose(ctx context.Context, request domain.DiagnosisRequest) (domain.DiagnosisResponse, error) {
	cropID := request.CropID
	if cropID == "" {
		cropID = "cabai"
	}

	crop, err := s.catalog.GetCrop(ctx, cropID)
	if err != nil {
		return domain.DiagnosisResponse{}, err
	}

	symptoms, err := s.catalog.ListSymptomsByCrop(ctx, cropID)
	if err != nil {
		return domain.DiagnosisResponse{}, err
	}

	knownSymptoms := make(map[string]struct{}, len(symptoms))
	for _, symptom := range symptoms {
		knownSymptoms[symptom.ID] = struct{}{}
	}

	unknownSymptoms := make([]string, 0)
	for _, symptomID := range request.SymptomIDs {
		if _, ok := knownSymptoms[symptomID]; !ok {
			unknownSymptoms = append(unknownSymptoms, symptomID)
		}
	}
	if len(unknownSymptoms) > 0 {
		return domain.DiagnosisResponse{}, UnknownSymptomsError{SymptomIDs: unknownSymptoms}
	}

	diseases, err := s.catalog.ListDiseasesByCrop(ctx, cropID)
	if err != nil {
		return domain.DiagnosisResponse{}, err
	}

	selectedSet := make(map[string]struct{}, len(request.SymptomIDs))
	for _, symptomID := range request.SymptomIDs {
		selectedSet[symptomID] = struct{}{}
	}

	ranked := make([]domain.DiagnosisCandidate, 0, len(diseases))
	for _, disease := range diseases {
		totalWeight := 0
		rawScore := 0
		matchedSymptoms := make([]string, 0)

		for _, rule := range disease.SymptomRules {
			totalWeight += rule.Weight
			if _, ok := selectedSet[rule.SymptomID]; ok {
				rawScore += rule.Weight
				matchedSymptoms = append(matchedSymptoms, rule.SymptomID)
			}
		}

		score := 0.0
		if totalWeight > 0 {
			score = roundScore(float64(rawScore) / float64(totalWeight))
		}

		ranked = append(ranked, domain.DiagnosisCandidate{
			ID:                disease.ID,
			Name:              disease.Name,
			Description:       disease.Description,
			Score:             score,
			ConfidenceLabel:   confidenceForScore(score),
			MatchedSymptomIDs: matchedSymptoms,
			TreatmentPillars:  mapPillars(disease.Treatments),
		})
	}

	sort.SliceStable(ranked, func(i, j int) bool {
		if ranked[i].Score == ranked[j].Score {
			return ranked[i].Name < ranked[j].Name
		}

		return ranked[i].Score > ranked[j].Score
	})

	hasConfidentDiagnosis := false
	for _, candidate := range ranked {
		if candidate.Score > diagnosisThreshold {
			hasConfidentDiagnosis = true
			break
		}
	}

	limit := 2
	if hasConfidentDiagnosis {
		limit = 3
	}
	if len(ranked) < limit {
		limit = len(ranked)
	}

	return domain.DiagnosisResponse{
		CropID:                crop.ID,
		CropName:              crop.Name,
		HasConfidentDiagnosis: hasConfidentDiagnosis,
		Message:               diagnosisMessage(hasConfidentDiagnosis),
		SelectedSymptomIDs:    append([]string(nil), request.SymptomIDs...),
		GeneratedAt:           s.now().UTC().Format(time.RFC3339),
		Candidates:            ranked[:limit],
	}, nil
}

func confidenceForScore(score float64) domain.ConfidenceLabel {
	if score >= 0.8 {
		return domain.ConfidenceHigh
	}
	if score > diagnosisThreshold {
		return domain.ConfidenceMedium
	}

	return domain.ConfidenceLow
}

func diagnosisMessage(hasConfidentDiagnosis bool) string {
	if hasConfidentDiagnosis {
		return "Berikut kemungkinan diagnosis dengan kecocokan gejala tertinggi."
	}

	return "Belum ada diagnosis yang cukup yakin. Kami tetap menampilkan kemungkinan teratas dengan label kemungkinan rendah."
}

func mapPillars(treatments []domain.Treatment) []domain.TreatmentPillar {
	grouped := make(map[domain.TreatmentCategory][]string)
	for _, treatment := range treatments {
		grouped[treatment.Category] = append(grouped[treatment.Category], treatment.Content)
	}

	pillars := make([]domain.TreatmentPillar, 0, len(treatmentOrder))
	for _, category := range treatmentOrder {
		items := grouped[category]
		if len(items) == 0 {
			continue
		}

		pillars = append(pillars, domain.TreatmentPillar{
			Category: category,
			Title:    treatmentTitles[category],
			Items:    items,
		})
	}

	return pillars
}

func roundScore(score float64) float64 {
	return math.Round(score*1000) / 1000
}

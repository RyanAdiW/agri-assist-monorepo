package usecase

import (
	"context"
	"errors"
	"testing"

	diagnosismemory "agri-assist-be/internal/diagnosis/adapters/memory"
	"agri-assist-be/internal/diagnosis/domain"
	"agri-assist-be/internal/seed"
)

func TestDiagnoseReturnsConfidentCandidates(t *testing.T) {
	t.Parallel()

	service := NewService(diagnosismemory.NewCatalogRepository(seed.CabaiDataset()))

	result, err := service.Diagnose(context.Background(), diagnosisRequest(
		"buah-bercak-hitam",
		"buah-busuk-basah",
		"buah-keriput-mengering",
	))
	if err != nil {
		t.Fatalf("Diagnose() error = %v", err)
	}

	if !result.HasConfidentDiagnosis {
		t.Fatalf("expected confident diagnosis")
	}

	if len(result.Candidates) != 3 {
		t.Fatalf("expected 3 candidates, got %d", len(result.Candidates))
	}

	if result.Candidates[0].ID != "antraknosa" {
		t.Fatalf("expected top candidate antraknosa, got %s", result.Candidates[0].ID)
	}

	if result.Candidates[0].ConfidenceLabel != domain.ConfidenceHigh {
		t.Fatalf("expected top confidence tinggi, got %s", result.Candidates[0].ConfidenceLabel)
	}
}

func TestDiagnoseReturnsLowConfidenceFallback(t *testing.T) {
	t.Parallel()

	service := NewService(diagnosismemory.NewCatalogRepository(seed.CabaiDataset()))

	result, err := service.Diagnose(context.Background(), diagnosisRequest("embun-madu"))
	if err != nil {
		t.Fatalf("Diagnose() error = %v", err)
	}

	if result.HasConfidentDiagnosis {
		t.Fatalf("expected no confident diagnosis")
	}

	if len(result.Candidates) != 2 {
		t.Fatalf("expected 2 candidates, got %d", len(result.Candidates))
	}
}

func TestDiagnoseRejectsUnknownSymptoms(t *testing.T) {
	t.Parallel()

	service := NewService(diagnosismemory.NewCatalogRepository(seed.CabaiDataset()))

	_, err := service.Diagnose(context.Background(), diagnosisRequest("tidak-dikenal"))
	if err == nil {
		t.Fatal("expected error")
	}

	var unknownErr UnknownSymptomsError
	if !errors.As(err, &unknownErr) {
		t.Fatalf("expected UnknownSymptomsError, got %T", err)
	}

	if len(unknownErr.SymptomIDs) != 1 || unknownErr.SymptomIDs[0] != "tidak-dikenal" {
		t.Fatalf("unexpected unknown symptom ids: %#v", unknownErr.SymptomIDs)
	}
}

func diagnosisRequest(symptomIDs ...string) domain.DiagnosisRequest {
	return domain.DiagnosisRequest{
		CropID:     "cabai",
		SymptomIDs: symptomIDs,
	}
}

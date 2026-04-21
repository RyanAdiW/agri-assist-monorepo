package httpapi

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	diagnosismemory "agri-assist-be/internal/diagnosis/adapters/memory"
	diagnosisusecase "agri-assist-be/internal/diagnosis/usecase"
	feedbackmemory "agri-assist-be/internal/feedback/adapters/memory"
	feedbackusecase "agri-assist-be/internal/feedback/usecase"
	"agri-assist-be/internal/seed"
	"github.com/labstack/echo/v4"
)

func TestDiagnoseEndpoint(t *testing.T) {
	t.Parallel()

	server := newTestServer()
	body := []byte(`{"crop_id":"cabai","symptom_ids":["buah-bercak-hitam","buah-busuk-basah","bunga-rontok"]}`)
	request := httptest.NewRequest(http.MethodPost, "/api/v1/diagnoses", bytes.NewReader(body))
	request.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	recorder := httptest.NewRecorder()

	server.echo.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", recorder.Code)
	}

	var response map[string]interface{}
	if err := json.Unmarshal(recorder.Body.Bytes(), &response); err != nil {
		t.Fatalf("unmarshal response: %v", err)
	}

	if response["crop_id"] != "cabai" {
		t.Fatalf("expected crop_id cabai, got %#v", response["crop_id"])
	}
}

func TestSaveFeedbackEndpoint(t *testing.T) {
	t.Parallel()

	server := newTestServer()
	body := []byte(`{"diagnosis_id":"antraknosa","is_helpful":true,"notes":"Cocok di lapangan"}`)
	request := httptest.NewRequest(http.MethodPost, "/api/v1/feedbacks", bytes.NewReader(body))
	request.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	recorder := httptest.NewRecorder()

	server.echo.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d", recorder.Code)
	}
}

func TestSwaggerSpecEndpoint(t *testing.T) {
	t.Parallel()

	server := newTestServer()
	request := httptest.NewRequest(http.MethodGet, "/swagger/openapi.yaml", nil)
	recorder := httptest.NewRecorder()

	server.echo.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", recorder.Code)
	}

	if body := recorder.Body.String(); body == "" {
		t.Fatal("expected swagger spec body")
	}
}

func newTestServer() *Server {
	catalogRepo := diagnosismemory.NewCatalogRepository(seed.CabaiDataset())
	feedbackRepo := feedbackmemory.NewRepository()

	return NewServerForTest(
		diagnosisusecase.NewService(catalogRepo),
		feedbackusecase.NewService(feedbackRepo),
	)
}

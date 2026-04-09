package httpapi

import (
	"errors"
	"net/http"

	diagnosisdomain "agri-assist-be/internal/diagnosis/domain"
	diagnosisusecase "agri-assist-be/internal/diagnosis/usecase"
	feedbackdomain "agri-assist-be/internal/feedback/domain"
	feedbackusecase "agri-assist-be/internal/feedback/usecase"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	diagnosisService *diagnosisusecase.Service
	feedbackService  *feedbackusecase.Service
}

func NewHandler(diagnosisService *diagnosisusecase.Service, feedbackService *feedbackusecase.Service) *Handler {
	return &Handler{
		diagnosisService: diagnosisService,
		feedbackService:  feedbackService,
	}
}

func (h *Handler) Health(c echo.Context) error {
	return c.JSON(http.StatusOK, map[string]string{
		"status":  "ok",
		"service": "agri-assist-backend",
	})
}

func (h *Handler) ListSymptoms(c echo.Context) error {
	response, err := h.diagnosisService.ListSymptoms(c.Request().Context(), c.QueryParam("cropId"))
	if err != nil {
		return writeError(c, err)
	}

	return c.JSON(http.StatusOK, response)
}

func (h *Handler) Diagnose(c echo.Context) error {
	var request diagnosisdomain.DiagnosisRequest
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{Error: "invalid request body"})
	}

	response, err := h.diagnosisService.Diagnose(c.Request().Context(), request)
	if err != nil {
		return writeError(c, err)
	}

	return c.JSON(http.StatusOK, response)
}

func (h *Handler) SaveFeedback(c echo.Context) error {
	var request feedbackdomain.Submission
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, errorResponse{Error: "invalid request body"})
	}

	response, err := h.feedbackService.Save(c.Request().Context(), request)
	if err != nil {
		return writeError(c, err)
	}

	return c.JSON(http.StatusCreated, response)
}

type errorResponse struct {
	Error string `json:"error"`
}

func writeError(c echo.Context, err error) error {
	if errors.Is(err, diagnosisdomain.ErrCropNotFound) {
		return c.JSON(http.StatusNotFound, errorResponse{Error: "crop not found"})
	}

	if errors.Is(err, feedbackdomain.ErrDiagnosisIDRequired) {
		return c.JSON(http.StatusBadRequest, errorResponse{Error: "diagnosisId is required"})
	}

	var unknownSymptomsErr diagnosisusecase.UnknownSymptomsError
	if errors.As(err, &unknownSymptomsErr) {
		return c.JSON(http.StatusBadRequest, map[string]interface{}{
			"error":      "unknown symptom ids",
			"symptomIds": unknownSymptomsErr.SymptomIDs,
		})
	}

	return c.JSON(http.StatusInternalServerError, errorResponse{Error: "internal server error"})
}

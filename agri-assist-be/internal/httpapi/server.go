package httpapi

import (
	"agri-assist-be/internal/config"
	diagnosisusecase "agri-assist-be/internal/diagnosis/usecase"
	feedbackusecase "agri-assist-be/internal/feedback/usecase"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct {
	echo *echo.Echo
}

func NewServer(_ config.Config, diagnosisService *diagnosisusecase.Service, feedbackService *feedbackusecase.Service) *Server {
	e := echo.New()
	e.HideBanner = true
	e.Use(middleware.Recover())
	e.Use(middleware.CORS())
	e.Use(middleware.RequestID())

	handler := NewHandler(diagnosisService, feedbackService)
	registerRoutes(e, handler)

	return &Server{echo: e}
}

func NewServerForTest(diagnosisService *diagnosisusecase.Service, feedbackService *feedbackusecase.Service) *Server {
	e := echo.New()
	handler := NewHandler(diagnosisService, feedbackService)
	registerRoutes(e, handler)

	return &Server{echo: e}
}

func (s *Server) Start(address string) error {
	return s.echo.Start(address)
}

func registerRoutes(e *echo.Echo, handler *Handler) {
	e.GET("/health", handler.Health)
	e.GET("/swagger", handler.SwaggerRedirect)
	e.GET("/swagger/index.html", handler.SwaggerUI)
	e.GET("/swagger/openapi.yaml", handler.SwaggerSpec)

	v1 := e.Group("/api/v1")
	v1.GET("/health", handler.Health)
	v1.GET("/symptoms", handler.ListSymptoms)
	v1.POST("/diagnoses", handler.Diagnose)
	v1.POST("/feedbacks", handler.SaveFeedback)
}

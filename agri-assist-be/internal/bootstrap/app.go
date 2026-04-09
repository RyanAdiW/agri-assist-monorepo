package bootstrap

import (
	"agri-assist-be/internal/config"
	diagnosismemory "agri-assist-be/internal/diagnosis/adapters/memory"
	diagnosisusecase "agri-assist-be/internal/diagnosis/usecase"
	feedbackmemory "agri-assist-be/internal/feedback/adapters/memory"
	feedbackusecase "agri-assist-be/internal/feedback/usecase"
	"agri-assist-be/internal/httpapi"
	"agri-assist-be/internal/seed"
)

type App struct {
	server *httpapi.Server
	config config.Config
}

func NewApp() (*App, error) {
	cfg := config.Load()
	dataset := seed.CabaiDataset()

	catalogRepo := diagnosismemory.NewCatalogRepository(dataset)
	feedbackRepo := feedbackmemory.NewRepository()

	diagnosisService := diagnosisusecase.NewService(catalogRepo)
	feedbackService := feedbackusecase.NewService(feedbackRepo)

	server := httpapi.NewServer(cfg, diagnosisService, feedbackService)

	return &App{
		server: server,
		config: cfg,
	}, nil
}

func (a *App) Start() error {
	return a.server.Start(a.config.Address())
}

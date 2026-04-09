package bootstrap

import (
	"agri-assist-be/internal/config"
	diagnosispostgres "agri-assist-be/internal/diagnosis/adapters/postgres"
	diagnosisusecase "agri-assist-be/internal/diagnosis/usecase"
	feedbackpostgres "agri-assist-be/internal/feedback/adapters/postgres"
	feedbackusecase "agri-assist-be/internal/feedback/usecase"
	"agri-assist-be/internal/httpapi"
	postgresplatform "agri-assist-be/internal/platform/postgres"
	"agri-assist-be/internal/seed"
	"fmt"
)

type App struct {
	server *httpapi.Server
	config config.Config
}

func NewApp() (*App, error) {
	cfg := config.Load()
	dataset := seed.CabaiDataset()

	db, err := postgresplatform.Open(cfg.Database)
	if err != nil {
		return nil, fmt.Errorf("connect postgres: %w", err)
	}

	if err := postgresplatform.MigrateAndSeed(db, dataset); err != nil {
		return nil, fmt.Errorf("prepare postgres schema: %w", err)
	}

	catalogRepo := diagnosispostgres.NewCatalogRepository(db)
	feedbackRepo := feedbackpostgres.NewRepository(db)

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

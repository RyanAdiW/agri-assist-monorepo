package main

import (
	"log"

	"agri-assist-be/internal/bootstrap"
)

func main() {
	app, err := bootstrap.NewApp()
	if err != nil {
		log.Fatalf("bootstrap app: %v", err)
	}

	if err := app.Start(); err != nil {
		log.Fatalf("start app: %v", err)
	}
}

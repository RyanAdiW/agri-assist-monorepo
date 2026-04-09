GO ?= go
APP_NAME ?= agri-assist-be
BIN_DIR ?= bin

ifeq ($(OS),Windows_NT)
BINARY := $(APP_NAME).exe
CREATE_BIN_DIR = if not exist $(BIN_DIR) mkdir $(BIN_DIR)
CLEAN_BIN_DIR = if exist $(BIN_DIR) rmdir /s /q $(BIN_DIR)
else
BINARY := $(APP_NAME)
CREATE_BIN_DIR = mkdir -p $(BIN_DIR)
CLEAN_BIN_DIR = rm -rf $(BIN_DIR)
endif

.PHONY: help tidy fmt test run build clean

help:
	@echo "Available targets:"
	@echo "  make tidy   - sync module dependencies"
	@echo "  make fmt    - format Go files"
	@echo "  make test   - run tests"
	@echo "  make run    - start the API locally"
	@echo "  make build  - build the API binary"
	@echo "  make clean  - remove build artifacts"

tidy:
	$(GO) mod tidy

fmt:
	$(GO) fmt ./...

test:
	$(GO) test ./...

start:
	$(GO) run ./cmd/api

build:
	$(CREATE_BIN_DIR)
	$(GO) build -o $(BIN_DIR)/$(BINARY) ./cmd/api

clean:
	$(CLEAN_BIN_DIR)

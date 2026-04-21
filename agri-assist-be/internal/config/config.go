package config

import (
	"bufio"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

type Config struct {
	Port     string
	Database DatabaseConfig
}

type DatabaseConfig struct {
	URL      string
	Host     string
	Port     string
	User     string
	Password string
	Name     string
	SSLMode  string
	TimeZone string
}

func Load() Config {
	loadDotEnv()
	port := envOrDefault("PORT", "8080")

	return Config{
		Port: port,
		Database: DatabaseConfig{
			URL:      os.Getenv("DATABASE_URL"),
			Host:     envOrDefault("DB_HOST", "localhost"),
			Port:     envOrDefault("DB_PORT", "5432"),
			User:     envOrDefault("DB_USER", "postgres"),
			Password: envOrDefault("DB_PASSWORD", "postgres"),
			Name:     envOrDefault("DB_NAME", "agri_assist"),
			SSLMode:  envOrDefault("DB_SSLMODE", "disable"),
			TimeZone: envOrDefault("DB_TIMEZONE", "UTC"),
		},
	}
}

func (c Config) Address() string {
	return ":" + c.Port
}

func (c DatabaseConfig) DSN() string {
	if c.URL != "" {
		return c.URL
	}

	return fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=%s",
		c.Host,
		c.Port,
		c.User,
		c.Password,
		c.Name,
		c.SSLMode,
		c.TimeZone,
	)
}

func envOrDefault(key, fallback string) string {
	value := os.Getenv(key)
	if value == "" {
		return fallback
	}

	return value
}

func loadDotEnv() {
	workingDir, err := os.Getwd()
	if err != nil {
		return
	}

	for _, candidate := range dotenvCandidates(workingDir) {
		if err := loadDotEnvFile(candidate); err == nil {
			return
		}
	}
}

func dotenvCandidates(start string) []string {
	candidates := make([]string, 0, 4)
	current := start

	for depth := 0; depth < 4; depth++ {
		candidates = append(candidates, filepath.Join(current, ".env"))

		parent := filepath.Dir(current)
		if parent == current {
			break
		}

		current = parent
	}

	return candidates
}

func loadDotEnvFile(path string) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}

		if strings.HasPrefix(line, "export ") {
			line = strings.TrimSpace(strings.TrimPrefix(line, "export "))
		}

		key, value, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}

		key = strings.TrimSpace(key)
		if key == "" {
			continue
		}

		if _, exists := os.LookupEnv(key); exists {
			continue
		}

		_ = os.Setenv(key, normalizeEnvValue(value))
	}

	return scanner.Err()
}

func normalizeEnvValue(value string) string {
	value = strings.TrimSpace(value)
	if len(value) >= 2 {
		if strings.HasPrefix(value, "\"") && strings.HasSuffix(value, "\"") {
			return value[1 : len(value)-1]
		}

		if strings.HasPrefix(value, "'") && strings.HasSuffix(value, "'") {
			return value[1 : len(value)-1]
		}
	}

	return value
}

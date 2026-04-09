package config

import (
	"fmt"
	"os"
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

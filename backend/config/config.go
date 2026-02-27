package config

import (
	"fmt"
	"log"
	"os"
	"strings"

	"go-simpler.org/env"
)

type Config struct {
	DatabaseHost     string `env:"DB_HOST"`
	DatabasePort     int    `env:"DB_PORT"`
	DatabaseName     string `env:"DB_NAME"`
	DatabaseUsername string `env:"DB_USER"`
	DatabasePassword string `env:"DB_PASSWORD"`
}

func LoadConfig() (*Config, error) {
	if err := loadEnvFile(".env"); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	cfg := &Config{}
	if err := env.Load(cfg, nil); err != nil {
		log.Fatal("Error parsing env variables:", err)
	}

	return cfg, nil
}

func (c *Config) GetDSN() string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		c.DatabaseHost, c.DatabasePort, c.DatabaseUsername, c.DatabasePassword, c.DatabaseName)
}

func loadEnvFile(filename string) error {
	data, err := os.ReadFile(filename)
	if err != nil {
		return err
	}
	for _, line := range strings.Split(string(data), "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		parts := strings.SplitN(line, "=", 2)
		if len(parts) == 2 {
			os.Setenv(strings.TrimSpace(parts[0]), strings.TrimSpace(parts[1]))
		}
	}
	return nil
}

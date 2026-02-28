package main

import (
	"auth-service/config"
	"auth-service/database"
	"auth-service/internal/api"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
	}))

	cfg, err := config.LoadConfig()
	if err != nil {
		e.Logger.Error("failed to load config", "error", err)
		return
	}

	database.InitDB(cfg)
	database.RunMigrations()

	api.RegisterRoutes(e)

	e.Logger.Info("Auth service started on :8001")
	if err := e.Start(":8001"); err != nil {
		e.Logger.Error("failed to start auth service", "error", err)
	}
}

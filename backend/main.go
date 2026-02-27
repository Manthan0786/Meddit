package main

import (
	"backend/config"
	"backend/database"
	"backend/internal/api"

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

	e.Logger.Info("Server successfully started")

	if err := e.Start(":1323"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}

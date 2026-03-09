package main

import (
	"backend/config"
	"backend/database"
	"backend/internal/api"
	"backend/internal/handler"
	"backend/service"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

type Server struct {
	postHandler handler.PostHandler
}

func main() {
	e := echo.New()
	e.Use(middleware.RequestLogger())
	// CORS is handled by the gateway; do not add CORS here or the response
	// would have two Access-Control-Allow-Origin headers.

	cfg, err := config.LoadConfig()
	if err != nil {
		e.Logger.Error("failed to load config", "error", err)
		return
	}

	database.InitDB(cfg)
	db := database.GetDB()
	if db == nil {
		e.Logger.Error("failed to get database")
		return
	}

	database.RunMigrations()

	postService := service.NewPostService(db)
	postHandler := handler.NewPostHandler(*postService)
	server := api.NewServer(postHandler)
	server.RegisterRoutes(e)

	e.Logger.Info("Server successfully started")
	if err := e.Start(":8002"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}

package api

import (
	"auth-service/internal/handler"

	"github.com/labstack/echo/v5"
)

func RegisterRoutes(e *echo.Echo) {
	api := e.Group("/api")

	api.POST("/auth/google", handler.GoogleAuth)
}

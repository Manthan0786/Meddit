package api

import (
	"backend/internal/handler"

	"github.com/labstack/echo/v5"
)

func RegisterRoutes(e *echo.Echo) {
	e.POST("/auth/google", handler.GoogleAuth)
	e.GET("/", handler.GetPosts)
}

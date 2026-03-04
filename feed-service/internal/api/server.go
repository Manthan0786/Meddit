package api

import (
	"backend/internal/handler"

	"github.com/labstack/echo/v5"
)

func RegisterRoutes(e *echo.Echo) {
	e.Logger.Info("Registering routes")
	// Routes under /feed match what the gateway forwards (Gateway receives /feed/* and proxies path as-is)
	feed := e.Group("/feed")
	feed.GET("/posts", handler.GetPosts)
	feed.POST("/post", handler.CreatePost)
}

package api

import (
	"backend/internal/handler"

	"github.com/labstack/echo/v5"
)

type Server struct {
	postHandler handler.PostHandler
}

func NewServer(postHandler *handler.PostHandler) *Server {
	return &Server{postHandler: *postHandler}
}

func (s *Server) RegisterRoutes(e *echo.Echo) {
	e.Logger.Info("Registering routes")
	// Routes under /feed match what the gateway forwards (Gateway receives /feed/* and proxies path as-is)
	feed := e.Group("/feed")
	feed.GET("/posts", s.GetPosts)
	feed.POST("/post", handler.CreatePost)
}
func (s *Server) GetPosts(c *echo.Context) error {
	return s.postHandler.GetPosts(c)
}

func CreatePost(c *echo.Context) error {
	return handler.CreatePost(c)
}

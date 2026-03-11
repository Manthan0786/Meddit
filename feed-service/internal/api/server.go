package api

import (
	"backend/internal/handler"

	"github.com/labstack/echo/v5"
)

type Server struct {
	postHandler *handler.PostHandler
	voteHandler *handler.VoteHandler
}

func NewServer(postHandler *handler.PostHandler, voteHandler *handler.VoteHandler) *Server {
	return &Server{
		postHandler: postHandler,
		voteHandler: voteHandler,
	}
}

func (s *Server) RegisterRoutes(e *echo.Echo) {
	e.Logger.Info("Registering routes")
	// Routes under /feed match what the gateway forwards (Gateway receives /feed/* and proxies path as-is)
	feed := e.Group("/feed")
	feed.GET("/posts", s.GetPosts)
	feed.POST("/post", s.CreatePost)
	feed.POST("/vote", s.VotePost)
}

func (s *Server) GetPosts(c *echo.Context) error {
	return s.postHandler.GetPosts(c)
}

func (s *Server) CreatePost(c *echo.Context) error {
	return s.postHandler.CreatePost(c)
}

func (s *Server) VotePost(c *echo.Context) error {
	return s.voteHandler.VotePost(c)
}

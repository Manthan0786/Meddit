package main

import (
	auth_middleware "gateway/middleware"
	"net/url"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	authTarget, _ := url.Parse("http://localhost:8001")
	feedTarget, _ := url.Parse("http://localhost:8002")

	// /auth -> auth service
	authGroup := e.Group("/auth")
	authGroup.Use(middleware.ProxyWithConfig(middleware.ProxyConfig{
		Balancer: middleware.NewRoundRobinBalancer([]*middleware.ProxyTarget{
			{URL: authTarget},
		}),
	}))
	authGroup.Any("", func(c *echo.Context) error { return nil })   // /auth
	authGroup.Any("/*", func(c *echo.Context) error { return nil }) // /auth/*

	// /feed -> feed service
	feedGroup := e.Group("/feed")
	feedGroup.Use(auth_middleware.AuthMiddleware)
	feedGroup.Use(middleware.ProxyWithConfig(middleware.ProxyConfig{
		Balancer: middleware.NewRoundRobinBalancer([]*middleware.ProxyTarget{
			{URL: feedTarget},
		}),
	}))
	feedGroup.Any("", func(c *echo.Context) error { return nil })   // /feed
	feedGroup.Any("/*", func(c *echo.Context) error { return nil }) // /feed/*

	e.Logger.Info("API Gateway started on :8000")
	e.Start(":8000")
}

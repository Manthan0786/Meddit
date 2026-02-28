// api-gateway/main.go
package main

import (
	"net/url"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	// proxy /auth/* to auth-service
	authTarget, _ := url.Parse("http://localhost:8001")
	feedTarget, _ := url.Parse("http://localhost:8002")

	e.Group("/auth").Use(middleware.ProxyWithConfig(middleware.ProxyConfig{
		Balancer: middleware.NewRoundRobinBalancer([]*middleware.ProxyTarget{
			{URL: authTarget},
		}),
	}))

	e.Group("/feed").Use(middleware.ProxyWithConfig(middleware.ProxyConfig{
		Balancer: middleware.NewRoundRobinBalancer([]*middleware.ProxyTarget{
			{URL: feedTarget},
		}),
	}))

	e.Start(":8000")
}

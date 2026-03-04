// in gateway, e.g. auth_middleware.go
package auth_middleware

import (
	"fmt"
	auth "gateway/auth/utils"
	"net/http"
	"strings"

	"github.com/labstack/echo/v5"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c *echo.Context) error {
		authHeader := c.Request().Header.Get("Authorization")
		if !strings.HasPrefix(authHeader, "Bearer") {
			return c.JSON(http.StatusUnauthorized, "missing or invalid token")
		}

		c.Logger().Info("Auth header is valid")

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := auth.ValidateJWT(tokenStr)
		if err != nil {
			c.Logger().Error("JWT validation failed", "error", err)
			return c.JSON(http.StatusUnauthorized, "invalid token")
		}
		c.Logger().Info("Claims validated successfully")

		// pass claims downstream so feed-service can attach author to posts
		c.Request().Header.Set("X-User-ID", fmt.Sprint(claims.UserID))
		c.Request().Header.Set("X-User-Email", claims.Email)
		c.Request().Header.Set("X-User-Name", claims.Name)
		c.Request().Header.Set("X-User-Picture", claims.Picture)

		return next(c)
	}
}

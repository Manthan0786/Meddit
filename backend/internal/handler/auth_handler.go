package handler

import (
	"net/http"

	"cloud.google.com/go/auth/credentials/idtoken"
	"github.com/labstack/echo/v5"
)

type GoogleAuthRequest struct {
	Token string `json:"id_token"`
}

func GoogleAuth(c *echo.Context) error {
	var req GoogleAuthRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "invalid request")
	}

	payload, err := idtoken.Validate(c.Request().Context(), req.Token, "YOUR_GOOGLE_CLIENT_ID")
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "invalid token")
	}

	return c.JSON(http.StatusOK, "authentication successful")
}

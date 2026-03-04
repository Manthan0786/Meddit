// internal/handler/auth_handler.go
package handler

import (
	apimodels "auth-service/api/models"
	"auth-service/service"
	"errors"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v5"
)

var validate = validator.New()

func GoogleAuth(c *echo.Context) error {
	var reqBody apimodels.LoginWithGoogleRequest

	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, "invalid request")
	}
	c.Logger().Info("Request bound successfully", reqBody)

	if err := validate.Struct(reqBody); err != nil {
		var validationErrors validator.ValidationErrors
		if errors.As(err, &validationErrors) {
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": validationErrors[0].Field() + " is required",
			})
		}
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "invalid request",
		})
	}
	c.Logger().Info("Validation passed successfully")

	user, err := service.LoginWithGoogle(c, reqBody)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	c.Logger().Info("User logged in successfully", user)

	token, err := service.GenerateJWT(user)
	if err != nil {
		c.Logger().Error("failed to generate token", "error", err)
		return c.JSON(http.StatusInternalServerError, "failed to generate token")
	}

	c.Logger().Info("JWT generated successfully")

	resBody := apimodels.UserResponse{
		Id:      int(user.ID),
		Email:   user.Email,
		Name:    user.Name,
		Picture: user.Picture,
		Token:   token,
	}

	return c.JSON(http.StatusOK, resBody)
}

package handler

import (
	apimodels "backend/api/models"
	"backend/service"
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

	user, err := service.LoginWithGoogle(c, reqBody)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	resBody := apimodels.UserResponse{
		Id:      int(user.ID),
		Email:   user.Email,
		Name:    user.Name,
		Picture: user.Picture,
	}

	return c.JSON(http.StatusOK, resBody)
}

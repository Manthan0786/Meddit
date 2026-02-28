package service

import (
	apimodels "auth-service/api/models"
	"auth-service/database"
	"auth-service/models"
	"errors"
	"fmt"

	"cloud.google.com/go/auth/credentials/idtoken"
	"github.com/labstack/echo/v5"
	"gorm.io/gorm"
)

func LoginWithGoogle(c *echo.Context, reqBody apimodels.LoginWithGoogleRequest) (models.User, error) {
	ctx := c.Request().Context()

	resp, err := idtoken.Validate(c.Request().Context(), *reqBody.Token, "751053426179-31o79f8cntq4oedl950s7s0rb9dvp9cl.apps.googleusercontent.com")
	if err != nil {
		return models.User{}, fmt.Errorf("invalid token")
	}

	var existingUser models.User
	db := database.GetDB()
	err = db.Where("google_id = ?", resp.Subject).First(&existingUser).Error
	if err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
		return models.User{}, fmt.Errorf("database error")
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		newUser := models.User{
			GoogleID: resp.Subject,
			Email:    getString(resp.Claims, "email"),
			Name:     getString(resp.Claims, "name"),
			Picture:  getString(resp.Claims, "picture"),
		}
		err = gorm.G[models.User](db).Create(ctx, &newUser)
		if err != nil {
			return models.User{}, fmt.Errorf("failed to create user")
		}

		return newUser, nil
	}

	return existingUser, nil
}

func getString(claims map[string]interface{}, key string) string {
	if val, ok := claims[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

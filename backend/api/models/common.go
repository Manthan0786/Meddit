package models

type GoogleAuthRequest struct {
	Token *string `json:"id_token" validate:"required"`
}

type LoginWithGoogleRequest = GoogleAuthRequest

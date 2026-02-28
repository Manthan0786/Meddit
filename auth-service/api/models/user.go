package models

type UserResponse struct {
	Id      int
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
	Token   string
}

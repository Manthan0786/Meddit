package models

// User mirrors the shared users table (owned by auth-service). Same DB.
// Used only for Post.Author relation; do not migrate this table in feed-service.
type User struct {
	ID      uint   `gorm:"primaryKey"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Picture string `json:"picture"`
}

func (User) TableName() string {
	return "users"
}

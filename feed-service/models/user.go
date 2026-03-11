package models

import "time"

// User mirrors the shared users table (owned by auth-service). Same DB.
// Used only for Post.Author relation; do not migrate this table in feed-service.
type User struct {
	ID        uint `gorm:"primaryKey"`
	Name      string
	Email     string
	Picture   string
	CreatedAt time.Time
	UpdatedAt time.Time
}

func (User) TableName() string {
	return "users"
}

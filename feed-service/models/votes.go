package models

import "time"

type Vote struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	Votes     int
	PostID    uint
	UserID    uint
	Post      Post `gorm:"foreignKey:PostID"`
	User      User `gorm:"foreignKey:UserID"`
	CreatedAt time.Time
	UpdatedAt time.Time
}

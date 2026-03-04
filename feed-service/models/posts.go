package models

import (
	"time"

	"github.com/lib/pq"
)

type Post struct {
	Id               uint `gorm:"primaryKey;autoIncrement"`
	Title            string
	Content          string
	SavedFromSurgery bool
	Remedy           pq.StringArray `gorm:"type:text[]"`
	Tags             []Tag          `gorm:"many2many:post_tags;"`
	AuthorID         uint           `gorm:"not null"`
	Author           User           `gorm:"foreignKey:AuthorID"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

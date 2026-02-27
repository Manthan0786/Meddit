package models

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Post struct {
	Title            string
	Content          string
	SavedFromSurgery bool
	Remedy           pq.StringArray `gorm:"type:text[]"`
	Tags             []Tag          `gorm:"many2many:post_tags;"`
	gorm.Model
}

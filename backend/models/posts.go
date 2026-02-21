package models

import (
	"gorm.io/gorm"
)

type Post struct {
	Title   string
	Content string
	Remedy  string
	Tags    []Tag `gorm:"many2many:post_tags;"`
	gorm.Model
}

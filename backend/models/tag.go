package models

import "gorm.io/gorm"

type Tag struct {
	Name  string
	Posts []Post `gorm:"Many2many:post_tags"`
	gorm.Model
}

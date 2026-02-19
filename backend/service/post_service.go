package service

import (
	"backend/database"
	"backend/models"
)

func GetAllPosts() ([]models.Post, error) {
	var posts []models.Post
	db := database.GetDB()
	err := db.Find(&posts).Error
	return posts, err
}

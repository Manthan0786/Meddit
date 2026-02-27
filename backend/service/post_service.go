package service

import (
	apimodels "backend/api/models"
	"backend/database"
	"backend/models"
	"context"

	"github.com/lib/pq"
)

func GetAllPosts() ([]models.Post, error) {
	var posts []models.Post
	db := database.GetDB()
	err := db.Find(&posts).Error
	return posts, err
}

func CreatePost(ctx context.Context, req apimodels.CreatePostRequest) (*models.Post, error) {
	post := models.Post{
		Title:            req.Title,
		Content:          req.Content,
		SavedFromSurgery: req.SavedFromSurgery,
		Remedy:           pq.StringArray(req.Remedy),
	}

	db := database.GetDB()
	result := db.Create(&post)
	return &post, result.Error
}

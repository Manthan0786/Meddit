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
	err := db.Preload("Author").Find(&posts).Error
	return posts, err
}

func CreatePost(ctx context.Context, req apimodels.CreatePostRequest, authorID uint) (*models.Post, error) {
	post := models.Post{
		Title:            req.Title,
		Content:          req.Content,
		SavedFromSurgery: req.SavedFromSurgery,
		Remedy:           pq.StringArray(req.Remedy),
		AuthorID:         authorID,
	}

	db := database.GetDB()
	result := db.Create(&post)
	if result.Error != nil {
		return nil, result.Error
	}
	// Load author from shared users table for response
	err := db.Preload("Author").First(&post, post.Id).Error
	return &post, err
}

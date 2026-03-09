package service

import (
	apimodels "backend/api/models"
	"backend/models"
	"context"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type PostService struct {
	db *gorm.DB
}

func NewPostService(db *gorm.DB) *PostService {
	return &PostService{db: db}
}

func (s *PostService) GetAllPosts() ([]models.Post, error) {
	var posts []models.Post
	err := s.db.Preload("Author").Find(&posts).Error
	return posts, err
}

func (s *PostService) CreatePost(ctx context.Context, req apimodels.CreatePostRequest, authorID uint) (*models.Post, error) {
	post := models.Post{
		Title:            req.Title,
		Content:          req.Content,
		SavedFromSurgery: req.SavedFromSurgery,
		Remedy:           pq.StringArray(req.Remedy),
		AuthorID:         authorID,
	}

	result := s.db.Create(&post)
	if result.Error != nil {
		return nil, result.Error
	}
	// Load author from shared users table for response
	err := s.db.Preload("Author").First(&post, post.Id).Error
	return &post, err
}

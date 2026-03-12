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

// GetVoteTotalsByPostIDs returns a map of post ID -> total vote count (sum of all users' votes for that post).
func (s *PostService) GetVoteTotalsByPostIDs(postIDs []uint) (map[uint]int, error) {
	if len(postIDs) == 0 {
		return map[uint]int{}, nil
	}
	var results []struct {
		PostID uint
		Total  int64
	}
	err := s.db.Model(&models.Vote{}).Select("post_id, SUM(votes) as total").Where("post_id IN ?", postIDs).Group("post_id").Scan(&results).Error
	if err != nil {
		return nil, err
	}
	out := make(map[uint]int, len(results))
	for _, r := range results {
		out[r.PostID] = int(r.Total)
	}
	return out, nil
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

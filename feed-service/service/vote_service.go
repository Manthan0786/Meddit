package service

import (
	apimodels "backend/api/models"
	"backend/models"
	"context"
	"errors"

	"gorm.io/gorm"
)

type VoteService struct {
	db *gorm.DB
}

func NewVoteService(db *gorm.DB) *VoteService {
	return &VoteService{db: db}
}

func (s *VoteService) VotePost(ctx context.Context, req apimodels.VoteRequest) (*models.Vote, error) {
	// Check if the user has already voted for this post
	var vote models.Vote
	result := s.db.Where("post_id = ? AND user_id = ?", req.PostID, req.UserID).First(&vote)
	if result.Error != nil {
		return nil, result.Error
	}

	if result.RowsAffected == 0 {
		vote = models.Vote{
			PostID: req.PostID,
			UserID: req.UserID,
			Votes:  1,
		}

		result = s.db.Create(&vote)
		if result.Error != nil {
			return nil, result.Error
		}
		return &vote, nil
	}

	if result.RowsAffected > 0 && req.Direction == "up" {
		vote.Votes++
	} else if result.RowsAffected > 0 && req.Direction == "down" {
		vote.Votes--
	} else {
		return nil, errors.New("Invalid direction")
	}

	result = s.db.Save(&vote)
	if result.Error != nil {
		return nil, result.Error
	}
	return &vote, nil
}

package service

import (
	apimodels "backend/api/models"
	"backend/models"
	"context"
	"errors"

	"gorm.io/gorm"
)

// ErrAlreadyVoted is returned when the user has already voted in the same direction for this post.
var ErrAlreadyVoted = errors.New("already voted")

type VoteService struct {
	db *gorm.DB
}

func NewVoteService(db *gorm.DB) *VoteService {
	return &VoteService{db: db}
}

func (s *VoteService) VotePost(ctx context.Context, req apimodels.VoteRequest) (*models.Vote, error) {
	if req.Direction != "up" && req.Direction != "down" {
		return nil, errors.New("invalid direction")
	}

	var vote models.Vote
	result := s.db.Where("post_id = ? AND user_id = ?", req.PostID, req.UserID).First(&vote)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			// First vote for this user on this post: create new row (one vote per user per post)
			initial := 1
			if req.Direction == "down" {
				initial = -1
			}
			vote = models.Vote{
				PostID: req.PostID,
				UserID: req.UserID,
				Votes:  initial,
			}
			if err := s.db.Create(&vote).Error; err != nil {
				return nil, err
			}
			return &vote, nil
		}
		return nil, result.Error
	}

	// Existing vote: one upvote and one downvote per user per post; same direction again = already voted
	if req.Direction == "down" && vote.Votes == 1 {
		vote.Votes -= 1
	} else if req.Direction == "up" && vote.Votes == 0 {
		vote.Votes += 1
	}
	if err := s.db.Save(&vote).Error; err != nil {
		return nil, err
	}
	return &vote, nil
}

// GetTotalVotesForPost returns the sum of all vote values for the given post.
func (s *VoteService) GetTotalVotesForPost(postID uint) (int, error) {
	var total int64
	err := s.db.Model(&models.Vote{}).Where("post_id = ?", postID).Select("COALESCE(SUM(votes), 0)").Scan(&total).Error
	return int(total), err
}

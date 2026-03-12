package models

type VoteResponse struct {
	ID         uint `json:"id"`
	Votes      int  `json:"votes"`
	PostID     uint `json:"post_id"`
	UserID     uint `json:"user_id"`
	TotalVotes int  `json:"totalVotes"`
}

type VoteRequest struct {
	Direction string `json:"direction"`
	PostID    uint   `json:"post_id"`
	UserID    uint   `json:"user_id"`
}

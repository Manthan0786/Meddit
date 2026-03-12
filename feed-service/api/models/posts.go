package models

import "time"

type AuthorResponse struct {
	Id     uint   `json:"id"`
	Name   string `json:"name"`
	Avatar string `json:"avatar"`
}

type GetPostsResponse struct {
	Id               uint           `json:"id"`
	Title            string         `json:"title"`
	Description      string         `json:"content"`
	Date             time.Time      `json:"date"`
	Remedy           []string       `json:"remedy"`
	SavedFromSurgery bool           `json:"savedFromSurgery"`
	Tags             []TagResponse  `json:"tags"`
	Author           AuthorResponse `json:"author"`
	Votes            int            `json:"votes"`
}

type PostResponse struct {
	Id               uint           `json:"id"`
	Title            string         `json:"title"`
	Description      string         `json:"content"`
	Remedy           []string       `json:"remedy"`
	SavedFromSurgery bool           `json:"savedFromSurgery"`
	Tags             []TagResponse  `json:"tags"`
	Author           AuthorResponse `json:"author"`
}

type PostsResponse struct {
	Posts []GetPostsResponse `json:"posts"`
}

type CreatePostRequest struct {
	Title            string   `json:"title"`
	Content          string   `json:"description"`
	Remedy           []string `json:"remedy"`
	SavedFromSurgery bool     `json:"savedFromSurgery"`
	Author           string   `json:"author"`
	Avatar           string   `json:"avatar"`
}

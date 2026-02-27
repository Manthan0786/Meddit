package models

import "time"

type GetPostsResponse struct {
	Id          uint          `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"content"`
	Date        time.Time     `json:"date"`
	Remedy      []string      `json:"remedy"`
	Tags        []TagResponse `json:"tags"`
}

type PostResponse struct {
	Id          uint          `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"content"`
	Remedy      []string      `json:"remedy"`
	Tags        []TagResponse `json:"tags"`
}

type PostsResponse struct {
	Posts []GetPostsResponse `json:"posts"`
}

type CreatePostRequest struct {
	Title            string   `json:"title"`
	Content          string   `json:"description"`
	Remedy           []string `json:"remedy"`
	SavedFromSurgery bool     `json:"savedFromSurgery"`
}

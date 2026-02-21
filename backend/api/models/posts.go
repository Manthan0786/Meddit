package models

import "time"

type PostResponse struct {
	Id      uint          `json:"id"`
	Title   string        `json:"title"`
	Content string        `json:"content"`
	Date    time.Time     `json:"date"`
	Remedy  string        `json:"remedy"`
	Tags    []TagResponse `json:"tags"`
}

type PostsResponse struct {
	Posts []PostResponse `json:"posts"`
}

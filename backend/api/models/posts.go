package models

type PostResponse struct {
	Id      uint          `json:"id"`
	Title   string        `json:"title"`
	Content string        `json:"content"`
	Tags    []TagResponse `json:"tags"`
}

type PostsResponse struct {
	Posts []PostResponse `json:"posts"`
}

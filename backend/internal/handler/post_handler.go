package handler

import (
	apimodels "backend/api/models"
	"backend/service"
	"net/http"

	"github.com/labstack/echo/v5"
)

func GetPosts(c *echo.Context) error {
	posts, err := service.GetAllPosts()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	resp := apimodels.PostsResponse{Posts: make([]apimodels.PostResponse, len(posts))}
	for i, r := range posts {
		var tags []apimodels.TagResponse
		if len(r.Tags) > 0 {
			tags = make([]apimodels.TagResponse, len(r.Tags))
			for j, tag := range r.Tags {
				tags[j] = apimodels.TagResponse{
					ID:   tag.ID,
					Name: tag.Name,
				}
			}
		}
		resp.Posts[i] = apimodels.PostResponse{
			Id:      r.ID,
			Title:   r.Title,
			Content: r.Content,
			Tags:    tags,
		}
	}
	return c.JSON(http.StatusOK, resp)
}

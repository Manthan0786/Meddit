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
	resp := apimodels.PostsResponse{Posts: make([]apimodels.GetPostsResponse, len(posts))}
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
		resp.Posts[i] = apimodels.GetPostsResponse{
			Id:          r.ID,
			Title:       r.Title,
			Description: r.Content,
			Remedy:      r.Remedy,
			Tags:        tags,
			Date:        r.CreatedAt,
		}
	}
	return c.JSON(http.StatusOK, resp)
}

func CreatePost(c *echo.Context) error {
	var req apimodels.CreatePostRequest
	ctx := c.Request().Context()
	err := c.Bind(&req)

	if err != nil {
		return c.String(http.StatusBadRequest, "Bad Request")
	}

	obj, err := service.CreatePost(ctx, req)
	if err != nil {
		return c.String(http.StatusInternalServerError, "Something went wrong")
	}

	tags := make([]apimodels.TagResponse, len(obj.Tags))
	for i, tag := range obj.Tags {
		tags[i] = apimodels.TagResponse{
			ID:   tag.ID,
			Name: tag.Name,
		}
	}

	resp := apimodels.PostResponse{
		Title:       obj.Title,
		Description: obj.Content,
		Remedy:      obj.Remedy,
		Tags:        tags,
	}

	return c.JSON(http.StatusCreated, apimodels.Success(resp))
}

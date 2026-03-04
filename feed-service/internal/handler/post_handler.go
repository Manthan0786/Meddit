package handler

import (
	apimodels "backend/api/models"
	"backend/service"
	"net/http"
	"strconv"

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
		author := apimodels.AuthorResponse{}
		if r.Author.ID != 0 {
			author = apimodels.AuthorResponse{
				Id:     r.Author.ID,
				Name:   r.Author.Name,
				Avatar: r.Author.Picture,
			}
		} else {
			author.Id = r.AuthorID
		}
		resp.Posts[i] = apimodels.GetPostsResponse{
			Id:               r.Id,
			Title:            r.Title,
			Description:      r.Content,
			Remedy:           r.Remedy,
			SavedFromSurgery: r.SavedFromSurgery,
			Tags:             tags,
			Date:             r.CreatedAt,
			Author:           author,
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

	// Author: gateway sets X-User-ID after JWT validation (user lives in shared users table)
	authorIDStr := c.Request().Header.Get("X-User-ID")
	authorID := uint(0)
	if authorIDStr != "" {
		if id, err := strconv.ParseUint(authorIDStr, 10, 32); err == nil {
			authorID = uint(id)
		}
	}
	if authorID == 0 {
		return c.String(http.StatusBadRequest, "missing author (X-User-ID)")
	}

	obj, err := service.CreatePost(ctx, req, authorID)
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

	author := apimodels.AuthorResponse{Id: obj.AuthorID}
	if obj.Author.ID != 0 {
		author.Name = obj.Author.Name
		author.Avatar = obj.Author.Picture
	}
	resp := apimodels.PostResponse{
		Id:               obj.Id,
		Title:            obj.Title,
		Description:      obj.Content,
		Remedy:           obj.Remedy,
		SavedFromSurgery: obj.SavedFromSurgery,
		Tags:             tags,
		Author:           author,
	}

	return c.JSON(http.StatusCreated, apimodels.Success(resp))
}

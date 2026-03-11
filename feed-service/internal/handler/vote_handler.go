package handler

import (
	apimodels "backend/api/models"
	"backend/service"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v5"
)

type VoteHandler struct {
	voteService service.VoteService
}

func NewVoteHandler(voteService service.VoteService) *VoteHandler {
	return &VoteHandler{voteService: voteService}
}

func (h *VoteHandler) VotePost(c *echo.Context) error {
	authorID := c.Request().Header.Get("X-User-ID")
	authorIDUint, err := strconv.ParseUint(authorID, 10, 32)
	if err != nil {
		c.Logger().Error("failed to parse author ID", "error", err)
		return c.String(http.StatusBadRequest, "Bad Request")
	}

	var req apimodels.VoteRequest
	err = c.Bind(&req)
	if err != nil {
		c.Logger().Error("failed to bind request", "error", err)
		return c.String(http.StatusBadRequest, "Bad Request")
	}

	req.UserID = uint(authorIDUint)

	ctx := c.Request().Context()
	vote, err := h.voteService.VotePost(ctx, req)
	if err != nil {
		c.Logger().Error("failed to vote post", "error", err)
		return c.String(http.StatusInternalServerError, "Failed to vote post")
	}

	resp := apimodels.VoteResponse{
		ID:     vote.ID,
		Votes:  vote.Votes,
		PostID: vote.PostID,
		UserID: vote.UserID,
	}

	return c.JSON(http.StatusOK, resp)
}

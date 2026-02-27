package models

type Response struct {
	Success    bool        `json:"success"`
	Message    string      `json:"message,omitempty"`
	Data       interface{} `json:"data,omitempty"`
	Error      string      `json:"error,omitempty"`
	ErrorCode  string      `json:"error_code,omitempty"`  // Error code for categorization
	Details    string      `json:"details,omitempty"`     // Additional error details
	StatusCode int         `json:"status_code,omitempty"` // HTTP status code (for errors)
}

func Success(data interface{}) Response {
	return Response{
		Success: true,
		Data:    data,
	}
}

func Error(err string) Response {
	return Response{
		Success: false,
		Error:   err,
	}
}

// ErrorWithCode creates an error response with error code
func ErrorWithCode(err string, errorCode string) Response {
	return Response{
		Success:   false,
		Error:     err,
		ErrorCode: errorCode,
	}
}

// ErrorWithDetails creates an error response with error code and details
func ErrorWithDetails(err string, errorCode string, details string) Response {
	return Response{
		Success:   false,
		Error:     err,
		ErrorCode: errorCode,
		Details:   details,
	}
}

// ErrorFull creates a full error response with all fields
func ErrorFull(err string, errorCode string, details string, statusCode int) Response {
	return Response{
		Success:    false,
		Error:      err,
		ErrorCode:  errorCode,
		Details:    details,
		StatusCode: statusCode,
	}
}

# Build stage
FROM golang:1.25.3-alpine AS builder

WORKDIR /app

# Only go.mod/go.sum first to leverage Docker cache
COPY go.mod go.sum ./
RUN go mod download

# Now copy the rest of the source
COPY . .

# Build the binary
RUN CGO_ENABLED=0 GOOS=linux go build -o gateway .

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /app/gateway .

EXPOSE 8000

CMD ["./gateway"]
package database

import (
	"backend/models"
	"log"
)

func RunMigrations() {
	err := db.AutoMigrate(&models.Post{}, &models.Tag{}, &models.User{})
	if err != nil {
		log.Fatal("Failed to run migration", err)
	}
}

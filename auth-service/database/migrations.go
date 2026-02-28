package database

import (
	"auth-service/models"
	"log"
)

func RunMigrations() {
	err := db.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("Failed to run migration", err)
	}
}

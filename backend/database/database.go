package database

import (
	"backend/config"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB(cfg *config.Config) {
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%d sslmode=disable",     
	cfg.DatabaseHost,
    cfg.DatabaseUsername,
    cfg.DatabasePassword,
    cfg.DatabaseName,
    cfg.DatabasePort)

	var err error

	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Database connection successfull", sqlDB.Ping())
}

func GetDB() *gorm.DB {
	return db
}
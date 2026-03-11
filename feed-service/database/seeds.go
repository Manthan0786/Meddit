package database

import (
	"backend/models"
	"log"

	"github.com/lib/pq"
)

// SeedDemoPosts inserts a small set of demo posts if the posts table is empty.
// This is intended for local development and demos so the feed is not blank.
func SeedDemoPosts() {
	db := GetDB()
	if db == nil {
		return
	}

	var count int64
	if err := db.Model(&models.Post{}).Count(&count).Error; err != nil {
		log.Println("seed: failed counting posts:", err)
		return
	}
	if count > 0 {
		// Don't overwrite an existing database.
		return
	}

	demoPosts := []models.Post{
		{
			Title:            "Chia & flax fiber protocol for chronic bloating",
			Content:          "Daily: 2 tbsp chia + 1 tbsp ground flax in warm water, plus gentle walking after dinner. Tracked for 4 months before scans and symptoms changed.",
			SavedFromSurgery: false,
			Remedy:           pq.StringArray{"Chia seeds", "Ground flax", "Warm water", "Evening walks"},
			AuthorID:         1,
		},
		{
			Title:            "Castor oil packs and uterine fibroids",
			Content:          "3–4 nights a week, 45–60 minutes with a castor oil pack over the lower abdomen, plus liver support tea in the morning. Ultrasound at 9 months showed measurable changes.",
			SavedFromSurgery: true,
			Remedy:           pq.StringArray{"Castor oil packs", "Liver support tea"},
			AuthorID:         1,
		},
		{
			Title:            "Turmeric & ginger tea instead of NSAIDs",
			Content:          "Replaced daily NSAIDs with turmeric + ginger tea, 2 mugs per day, alongside strength work guided by physio. Pain scores dropped over 6 weeks.",
			SavedFromSurgery: false,
			Remedy:           pq.StringArray{"Turmeric tea", "Ginger", "Strength training"},
			AuthorID:         1,
		},
		{
			Title:            "Varicose veins and compression + walking",
			Content:          "Consistent compression stockings during the day and 8–10k steps, plus short legs-up-the-wall sessions in the evening. Photos every 2 weeks to track changes.",
			SavedFromSurgery: true,
			Remedy:           pq.StringArray{"Compression stockings", "Daily walking", "Legs-up-the-wall"},
			AuthorID:         1,
		},
	}

	if err := db.Create(&demoPosts).Error; err != nil {
		log.Println("seed: failed inserting demo posts:", err)
	}
}

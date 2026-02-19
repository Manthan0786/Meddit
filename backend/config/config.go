package config

type Config struct {
	DatabaseHost string
	DatabasePort int
	DatabaseName string
	DatabaseUsername string
	DatabasePassword string
}

func LoadConfig() (*Config, error) {
	config := &Config{
		DatabaseHost: "localhost",
		DatabasePort: 5432,
		DatabaseName: "meddit",
		DatabaseUsername: "meddit",
		DatabasePassword: "meddit",
	}

	return config, nil
}
module.exports = {
  "url": process.env.DB_URL,
  "type": "postgres",
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "entities": [
    "./src/models/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
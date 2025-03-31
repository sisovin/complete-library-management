#!/bin/bash

# Load environment variables from config file
source ../backend/config/config.env

# Define backup directory and filename
BACKUP_DIR="../backups"
BACKUP_FILE="$BACKUP_DIR/db_backup_$(date +%Y%m%d%H%M%S).sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform the database backup
pg_dump -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME > $BACKUP_FILE

# Check if the backup was successful
if [ $? -eq 0 ]; then
  echo "Database backup successful: $BACKUP_FILE"
else
  echo "Database backup failed"
  exit 1
fi

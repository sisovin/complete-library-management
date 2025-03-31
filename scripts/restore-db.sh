#!/bin/bash

# Restore the database from a backup file

# Check if the backup file is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <backup-file>"
  exit 1
fi

BACKUP_FILE=$1

# Check if the backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
  echo "Backup file not found: $BACKUP_FILE"
  exit 1
fi

# Restore the database
echo "Restoring the database from $BACKUP_FILE..."
mysql -u root -p < "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Database restored successfully."
else
  echo "Failed to restore the database."
  exit 1
fi

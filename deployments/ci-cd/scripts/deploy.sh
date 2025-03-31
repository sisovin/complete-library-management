#!/bin/bash

# Load environment variables
source /path/to/config.env

# Build the application
echo "Building the application..."
npm run build

# Deploy the application
echo "Deploying the application..."
docker-compose -f /path/to/docker-compose.yml up -d

# Verify deployment
echo "Verifying deployment..."
docker-compose -f /path/to/docker-compose.yml ps

echo "Deployment completed successfully."

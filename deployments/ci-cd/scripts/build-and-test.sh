#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Build the application
echo "Building the application..."
npm run build

# Run tests
echo "Running tests..."
npm test

echo "Build and test process completed successfully."

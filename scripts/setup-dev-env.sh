#!/bin/bash

# This script sets up the development environment

# Install Node.js and npm
echo "Installing Node.js and npm..."
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install global npm packages
echo "Installing global npm packages..."
sudo npm install -g nodemon eslint

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install

# Set up environment variables
echo "Setting up environment variables..."
cp ../backend/config/config.env.example ../backend/config/config.env

# Run database migrations
echo "Running database migrations..."
cd ../backend
npm run migrate

echo "Development environment setup complete."

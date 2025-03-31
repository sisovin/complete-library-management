#!/bin/bash

# Load environment variables
source ./backend/config/config.env

# Start the worker process
node ./backend/worker.js

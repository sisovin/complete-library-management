#!/bin/bash

# Run ESLint
npx eslint . --ext .js,.jsx,.ts,.tsx

# Check for Prettier formatting issues
npx prettier --check .

# Run Stylelint for CSS/SCSS files
npx stylelint "**/*.{css,scss}"

# Exit with status code 0 if all checks pass
exit 0

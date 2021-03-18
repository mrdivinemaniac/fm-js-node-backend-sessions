#!/bin/bash

# Save current branch name
CURRENT_BRANCH=$(git branch --show-current)

if [ $CURRENT_BRANCH != "main" ]; then
  echo "You must be in the main branch to deploy"
  exit
fi

# Clean the working tree
echo "1. Cleaning the working tree."
git stash

# Increment version number
echo "2. Incrementing major version"
yarn version --major

# Push to Heroku
echo "3. Deploying to Heroku"
git push heroku main

echo "4. Pushing to Git"
git push origin main

echo "NOTE: If you were working on something, use git stash pop to get your work back"

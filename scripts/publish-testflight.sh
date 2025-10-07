#!/bin/bash

# GTXR TestFlight Publishing Script
set -e

echo "🚀 Starting GTXR TestFlight Publishing..."

# Configuration
BUNDLE_ID="club.gtxr.webspatial"
TEAM_ID="K26TVSBXQB"
VERSION="1.0.0"
BASE_URL="https://www.gtxr.club/"
APPLE_ID="ryan.gerhard.clark@gmail.com"
APPLE_PASSWORD="fuov-mnav-azzt-fkyu"

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next node_modules/.webspatial-builder-temp dist

# Build for XR/Vision Pro
echo "🔨 Building for Vision Pro..."
npm run build:avp

# Try publishing to TestFlight
echo "📦 Publishing to TestFlight..."
npx webspatial-builder publish \
  --base="${BASE_URL}" \
  --bundle-id="${BUNDLE_ID}" \
  --teamId="${TEAM_ID}" \
  --version="${VERSION}" \
  --username="${APPLE_ID}" \
  --password="${APPLE_PASSWORD}"

echo "✅ Done! Check for the IPA file in dist/"

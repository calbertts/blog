#!/bin/bash
# deploy.sh — Reconstruye y reinicia el contenedor del blog
set -e

BLOG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔨 Building Astro..."
cd "$BLOG_DIR"
npm run build

echo "🐳 Rebuilding Docker image..."
docker build -t blog:latest .

echo "🔄 Restarting container..."
docker stop blog 2>/dev/null || true
docker rm blog 2>/dev/null || true
docker run -d \
  --name blog \
  --network proxy \
  --restart unless-stopped \
  -v /home/calbertts/data/blog-uploads:/usr/share/nginx/html/uploads \
  blog:latest

echo "✅ Blog deployed!"

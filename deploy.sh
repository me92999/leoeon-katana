#!/bin/bash
set -e

echo "=========================================="
echo "  LEOEON Katana Store - Deploy Script"
echo "=========================================="
echo ""
echo "This will deploy your site to Surge.sh"
echo "You just need to enter your email and password."
echo ""
echo "If you don't have a Surge account, it will"
echo "create one automatically with your email."
echo ""
echo "Press Enter to continue..."
read

cd "$(dirname "$0")"

echo ""
echo "Deploying..."
echo ""

npx surge out/

echo ""
echo "=========================================="
echo "  Deployment complete!"
echo "=========================================="

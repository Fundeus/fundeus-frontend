#!/bin/bash
set -e

echo "Cleaning up build directory"
rm -rf build

echo "Building vagon frontend for $1"
echo "Injecting $1 environment variables"

yarn install --pure-lockfile
yarn build

echo "Build completed for $1"

AWS_S3_BUCKET_NAME="app.fundeus.xyz"
AWS_PROFILE_NAME="fundeus"
AWS_CLOUDFRONT_DISTRIBUTION_ID="E2MDQTMKFMXDRI"

echo "Deploying vagon frontend to $1"
aws s3 cp --recursive --profile $AWS_PROFILE_NAME --acl public-read build/ s3://$AWS_S3_BUCKET_NAME/
echo "Deployed vagon frontend to $1"

echo "Creating Cloudfront invalidation..."
AWS_CLOUDFRONT_INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --paths "/*" --profile $AWS_PROFILE_NAME | jq -r ".Invalidation.Id")
echo "Created Cloudfront Invalidation. You can query its status with the following command:"
echo "aws cloudfront get-invalidation --distribution-id $AWS_CLOUDFRONT_DISTRIBUTION_ID --id=$AWS_CLOUDFRONT_INVALIDATION_ID --profile $AWS_PROFILE_NAME"

if [ -f .env.bak ]; then
  echo "Restoring .env from .env.bak"
  mv .env.bak .env
fi


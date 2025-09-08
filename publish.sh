#!/usr/bin/env bash
set -e

npm run clean

npm run build
cd dist/super-ui-plus
npm publish --registry=https://registry.npmjs.org/
echo "Successfully published super-ui-plus"
cd -

echo "✅ Publish completed"
exit

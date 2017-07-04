#!/bin/bash

set -o errexit -o nounset


rev=$(git rev-parse --short HEAD)

eval cd dist/a@a.com/
# Project maintainer information
git init
git config --global user.name "Travis CI"
git config --global user.email "noreply+travis@fossasia.org"

git remote add upstream "https://$GH_TOKEN@github.com/"${TRAVIS_REPO_SLUG}".git"
git fetch upstream
git reset upstream/gh-pages


touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages


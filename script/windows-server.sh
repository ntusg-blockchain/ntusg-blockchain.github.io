#!/usr/bin/env bash
# usage: script/server
#
# Run the jekyll server

# --livereload does not work for windows
bundle exec jekyll serve --incremental

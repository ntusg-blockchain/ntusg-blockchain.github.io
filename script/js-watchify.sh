#!/usr/bin/env bash
# make sure watchifyjs npm package is globally installed.

browserify js/global.js -o js/dist/global.js -v &&
watchify js/*.js -o js/dist/home.js -v

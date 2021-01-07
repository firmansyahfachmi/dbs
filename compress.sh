#!/bin/bash
for file in media/*.png
do
    zopflipng "${file}" compressed/$(basename "${file}")
done
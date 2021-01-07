# Snippets for compressing JPG images in a directory.

# inplace (overwrites original)
find . -iname "*.jpg" -print0 | xargs -0 -n1 -t -I {} guetzli --quality 85 {} {}

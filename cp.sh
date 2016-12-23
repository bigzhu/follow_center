#! /bin/bash
cp static/about.html dist/about.html
npm run build
rsync -rvz -e "ssh -p 22" ./dist bigzhu@follow.center:/home/bigzhu/follow_center/
rsync -rvz -e "ssh -p 22" nginx.conf bigzhu@follow.center:/home/bigzhu/follow_center/

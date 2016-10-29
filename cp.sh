#! /bin/bash
npm run build
rsync -rvz -e "ssh -p 22" ./dist bigzhu@follow.center:/home/bigzhu/follow_center/

#!/bin/bash
SERVICE_FILE=ehf-node-red.service
rm -rf node_modules	
tar -cvzf ehf-node-red.tar.gz ./*
sdb root on
sdb push ehf-node-red.tar.gz /
sdb shell npm -g install /ehf-node-red.tar.gz
if [ $# -eq 1 ] && [ $1 = "--without-startup" ];
then
	sdb push ${SERVICE_FILE} /usr/lib/systemd/system/
	sdb shell ln -s /usr/lib/systemd/system/${SERVICE_FILE} /usr/lib/systemd/system/graphical.target.wants/
fi

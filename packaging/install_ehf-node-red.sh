#!/bin/bash
NPM_BINARY=`which npm`
TARGET_PKG=/usr/share/ehf-node-red/ehf-node-red.tar.gz
if [ -z $NPM_BINARY ]
then
	echo "[Error] npm binary is not found. Please check if node.js and npm package is installed."
elif [ -z $TARGET_PKG ]
then
	echo "[Error] target package is not found on $TARGET_PKG"
else
	echo "Start to install $TARGET_PKG..."
	$NPM_BINARY install $TARGET_PKG
fi

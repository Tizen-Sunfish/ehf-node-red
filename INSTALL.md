EHF-Node-RED Install
================

## Install Node.js

You can get the latest source code from <http://nodejs.org/download/>
and build it.

You can also get a Node.js ported for Tizen from <https://github.com/Tizen-Sunfish/nodejs-tizen>.

## Get EHF-Node-RED

Clone the repository from GitHub:

    $ git clone git@github.com:Tizen-Sunfish/ehf-node-red.git

## Connect your Tizen device to host PC via USB

Verify SDB connection before running install script:

    $ sdb devices

## Run the install script

This script installs EHF-Node-RED on the target device. It also add EHF-Node-RED to systemd as a start-up service.
This process can be time-consuming due to slow speed of Wi-fi connection of target board.

    $ ./install.sh

If you want not to add it as start-up service, use it:

    $ ./install.sh --without-startup

## Run Node-RED

Run below command on Tizen device:

    $ node /usr/lib/node_modules/node-red/red.js

You can then access Node-RED at <http://localhost:1880> on web browser application.

More documentation can be found [here](http://nodered.org/docs).

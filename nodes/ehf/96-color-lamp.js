// EHF Mindstorm ColorLamp Node-RED node file

module.exports = function(RED) {
	"use strict";

	// The main node definition - most things happen in here
	function ColorLampNode(n) {
		// Create a RED node
		RED.nodes.createNode(this,n);

		// Store local copies of the node configuration (as defined in the .html)
		//this.portnum = n.portnum;
		this.colorvalue = n.colorvalue;

		// respond to inputs....
		this.on('input', function (msg) {
//			if(msg.portnum)
//				this.portnum = msg.portnum;
			if(msg.colorvalue)
				this.colorvalue = msg.colorvalue;
			var exec = require('child_process').exec;
			var command = '/usr/bin/mindstorm_send ' + this.colorvalue;
			exec(command, function(err, stdout, stderr) {
				if(err) {
					console.log('child process exited with error code', err.code);
					return;
				}
				console.log(stdout);
			});
		});

		this.on("close", function() {
		});
	}

	// Register the node by name. This must be called before overriding any of the
	// Node functions.
	RED.nodes.registerType("colorlamp", ColorLampNode);

}

// EHF Mindstorm Motor Node-RED node file

module.exports = function(RED) {
	"use strict";

	// The main node definition - most things happen in here
	function MotorNode(n) {
		// Create a RED node
		RED.nodes.createNode(this,n);

		// Store local copies of the node configuration (as defined in the .html)
		this.portnum = n.portnum;
		this.power = n.power;

		// respond to inputs....
		this.on('input', function (msg) {
			if(msg.portnum)
				this.portnum = msg.portnum;
			if(msg.power)
				this.power = msg.power;
			var exec = require('child_process').exec;
			var command = '/usr/bin/mindstorm_send motor ' + this.portnum + ' ' + this.power;
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
	RED.nodes.registerType("motor", MotorNode);

}

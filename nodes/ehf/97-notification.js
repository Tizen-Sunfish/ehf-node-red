// EHF Tizen Notification Node-RED node file

module.exports = function(RED) {
    "use strict";

    // The main node definition - most things happen in here
    function NotificationNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration (as defined in the .html)
        this.notificationid = n.notificationid;
				this.power = n.power;

        // respond to inputs....
        this.on('input', function (msg) {
						this.notificationid = msg.notificationid;
						this.power = msg.power;
						var exec = require('child_process').exec;
						var command = '/usr/bin/mindstorm_send notification ' + this.notificationid + ' ' + this.power;
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
    RED.nodes.registerType("notification", NotificationNode);

}

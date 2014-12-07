// EHF Tizen Notification Node-RED node file

module.exports = function(RED) {
    "use strict";
		var spawn = require('child_process').spawn;
	  var plat = require('os').platform();
		var fs = require('fs');

    // The main node definition - most things happen in here
    function NotificationNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

				this.filename = "/usr/share/nodejs/ehf_notification.tail";
				var node = this;

				// Remove the tail file
				fs.unlink(this.filename, function (err) {
					if(err) console.log("error on unlinking notification tail file :" + err);

					// Listen the tail file and pass it to next node
					var tail = spawn("tail", ["-F", "-n", "0", this.filename]);
					tail.stdout.on("data", function (data) {
						var strings = data.toString().split("\n");
						for (var s in strings) {
							if (strings[s] !== "") {
								var tokens = s.split(" ");
								if(tokens.length >= 3) {
									if (strings[s] !== "") {
										node.send({
											title: tokens[0],
											contents: token[1],
											led_argb: token[2]
										});
									}
								}
							}
						}
					});
				});


				tail.stderr.on("data", function(data) {
					node.warn(data.toString());
				});

				this.on("close", function() {
					// Stop to listen the tail file
					if (tail) { tail.kill(); }
				});

    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("notification", NotificationNode);

}

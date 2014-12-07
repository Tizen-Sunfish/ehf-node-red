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

				var filename = "/usr/share/nodejs/ehf_notification.tail";
				var node = this;

				// Remove the tail file
				fs.unlink(filename, function (err) {
					// Listen the tail file and pass it to next node
					var tail = spawn("tail", ["-F", "-n", "0", filename]);
					tail.stdout.on("data", function (data) {
						var strings = data.toString().split("\n");
						var title = "<None>";
						var contents = "<None>";
						var led_argb = "0";
						for (var s in strings) {
							if (strings[s] !== "") {
								var tokens = strings[s].split("___ ", 2);
								if(tokens.length >= 2) {
									if(tokens[0] == "0") {
										title = tokens[1];
									} else if(tokens[0] == "1") {
										contents = tokens[1];
									} else if(tokens[0] == "2") {
										led_argb = tokens[1];
										node.send({
											title: title,
											contents: contents,
											led_argb: led_argb 
										});
										title = "<None>";
										contents = "<None>";
										led_argb = "0";
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

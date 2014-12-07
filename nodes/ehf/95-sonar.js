// EHF Tizen Sonar Node-RED node file

module.exports = function(RED) {
    "use strict";
		var spawn = require('child_process').spawn;
	  var plat = require('os').platform();
		var fs = require('fs');

    // The main node definition - most things happen in here
    function SonarNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

				this.period = n.period;

				// Command for starting to listen sonar sensor's values
				var command = '/usr/bin/mindstorm_send sonar start';
				exec(command, function(err, stdout, stderr) {
					if(err) {
						console.log('child process exited with error code', err.code);
						return;
					}
					console.log(stdout);
				});

				this.filename = "/usr/share/nodejs/ehf_sonar.tail";
				var node = this;
				var polling = true;

				// Remove the tail file
				fs.unlink(this.filename, function (err) {
					if(err) console.log("error on unlinking sonar tail file :" + err);

					// Periodic command for polling sonar sensor's values
					var command = '/usr/bin/mindstorm_send sonar poll';
					setInterval(function() {
						if(polling == false) {
							clearInterval();
						} else {
							exec(command, function(err, stdout, stderr) {
								if(err) {
									console.log('child process exited with error code', err.code);
									return;
								}
								console.log(stdout);
							});
						}
					}, this.period);

					// Listen the tail file and pass it to next node
					var tail = spawn("tail", ["-F", "-n", "0", this.filename]);
					tail.stdout.on("data", function (data) {
						var strings = data.toString().split("\n");
						for (var s in strings) {
							if (strings[s] !== "") {
								node.send({
									distance: strings[s]
								});
							}
						}
					});
				});

				tail.stderr.on("data", function(data) {
					node.warn(data.toString());
				});

				this.on("close", function() {
					if (tail) { 
						// Stop to listen the tail file
						tail.kill(); 

						polling = false;

						// Command for stopping to listen sonar sensor's values
						var command = '/usr/bin/mindstorm_send sonar end';
						exec(command, function(err, stdout, stderr) {
							if(err) {
								console.log('child process exited with error code', err.code);
								return;
							}
							console.log(stdout);
						});
					}
				});
    }

    // Register the node by name. This must be called before overriding any of the
    // Node functions.
    RED.nodes.registerType("sonar", SonarNode);

}

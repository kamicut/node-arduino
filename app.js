
//Change this to whatever the Arduino shows up as
var port = "/dev/tty.usbmodem1421";

//Create new Serial Port
var SerialPort = require('serialport').SerialPort,
	serial = new SerialPort(port, {
	baudrate: 9600
})

//Create new REST Server
var restify = require('restify'),
	server = restify.createServer(),
	canSendData = false;

//On Serial open, listen for data
serial.on("open", function() {
	console.log("Serial is open.");
	serial.on('data', function(data) {
		console.log('[data]::'+ data);
	});
	canSendData = true;
});

//Configure REST endpoint
server.get('/:number', function(req,res) {
	if (canSendData) {
		serial.write(req.params.number, function(err, results) {
			console.log('[err]::'+err);
			console.log('[res]::'+results);
		})
	}
});


//Go!
server.listen(8080, function() {
	console.log("Server is listening on 8080.")
});
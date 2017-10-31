
//This is the file which is refferred from package.json.

//Creates express object
var express = require('express'),
//Config file Path
config = require('./config/config'); 

var app = express();    

require('./config/express')(app, config);
console.log("Creating HTTP server on port: " + config.port);

require('http').createServer(app).listen(config.port, function () {
console.log("HTTP Server listening on port: " + config.port + ", in " + app.get('env') + " mode");
});

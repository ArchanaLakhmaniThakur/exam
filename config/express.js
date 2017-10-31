//framework to create web application
var express = require('express');
//For parsing JSON object
var bodyParser = require('body-parser');
//Abstraction library for mongodb which has build in data validation.
var mongoose = require('mongoose');
//Promise library
var bluebird = require('bluebird');
//Pattern matching library
var glob = require('glob');

module.exports = function (app, config) {

mongoose.Promise = require('bluebird');
//Connecting to the database
 mongoose.connect(config.db, {useMongoClient: true});
 var db = mongoose.connection;
 db.on('error', function () {
   throw new Error('unable to connect to database at ' + config.db);
 });
 
   mongoose.set('debug', true);
   mongoose.connection.once('open', function callback() {
     console.log("Mongoose connected to the database");
   });
  
    app.use(function (req, res, next) {
      console.log('Request from ' + req.connection.remoteAddress, 'info');
      next();
    });

  //Parsing JSON file
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
    }));

    //Loading all modules
    var models = glob.sync(config.root + '/app/models/*.js');
   models.forEach(function (model) {
     require(model);
   });
  
   //Loading all controllers
  var controllers = glob.sync(config.root + '/app/controllers/*.js');
   controllers.forEach(function (controller) {
    require(controller)(app, config);
   });

   app.use(express.static(config.root + '/public'));
  
   //Handing 404 error code
    app.use(function (req, res) {
      res.type('text/plan');
      res.status(404);
      res.send('404 Not Found');
    });
  
    //Handling 500 error code
    app.use(function (err, req, res, next) {
      res.type('text/plan');
      res.status(500);
      res.send('500 Server Error');  
    });
  
    console.log("Starting application");
  
  };

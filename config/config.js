var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';

//Configuring the developement environment at port 5000 and conncting to mongo db at mongodb://127.0.0.1.
var config = {  
development: {    
            root: rootPath,    
            app: {name: 'exam'},    
            port: 5000,  
            db: 'mongodb://127.0.0.1/exam-dev' 
 },  

  };

 module.exports = config[env];

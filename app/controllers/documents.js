//Creates Express object
var express = require('express'),
//Creates router object
router = express.Router(), 

mongoose = require('mongoose'),
//Creating a model object in mongo db.
Newdoc = mongoose.model('docs');

module.exports = function (app, config) {
app.use('/api', router);

//Retriving all the documents (records) created
router.get('/documents', function (req, res, next){
    console.log('Get all documents', 'verbose');

   var query = Newdoc.find()
   .then(result => {
    if(result && result.length) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message: "No documents"});
    }
   })
   .catch(err => {
     return next(err);
   });
});

//Post method. Creating new object of defined schema in mongodb
router.post('/documents', function(req, res, next){
    console.log('Create a document', 'verbose');
   var newdoc = new Newdoc(req.body);
   newdoc.isNew = true;
   console.log(newdoc);
    newdoc.save()
   .then(result => {
       res.status(201).json(result);
   })
   .catch( err => {
       console.log("in exception"+err);
      return next(err);
   });
 
});

};

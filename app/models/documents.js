var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

//Schema as asked in Exam , which includes one property of string and one property of number
var mySchema = new Schema({
    name:{type:String, required: true},
    age: {type:Number, required: true}, 
});

//Assigning identifier to schema 
module.exports = Mongoose.model('docs', mySchema);

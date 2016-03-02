/**
 * http://usejsdoc.org/
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var personSchema = new Schema({
	_id : String,
	name : String,
	address : String,
	age :  Number
}, {collection: 'Person'});

personSchema.methods.findAll = function (callBack) {
	return this.model('PersonModel').find({}, callBack);
};
personSchema.methods.findByName = function (callBack) {
	return this.model('PersonModel').findOne({name: this.name}, callBack);
};

mongoose.model('PersonModel', personSchema);

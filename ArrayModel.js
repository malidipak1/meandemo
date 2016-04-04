/**
 * http://usejsdoc.org/
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var arrObjectSchema = new Schema({
	_id 		 : String,
	simpleArray  : [String],
	objectArray : [Schema.Types.Mixed],	
	arrayOfArray : [
	                	[String],
	                ],
	profile		: Buffer
}, {collection: 'arrayEx'});


arrObjectSchema.statics.findByName = function (name, callBack) {
	  return this.find(name, callBack);
	};

arrObjectSchema.statics.findAll = function (search, callBack) {
	  return this.find(search, callBack);
	};


mongoose.model('ArrayModel', arrObjectSchema);

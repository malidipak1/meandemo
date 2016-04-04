/**
 * http://usejsdoc.org/
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectID = require("mongodb").ObjectID;

var counterSchema = new Schema({
	_id  	: String,
	key  	: String,
	counter : Number}, 
{collection: 'counter'});

counterSchema.statics.getNextVal = function (key) {
	return this.findById({_id:key}, function (err, objCounter) {
		if(err) {
			console.log(err);
			return 0;
		} else {
			if(objCounter === null ) {
				objCounter = new CounterModel({_id: key, counter: 0}); 
			} 
			
			objCounter.counter += 1;
			objCounter.save(function (err) {
				if(err) {
					console.log("Error updating.."); 
					return 0;
				} else {
					console.log("updated successfully..");
					return objCounter.counter;
				}
			});
			
		}
	});
};


/*counterSchema.statics.getNextVal = function (keyName) {
	console.log("executing next value..");
	return this.model('CounterModel').findOne({key: keyName}, function(err, objCounter) {
		var count = 1;
		if(err) {
			
			this.model('CounterModel').create({_id : new ObjectID(), key : count}, function(err) {
				if(err) {
					console.error("unable to create row");
				}
				return count;
			});
		} else {
			count += objCounter.counter;
			objCounter.counter = count;
			objCounter.save(function (err) {
				if(err) {
					return 0;
				} else {
					return objCounter.counter;
				}
			});
		}
	});
};*/

mongoose.model('CounterModel', counterSchema);

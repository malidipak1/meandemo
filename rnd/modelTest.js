/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();

require("./model/PersonModel");
require("./model/ArrayModel");
require("./model/CounterModel");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var PersonModel = mongoose.model('PersonModel');
var ArrayModel = mongoose.model('ArrayModel');
var CounterModel = mongoose.model('CounterModel');

router.get("/version", function(req, res) {
	
	ArrayModel.findAll({__v: 0}, function (err, listArray) {
		if(err) {
			res.json({});
		} else {
			res.json(listArray);
		}
	}); 
	
});

router.get("/counter", function(req, res) {
	var key = req.query.keys;
	if(key === null || key === "undefined" || key === undefined) {
		res.json({err: "Provide Key"});
	} else {
		console.log("key:" + key);
		res.json({key: CounterModel.getNextVal(key)});
		/*CounterModel.findById({_id:key}, function (err, objCounter) {
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
						res.send(''+objCounter.counter);
					}
				});
				
			}
		});*/
	}
	
});

router.get("/complex", function (req, res) {
	var aobj = {'name':'Dipak', 'message':'Welcome'};
	
/*	var obj = new ArrayModel({_id: 4, 
		simpleArray : ['Santosh', 'Mali'],
		objectArray : [
		               {type: "Resident",address: "Kamothe", city : "Navi Mumbai", state : "MH", pin : 212112},
		               {type: "Office",address: "Kharghar", city : "Mumbai", state : "MU", pin : 323431}
					  ],
		arrayOfArray : [
		                	["Cricket", "Sachin"],["Football", "Rama"],["Golf", "Connel"]
		                ],
		profile		: new Buffer("ProfilePhotoContent")
	});
	
	obj.save(function(err) {
		if(err) {
			console.error(err);
		} else {
			console.log("data saved");
		}
	});
*/	
/*	ArrayModel.findByName({simpleArray:'Santosh'}, function (err, arrComplex) {
		if(err) {
			console.log(err);
		} else {
			arrComplex.simpleArray[arrComplex.simpleArray.indexOf("Santosh")] = "Dipak";
			arrComplex.save(function (err, cb) {
				if(err) {
					console.log("Error updating.."); 
				} else {
					console.log("updated successfully...");
				}
			});
		}
	});
	*/
	/*
	//in built method
	ArrayModel.findById({_id:4}, function (err, arrComplex) {
		if(err) {
			console.log(err);
		} else {
			
			arrComplex.objectArray.push({type: "US Office",address: "Lake Bruke", city : "New York", state : "CA", pin : 987431});
			arrComplex.save(function (err, cb) {
				if(err) {
					console.log("Error updating.."); 
				} else {
					console.log("updated successfully..");
				}
			});
		}
	});*/
	
	
	ArrayModel.findByName({simpleArray:'Santosh'}, function (err, arrObj) {
		if(err) {
			console.log(err);
			res.json(err);
		} else {
			console.log("Fetched Details : " + arrObj);
			res.json(arrObj);
		}
	});
	
	//res.json(aobj);
});

router.get("/", function(req, res){

	console.log("PersonModel:" + PersonModel);
	
	
	var obj = new PersonModel({_id:4, name: "Santosh", address: "Mumbai", age: 30});
	obj.save(function (err, raw) {
		  if (err) {
			  console.log(err);
			  
				return err;
		  }
		  else {
			  console.log('The raw response from Mongo was ', raw);
		  	console.log("Post saved");
		  }
		});
	
	PersonModel.update({_id:"4"}, {name: "Santosh"}, function(err, raw) {
		 if (err) {
			  console.log(err);
				return err;
		  }
		  else {
			console.log('The raw response from Mongo was ', raw);
		  	console.log("Post updated");
		  }
	});
	
	obj.findAll(function (err, listPerson) {
		console.log(listPerson);
		res.json(listPerson);
	});
	/*var blog1 = new BlogClass({ _id:100, title: 'This is program',_v: 1 });
	BlogClass.save(function (err, blog1) {
		if(err) return console.error(err);
	}); */
	/*
	var objSearch = new BlogClass({_v:0});
	
	BlogClass.find( function (err, fluffy) {
		  if (err) {
			  console.error(err);
			  return res.json(err);
		  }
		  console.log(fluffy);
		  res.json(fluffy);
			
		});*/
	console.log(__dirname);
	///res.json(aobj);
});

module.exports = router;
var express=require('express');
var app = express();

var mongoose = require("mongoose");

mongoose.connect("mongodb://192.168.0.114/test");

require("./PersonModel");
require("./ArrayModel");


var PersonModel = mongoose.model('PersonModel');
var ArrayModel = mongoose.model('ArrayModel');

app.get("/complex", function (req, res) {
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
	ArrayModel.findByName({simpleArray:'Santosh'}, function (err, arrComplex) {
		if(err) {
			console.log(err);
		} else {
			
			arrComplex.objectArray.push({type: "US Office",address: "Lake Bruke", city : "New York", state : "CA", pin : 987431});
			arrComplex.save(function (err, cb) {
				if(err) {
					console.log("Error updating.."); 
				} else {
					console.log("updated successfully...");
				}
			});
		}
	});
	
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

app.get("/", function(req, res){

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

app.get("/home", function(req, res){
	console.log('hello world');
	res.send("Hello Universe!!!");
});


app.listen(3000);
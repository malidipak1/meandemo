var express=require('express');
var app = express();
var path = require('path');

//var modelTest = require("./rnd/modelTest");
//app.use("/model", modelTest);

var social = require("./rnd/social");
app.use("/social", social);

var pdf = require("./rnd/pdf_test");
app.use("/pdf", pdf);


app.get("/home", function(req, res){
	console.log('hello world');
	res.send("Hello Universe!!!");
});


app.listen(3000);
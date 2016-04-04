/**
 * http://usejsdoc.org/
 */
var path = require('path');

var express = require('express');
var router = express.Router();

router.get('/fb', function (req, res) {

	console.log(path.dirname(path.dirname(__filename)));
	var file = "";
	res.sendFile(__dirname + '/public/fb.html');
	});


router.get('/google', function (req, res) {
	
	var file = 
	res.sendFile(__dirname + '/public/google.html');
	});

module.exports = router;
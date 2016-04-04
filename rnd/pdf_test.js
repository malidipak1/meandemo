/**
 * http://usejsdoc.org/
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require("fs");

var PDFDocument = require ('pdfkit');
//var jsreport = require("jsreport");
var htmlToPdf = require('html-to-pdf');

router.get("/pdfkit", function (req, res) {
	var doc = new PDFDocument();	
	
	//doc.pipe(fs.createWriteStream(PATH_PDF));
	doc.pipe (res);
	//add stuff to pdf
	
	var img = (path.dirname(path.dirname(__filename)) + path.sep);
	//doc.image("C:\\Users\\monika\\Desktop\\mypic.jpg").text("test", 0,0);
	
	
	doc.end();
	
});


router.get("/html-to-pdf", function(req, res) {
	
	var p = "C:\\Users\\monika\\git\\tmp\\";
	
	var template = fs.readFileSync('./public/cert.html');
	var destPdf = p+'destination.pdf';
	
	htmlToPdf.convertHTMLString(template, destPdf,
	    function (error, success) {
	       if (error) {
	            console.log('Oh noes! Errorz!');
	            console.log(error);
	            res.json({success: false, err: error});
	        } else {
	            console.log('Woot! Success!');
	            console.log(success);
	            
	            fs.readFile(destPdf, function (err,data){
	            	res.contentType("application/pdf");
	            	res.send(data);
	            });
	        }
	    });
});

/*router.get("/htmltopdf", function(req, res) {

	var stemplate = fs.readFileSync('./public/cert.html');

	
	jsreport.render(stemplate).then(function(out) {
	    out.result.pipe(res);
	});

});
*/
module.exports = router;
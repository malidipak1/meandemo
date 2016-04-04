/**
 * http://usejsdoc.org/
 */

/*********************** Encrypt ****************************/

var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = new Buffer(process.env.PASS || 'password');
var encryptStream = crypto.createCipher('aes-256-cbc', password);

var gzip = zlib.createGzip();
var readStream = fs.createReadStream(__dirname+'/file.txt'); // current file
var writeStream = fs.createWriteStream(__dirname + '/out.gz');

readStream   // reads current file
  .pipe(encryptStream) // encrypts
  .pipe(gzip)  // compresses
  .pipe(writeStream)  // writes to out file
  .on('finish', function () {  // all done
    console.log('done');
  });


/*********************** Decrypt ****************************/

var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var password = new Buffer(process.env.PASS || 'password');
var decryptStream = crypto.createDecipher('aes-256-cbc', password);

var gzip = zlib.createGunzip();
var readStream = fs.createReadStream(__dirname + '/out.gz');

readStream   // reads current file
  .pipe(gzip)  // uncompresses
  .pipe(decryptStream) // decrypts
  .pipe(process.stdout)  // writes to terminal
  .on('finish', function () {  // finished
    console.log('done');
  });
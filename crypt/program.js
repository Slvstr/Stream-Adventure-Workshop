var crypto = require('crypto');
var passphrase = process.argv[2];
var decipherStream = crypto.createDecipher('aes256', passphrase);


process.stdin.pipe(decipherStream).pipe(process.stdout);
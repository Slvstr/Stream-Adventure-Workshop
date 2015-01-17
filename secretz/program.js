var tar = require('tar'),
    parser = tar.Parse(),

    zlib = require('zlib'),
    unzipper = zlib.createGunzip(),

    crypto = require('crypto'),
    cipher = process.argv[2],
    passphrase = process.argv[3],
    decipher = crypto.createDecipher(cipher, passphrase),

    through = require('through');



parser.on('entry', function(entry) {
  if (entry.type === 'File') {
    var path = entry.path;
    //  Initially tried to create the hashStream as a global variable, but saw that only the first file contents would
    //  make it to the output.  It seems like a new stream has to be created for every entry that comes in.
    var hashStream = crypto.createHash('md5', {encoding: 'hex'});
    entry.pipe(hashStream).pipe(through(null, function() {
      this.queue(' ' + path + '\n');
    })).pipe(process.stdout);
  }
  else {
    return;
  }
});

process.stdin.pipe(decipher).pipe(unzipper).pipe(parser);

var through = require('through');

var trUpperCase = through(function(buf) {
  this.queue(buf.toString().toUpperCase());
});

process.stdin.pipe(trUpperCase).pipe(process.stdout);
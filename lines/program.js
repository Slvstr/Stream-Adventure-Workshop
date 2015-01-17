var through = require('through');
var split = require('split');

var counter = 0;
process.stdin.pipe(split()).pipe(through(function(line) {
  
  if (counter%2 === 0) {
    this.queue(line.toString().toLowerCase() + '\n');
  }
  else {
    this.queue(line.toString().toUpperCase() + '\n');
  }
  counter++;
})).pipe(process.stdout);
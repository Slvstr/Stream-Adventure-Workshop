var combine = require('stream-combiner');
var split = require('split');
var through = require('through');
var zlib = require('zlib');

module.exports = function () {
  var genres = [];

  var write = function(line) {
    if (line.length === 0) return;
    var row = JSON.parse(line);
    if (row.type === 'genre') {
      if (genres.length) {
        this.queue(JSON.stringify(genres[genres.length-1]) + '\n');
      }
      genres.push({name: row.name, books: []});
    }
    else {
      genres[genres.length-1].books.push(row.name);
    }
  };

  var end = function() {
    this.queue(JSON.stringify(genres[genres.length-1]) + '\n');
    this.queue(null);
  };

  var grouper = through(write, end);

  return combine(split(), grouper, zlib.createGzip());

};

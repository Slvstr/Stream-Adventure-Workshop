var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function(command, args) {
  var childProcess = spawn(command, args);
  return duplexer(childProcess.stdin, childProcess.stdout);
};
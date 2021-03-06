/*global require:true, __dirname:true, process:true, module:true */

// The purpose of this file is to setup the use
// of a configuration file for our node development server.

// Modules & Variables.
var nconf = require('nconf'),
	fs = require('fs'),
	config = {};

// Setup nconf to use (in-order) command-line arguments and environment variables.
nconf.argv().env();

// Define configuration path.
config.path = __dirname + '/config';

// Define config.json file path.
config.configFile = config.path + '/config.json';

// Setup nconf to use config.json file.
nconf.file({file: config.configFile});

// Export module.
module.exports = config;
/*global exports:true, module:true, require:true */

// Modules.
var nconf = require('nconf'),
	config = require('./config');

// Grunt.
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Clean task.
		// Empties production directories.
		clean: {
			prod: [
				'target/'
			]
		},

		// Less task.
		// Compiles less files into css.
		less: {
			dev: {
				files: {
					'public/css/app.css': 'public/less/app.less'
				}
			},
			prod: {
				files: {
					'target/app-ui/css/app.css': 'public/less/app.less'
				},
				options: {
					compress: true
				}
			}
		},

		// Lint task.
		// Enforces JavaScript coding standards.
		jshint: {
			options: {
				nomen: false,
				curly: true,
				camelcase: true,
				eqeqeq: true,
				newcap: true,
				undef: true,
				trailing: true,
				strict: true,
				latedef: true,
				indent: true,
				quotmark: true
			},
			global: {
				define: true,
				window: true,
				document: true
			},
			all: [
				'public/js/src/**/*.js',
				'public/js/test/**/*.js',
				'tasks/*.js',
				'*.js'
			]
		},

		// Require task.
		// Optimize & compress JavaScript source files.
		requirejs: {
			compile: {
				options: {
					baseUrl: './public/js/src',
					mainConfigFile: './public/js/src/main.js',
					out: './target/app-ui/js/main.js',
					name: 'main',
					preserveComments: false
				}
			}
		},

		// HTML task.
		// Compiles html and copies to target directory.
		compilehtml: {
			dev: {
				options: {
					dev: true
				},
				src: 'views/layout/*.html',
				dest: 'target/app-ui/index.html'
			},
			prod: {
				options: {
					dev: false
				},
				src: 'views/layout/*.html',
				dest: 'target/app-ui/index.html'
			}
		},

		// Copy task.
		copy: {
			prod: {
				files: [
					{
						src: ['**'],
						dest: 'target/app-ui/img/',
						expand: true,
						cwd: 'public/img/'
					},
					{
						src: ['**'],
						dest: 'target/app-ui/i18n/',
						expand: true,
						cwd: 'public/i18n/'
					},
					{
						src: ['**'],
						dest: 'target/app-ui/template/',
						expand: true,
						cwd: 'public/template/'
					}
				]
			}
		},

		yuidoc: {
			dev: {
				name: '<%= pkg.name %>',
				options: {
					paths: 'public/js/src/',
					outdir: 'public/docs/'
				}
			},
			prod: {
				name: '<%= pkg.name %>',
				options: {
					paths: 'public/js/src/',
					outdir: 'target/app-ui/docs/'
				}
			}
		},

		// Watch task.
		// Watch source & spec files.
		watch: {
			src: {
				files: [
					'public/js/src/**/*.js',
					'public/js/test/**/*.js',
					'config/*.js',
					'lib/*.js',
					'*.js'
				],
				tasks: ['jshint']
			},
			test: {
				files: [
					'public/js/src/**/*.js',
					'public/js/test/**/*.js'
				],
				tasks: ['exec:jasmine']
			}
		},

		// Unit-testing task.
		// Executes jasmine tests with phantomjs.
		exec: {
			jasmine: {
				command: 'phantomjs public/js/lib/jasmine/jasmine-runner.js http://' + nconf.get('GRUNT_HOST') + ':' + nconf.get('GRUNT_PORT') + '/js/test/',
				stdout: true
			}
		}
	});

	// Load plugins/tasks.
	grunt.loadNpmTasks('grunt-contrib');
	grunt.loadNpmTasks('grunt-exec');
	grunt.task.loadTasks('tasks');

	// Register tasks.

	// Documentation command.
	grunt.registerTask('docs', ['yuidoc']);

	// Test command.
	grunt.registerTask('test', ['exec:jasmine']);

	// Source watch command.
	grunt.registerTask('src.watcher', ['watch:src']);

	// Test watch command.
	grunt.registerTask('test.watcher', ['watch:test']);

	// Default.
	grunt.registerTask('default', ['clean', 'less', 'jshint', 'requirejs', 'compilehtml:prod', 'copy', 'yuidoc']);
};
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sprite:{
	      dev: {
	        src: 'public/source/sprite/*.png',
	        dest: 'public/source/img/sprite.png',
	        destCss: 'public/source/css/sprite.less',
	        cssFormat: 'less',
	        imgPath: '../img/sprite.png'
	      }
	    },
	    webfont: {
		    dev: {
		        src: 'public/source/icon/*.svg',
		        dest: 'public/build/icon',
		        destCss: 'public/source/css',
		        options: {
		            engine: 'node',
		            htmlDemo: false,
		        	stylesheet: 'less',
	                relativeFontPath: '../icon',
		        	templateOptions: {
		                baseClass: 'icon',
		                classPrefix: 'icon-',
		                mixinPrefix: 'icon_',
		            }
		        }
		    }
		},
		less: {
			dev: {
				options: {
					paths: ["css/"],
					sourceMap: false,
					compress: false,
					relativeUrls: true,
					optimization: 5
				},
				files: {
					"public/build/css/style.min.css" : ["public/source/css/style.less"]
				}
			}
		},
		uglify: {
			dev: {
				src: 'public/source/js/*.js',
				dest: 'public/build/js/scripts.min.js'
			}
		},
		imagemin: {                         
		    dev: {   
		    	options: {                      
			        optimizationLevel: 3,
			        svgoPlugins: [{ removeViewBox: false }],
			        progressive: true,
			        interlaced: true
		      	},                      
		      	files: [{
			        expand: true,
			        cwd: 'public/source/img/',
			        src: ['**/*.{png,jpg,gif}'],
			        dest: 'public/build/img/'
		      	}]
		    }
		},
		watch: {
		  css: {
		    files: ['public/source/css/*.less'],
		    tasks: ['less'],
		    options: {
		      spawn: false,
		    }
		  },
		  js: {
		    files: ['public/source/js/*.js'],
		    tasks: ['uglify'],
		    options: {
		      spawn: false,
		    }
		  },
		  sprite: {
		    files: ['public/source/sprite/*.png'],
		    tasks: ['sprite','less'],
		    options: {
		      spawn: false,
		    }
		  },
		  imagesmin: {
			files: ['public/source/img/*.{png,jpg,gif}'],
		    tasks: ['imagemin'],
		    options: {
		      spawn: false,
		    }
		  },
		  webfonts: {
			files: ['public/source/icon/*.svg'],
		    tasks: ['webfont','less'],
		    options: {
		      spawn: false,
		    }
		  }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-webfont');

	grunt.registerTask('autobuild', ['watch']);
	grunt.registerTask('build', ['sprite','webfont','less','uglify','imagemin']);

}
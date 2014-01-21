// Generated on 2013-11-06 using generator-angular-fullstack 0.0.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'public'
    },
    express: {
        options: {
            port: process.env.PORT || 9000
        },
        dev: {
            options: {
                script: 'server.js'
            }
        },
        prod: {
            options: {
                script: 'server.js',
                node_env: 'production'
            }
        }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      express: {
          files: [
              '<%= yeoman.app %>/{,*//*}*.html',
              '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
              '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.{js,coffee}',
              '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
              'server.js',
              'lib/{,*//*}*'
          ],
          tasks: ['express:dev'],
          options: {
              livereload: true,
              nospawn: true //Without this option specified express won't be reloaded
          }
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      less: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less:test']
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,**/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/{,**/}.git*',
            '<%= yeoman.app %>/resources/preview/*',
            '<%= yeoman.app %>/resources/themes/*',
            '<%= yeoman.app %>/resources/thumbnail/*',
            '<%= yeoman.app %>/resources/upload/*',
            '!<%= yeoman.app %>/resources/upload/default_theme'
          ]
        }]
      },
      deploy: {
        files: [{
          dot: true,
          src: [
            'deploy/*',
            '!deploy/.git*',
            '!deploy/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
    coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,**/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,**/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    less: {
      options: {
      },
      dist: {
        compress: true,
        sourceMap: false,
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: '{,**/}*.less',
          dest: '.tmp/styles',
          ext: '.css'
        }]
      },
      test: {
        compress: false,
        sourceMap: true,
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/styles',
          src: '{,**/}*.less',
          dest: '.tmp/styles',
          ext: '.css'
        }]
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: [
        '<%= yeoman.app %>/index.html',
        '<%= yeoman.app %>/upload-page.html'
      ],
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    // imagemin: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: '<%= yeoman.app %>/images',
    //       src: '{,*/}*.{png,jpg,jpeg}',
    //       dest: '<%= yeoman.dist %>/images'
    //     }]
    //   }
    // },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'components/**/*',
            'resources/phone/**/*',
            'resources/upload/default_theme/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/img/*',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      deploy: {
        files: [{
          expand: true,
          dot: true,
          dest: 'deploy',
          src: [
            '<%= yeoman.dist %>/**'
          ]
        }, {
          expand: true,
          dest: 'deploy',
          src: [
            'package.json',
            'server.js',
            'pm2-start.json',
            'lib/**/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      server: [
        'coffee:dist',
        'less:dist',
        'copy:styles'
      ],
      test: [
        'coffee:test',
        'copy:styles'
      ],
      dist: [
        'coffee:dist',
        'less:dist',
        'copy:styles',
        // Remove imagemin module due some install problem on RedHat server
        // 'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },

    "install-dependencies": {
      cwd: "deploy",
      isDevelopment: false
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer'
    // 'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'ngmin',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'clean:deploy',
    'copy:deploy'
    // 'install-dependencies'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);

  grunt.registerTask('install-dependencies', 'Installs npm dependencies.', function () {
    var exec = require('child_process').exec;
    var cb, options, cp;

    cb = this.async();
    options = this.options({
      cwd: 'deploy',
      stdout: true,
      stderr: true,
      failOnError: true,
      isDevelopment: false
    });
    var cmd = "npm install";
    if(!options.isDevelopment ) cmd += " -production";
    cp = exec(cmd, {cwd: options.cwd}, function (err, stdout, stderr) {
      if (err && options.failOnError) {
        grunt.warn(err);
      }
      cb();
    });

    grunt.verbose.writeflags(options, 'Options');

    if (options.stdout || grunt.option('verbose')) {
      console.log("Running npm install in: " + options.cwd);
      cp.stdout.pipe(process.stdout);
    }

    if (options.stderr || grunt.option('verbose')) {
      cp.stderr.pipe(process.stderr);
    }
  });
};

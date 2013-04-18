module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';\n\n',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            plugins: {
                src: [
                    
                ],
                dest: 'public/js/plugins.js'
            }
        },
        copy: {
            codemirror: {
                files: [
                    {
                        expand: true,
                        cwd: 'components/codemirror/mode/htmlmixed/',
                        src: 'htmlmixed.js', 
                        dest: 'public/js/codemirror/mode/htmlmixed/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'components/codemirror/mode/javascript/',
                        src: 'javascript.js', 
                        dest: 'public/js/codemirror/mode/javascript/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'components/codemirror/mode/xml/',
                        src: 'xml.js', 
                        dest: 'public/js/codemirror/mode/xml/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'components/codemirror/lib/',
                        src: 'codemirror.js', 
                        dest: 'public/js/codemirror/lib/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'components/codemirror/lib/',
                        src: 'codemirror.css', 
                        dest: 'public/css/codemirror/lib/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: 'components/codemirror/theme/',
                        src: '*', 
                        dest: 'public/css/codemirror/theme/'
                    } 
                ]
            },
            normalize: {
                files: [
                    {
                        expand: true,
                        cwd: 'components/normalize-css/',
                        src: 'normalize.css', 
                        dest: 'public/css/',
                        filter: 'isFile'
                    } 
                ]
            },
            fontawesomecss: {
              files: [
                  {
                      expand: true,
                      cwd: 'components/font-awesome/css/',
                      src: 'font-awesome.min.css', 
                      dest: 'public/css/',
                      filter: 'isFile'
                  },
                  {
                      expand: true,
                      cwd: 'components/font-awesome/font/',
                      src: '*', 
                      dest: 'public/font/'
                  } 
              ]
            },
            favico: {
              files: [
                  {
                      expand: true,
                      cwd: 'src/public/',
                      src: 'favicon.ico', 
                      dest: 'public/',
                      filter: 'isFile'
                  }
              ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/public/img/',
                        src: '*', 
                        dest: 'public/img/'
                    }
                ]
            }
        },

        coffee: {
            site: {
                options: {
                    join: true,
                    separator: "\n###\n---------------------###\n"
                },
                files: {
                    'public/js/main.js': [
                        'src/public/coffee/main.coffee'
                    ]
                }
            },
            server: {
                files: {
                    'server.js': 'src/server/server.coffee'
                }
            }
        },

        sass: {
            dist: {
                files: {
                    'public/css/main.css': [
                        'src/public/sass/main.sass'
                    ]
                }
            }
        },

        jade: {
            compile: {
                options: {
                    pretty: true,
                    data: {
                        debug: false
                    }
                },
                files: {
                    "public/index.html": [
                        "src/public/jade/index.jade"
                    ]
                }
            }
        },

        watch: {
            htmls: {
                files: [
                    "src/public/**/*.jade"
                ],
                tasks: ['jade']
            },
            publicscripts: {
                files: [
                    'src/public/**/*.coffee'
                ],
                tasks: ['coffee:site']
            },
            serverscripts: {
                files: [
                    'src/server/**/*.coffee'
                ],
                tasks: ['coffee:server', 'coffee:routes']
            },
            styles: {
                files: [
                    "src/public/sass/**/*.sass"
                ],
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');

    grunt.registerTask('default', ['copy', 'concat', 'jade', 'coffee', 'sass']);
};
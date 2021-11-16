'use strict';

module.exports =function(grunt){
    const sass = require('node-sass');
    // require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);
    grunt.initConfig({
        sass: {
            options:{
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files:{
                    'css/styles.css': 'css/sytles.scss'
                }
            }
        },
        watch:{
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync:{
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options:{
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        }
    });

    grunt.registerTask('css',['sass']);
    grunt.registerTask('default',['browserSync','watch']);
};
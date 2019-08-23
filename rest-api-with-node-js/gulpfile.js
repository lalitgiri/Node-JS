var gulp = require('gulp');

var nodemon = require('gulp-nodemon');
var guplMocha = require('gulp-mocha');

var env = require('gulp-env');
var supertest = require('supertest');

gulp.task('default', () => {
    nodemon({
        script: 'index.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
        .on('restart', () => {
            console.log('Restarting....')
        })
});

gulp.task('test', function () {

    env({ vars: { ENV: 'Test' } });

    return gulp.src('tests/*.js', { read: false }).
        pipe(guplMocha({ reporter: 'nyan' }));
});
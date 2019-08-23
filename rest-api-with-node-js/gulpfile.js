var gulp = require('gulp');

var nodemon = require('gulp-nodemon');
var guplMocha = require('gulp-mocha');

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

gulp.task('test',function () {
    return gulp.src('tests/*.js', { read: false }).
        pipe(guplMocha({ reporter: 'nyan' }));
});